import {Component, OnInit} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ControllerApiService, ErrorService} from '../../../modules/core/services';
import {CrawlerStatusDialogComponent} from '../index';
import {MatDialog} from '@angular/material/dialog';
import {CrawlerStatus} from '../../../shared/models/controller/controller.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  updateRunStatus: Subject<void> = new Subject();
  crawlerStatus$: Observable<CrawlerStatus>;

  constructor(private errorService: ErrorService,
              private controllerApiService: ControllerApiService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.crawlerStatus$ = this.controllerApiService.getCrawlerStatus().pipe(
      catchError(error => {
        this.errorService.dispatch(error);
        return throwError(error);
      })
    );
    this.updateRunStatus.next();
  }

  onChangeRunStatus(shouldPause: boolean) {
    this.dialog.open(CrawlerStatusDialogComponent, {
      disableClose: true,
      autoFocus: true,
      data: {shouldPause}
    }).afterClosed().subscribe(changeStatus => {
      if (changeStatus) {
        if (shouldPause) {
          this.controllerApiService.pauseCrawler();
        } else {
          this.controllerApiService.unpauseCrawler();
        }
        this.updateRunStatus.next();
      }
    });
  }


}
