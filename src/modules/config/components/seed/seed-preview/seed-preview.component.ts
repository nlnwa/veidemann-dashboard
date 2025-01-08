import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfigObject} from '../../../../../shared/models/config';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CrawlExecutionState} from 'src/shared/models';
import {AuthService, SnackBarService} from '../../../../core/services';


@Component({
    selector: 'app-seed-preview',
    templateUrl: './seed-preview.component.html',
    styleUrls: ['./seed-preview.component.css'],
    standalone: false
})
export class SeedPreviewComponent {
  readonly CrawlExecutionState = CrawlExecutionState;

  @Input()
  configObject: ConfigObject;

  @Input()
  crawlJobs: ConfigObject[];

  @Output()
  edit: EventEmitter<ConfigObject>;

  crawlStatusTableHeaders = ['Job', 'Status', 'Started', ' Ended'];

  constructor(protected router: Router,
              protected route: ActivatedRoute,
              private authService: AuthService,
              private snackBarService: SnackBarService) {
    this.edit = new EventEmitter();
  }

  get canShowAnnotation(): boolean {
    return this.authService.isAdmin() || this.authService.isOperator() || this.authService.isCurator();
  }

  onEdit(): void {
    this.edit.emit(this.configObject);
  }

  getJobRefListQueryParams(configObject: ConfigObject): Params {
    return {crawl_job_id: configObject.seed.jobRefList.map(jobRef => jobRef.id)};
  }

  onFilterByEntityRef(configObject: ConfigObject) {
    this.router.navigate(['seed'], {
      queryParams: {entity_id: configObject.seed.entityRef.id},
      relativeTo: this.route.parent
    });
  }

  copyIdToClipboard(id: string) {
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = id;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    this.snackBarService.openSnackBar('Copied');
  }
}
