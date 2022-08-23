import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JobExecutionService} from '../../services';
import {DetailDirective} from '../../directives';
import {JobExecutionState, JobExecutionStatus} from '../../../../shared/models/report';
import {combineLatest, merge, Observable} from 'rxjs';
import {filter, map, switchMap, takeWhile} from 'rxjs/operators';
import {Detail} from '../../../../shared/func';
import {AbortCrawlDialogComponent} from '../../components/abort-crawl-dialog/abort-crawl-dialog.component';
import {ControllerApiService, SnackBarService} from '../../../core/services';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-crawl-log-detail',
  templateUrl: './job-execution-detail.component.html',
  styleUrls: ['./job-execution-detail.component.css']
})
export class JobExecutionDetailComponent extends DetailDirective<JobExecutionStatus> implements OnInit {
  readonly JobExecutionState = JobExecutionState;

  protected query$: Observable<Detail>;

  constructor(protected route: ActivatedRoute,
              protected service: JobExecutionService,
              protected controllerApiService: ControllerApiService,
              protected dialog: MatDialog,
              protected snackBarService: SnackBarService) {
    super(route, service);
  }

  ngOnInit() {
    super.ngOnInit();

    const item$: Observable<JobExecutionStatus> = this.query$.pipe(
      map(({id}) => ({id, watch: false})),
      switchMap(query => this.service.get(query)),
    );

    const watchedItem$: Observable<JobExecutionStatus> = combineLatest([this.query$, item$]).pipe(
      filter(([query, item]) => query.watch && !JobExecutionStatus.DONE_STATES.includes(item.state)),
      switchMap(([query]) => this.service.get(query).pipe(
        takeWhile(item => query.watch || !JobExecutionStatus.DONE_STATES.includes((item.state)), true),
      )),
    );

    this.item$ = merge(item$, watchedItem$);
  }

  onAbortJobExecution(jobExecutionStatus: JobExecutionStatus) {
    const dialogRef = this.dialog.open(AbortCrawlDialogComponent, {
      disableClose: true,
      autoFocus: true,
      data: {jobExecutionStatus}
    });
    dialogRef.afterClosed()
      .subscribe(executionId => {
        if (executionId) {
          this.controllerApiService.abortJobExecution(executionId).subscribe(jobExecStatus => {
            if (jobExecStatus.state === JobExecutionState.ABORTED_MANUAL) {
              this.snackBarService.openSnackBar('Job aborted');
              this.reload.next();
            }
          });
        }
      });
  }
}
