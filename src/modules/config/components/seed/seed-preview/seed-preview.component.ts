import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfigObject} from '../../../../../shared/models/config';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {JobExecutionState} from '../../../../../shared/models/report';

@Component({
  selector: 'app-seed-preview',
  templateUrl: './seed-preview.component.html',
  styleUrls: ['./seed-preview.component.css']
})
export class SeedPreviewComponent {
  readonly JobExecutionState = JobExecutionState;

  @Input()
  configObject: ConfigObject;

  @Input()
  crawlJobs: ConfigObject[];

  @Output()
  edit: EventEmitter<ConfigObject>;

  crawlStatusTableHeaders = ['Job', 'Status', 'Started', ' Ended'];

  constructor(protected router: Router,
              protected route: ActivatedRoute) {
    this.edit = new EventEmitter();
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
}
