import {Component, Input, OnChanges, ViewEncapsulation} from '@angular/core';
import {CrawlConfigService} from '../../crawlconfig/';
import {ScheduleService} from '../../schedule/';
import {CustomValidators} from '../../../commons/';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrawlJobService} from '../crawljob.service';
import {CrawlJob, Schedule} from '../../../commons/models/config.model';
import {SnackBarService} from '../../../snack-bar-service/snack-bar.service';

@Component({
  selector: 'app-crawljob-details',
  templateUrl: './crawljob-details.component.html',
  styleUrls: ['./crawljob-details.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [SnackBarService],

})
export class CrawljobDetailsComponent implements OnChanges {
  @Input()
  crawlJob: CrawlJob;
  schedule: Schedule;

  private _form: FormGroup;

  get form(): FormGroup {
    return this._form;
  }

  set form(form: FormGroup) {
    this._form = form;
  }


  scheduleList: any = [];
  crawlConfigList: any = [];

  selectedScheduleItems = [];
  dropdownScheduleSettings = {};
  dropdownCrawlConfigSettings = {};
  selectedCrawlConfigItems = [];


  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private crawlJobService: CrawlJobService,
              private crawlconfigService: CrawlConfigService,
              private scheduleService: ScheduleService,
              private fb: FormBuilder,
              private snackBarService: SnackBarService) {
    this.fillDropdown();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      schedule_id: [''],
      crawl_config_id: ['', CustomValidators.nonEmpty],
      limits: this.fb.group({
        depth: ['', [Validators.required, CustomValidators.min(0)]],
        max_duration_s: ['', [Validators.required, CustomValidators.min(0)]],
        max_bytes: ['', [Validators.required, CustomValidators.min(0)]],
      }),
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: '',
        created: this.fb.group({seconds: {value: '', disabled: true}}),
        created_by: {value: '', disabled: true},
        last_modified: this.fb.group({seconds: {value: '', disabled: true}}),
        last_modified_by: {value: '', disabled: true},
        label: [],
      }),
      disabled: false,
    });
  }

  updateData(crawljob: CrawlJob) {
    this.form.controls['id'].setValue(crawljob.id);
    this.form.controls['limits'].setValue({
      depth: crawljob.limits.depth,
      max_duration_s: crawljob.limits.max_duration_s,
      max_bytes: crawljob.limits.max_bytes,
    });
    this.form.controls['meta'].patchValue({
      name: crawljob.meta.name as string,
      description: crawljob.meta.description as string,
      label: [...crawljob.meta.label]
    });
    this.setDropdown();
    this.selectedScheduleItems = [];
    this.selectedCrawlConfigItems = [];
    this.form.controls['disabled'].setValue((crawljob.disabled)as boolean);
    this.form.markAsPristine();
  };

  ngOnChanges() {
    setTimeout(() => {
      this.updateData(this.crawlJob);
    });
  }

  updateCrawljob(): void {
    this.crawlJob = this.prepareSaveCrawljob();
    this.crawlJobService.update(this.crawlJob)
      .subscribe((updatedCrawljob) => {
        this.updateHandler(updatedCrawljob);
      });
    this.snackBarService.openSnackBar('Lagret');
  };

  deleteCrawljob(crawljobId): void {
    this.crawlJobService.delete(crawljobId)
      .subscribe((response) => {
        this.deleteHandler(crawljobId);
        if (response instanceof Object) {
          this.snackBarService.openSnackBar('Feil: Ikke slettet');
        } else {
          this.snackBarService.openSnackBar('Slettet');
        }
      });
  }

  createCrawljob() {
    this.crawlJob = this.prepareSaveCrawljob();
    this.crawlJobService.create(this.crawlJob)
      .subscribe((newCrawljob: CrawlJob) => {
        this.createHandler(newCrawljob);
      });
    this.snackBarService.openSnackBar('Lagret');
  }

  prepareSaveCrawljob(): CrawlJob {
    const formModel = this.form.value;
    const labelsDeepCopy = formModel.meta.label.map(label => ({...label}));
    return {
      id: this.crawlJob.id,
      schedule_id: formModel.schedule_id[0].id as string,
      crawl_config_id: formModel.crawl_config_id[0].id as string,
      limits: {
        depth: formModel.limits.depth as number,
        max_duration_s: formModel.limits.max_duration_s as string,
        max_bytes: formModel.limits.max_bytes as string,
      },
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        label: labelsDeepCopy
      },
      disabled: formModel.disabled as boolean,
    };
  }

  setDropdown() {
    if (this.crawlJob.schedule_id !== '') {
      this.scheduleService.get(this.crawlJob.schedule_id)
        .subscribe((schedule) => {
          this.selectedScheduleItems.push({
            id: schedule.id,
            itemName: schedule.meta.name,
            description: schedule.meta.description
          });

          this.form.controls['schedule_id'].setValue(this.selectedScheduleItems);
        });
    }

    if (this.crawlJob.crawl_config_id !== '') {
      this.crawlconfigService.get(this.crawlJob.crawl_config_id)
        .subscribe(crawlConfig => {
          this.selectedCrawlConfigItems.push({
            id: crawlConfig.id,
            itemName: crawlConfig.meta.name,
            description: crawlConfig.meta.description
          });
          this.form.controls['crawl_config_id'].setValue(this.selectedCrawlConfigItems);
        });
    }
  }

  fillDropdown() {
    this.scheduleService.list()
      .map(reply => reply.value)
      .subscribe(schedules => {
        schedules.forEach((schedule) => {
          this.scheduleList.push({
            id: schedule.id,
            itemName: schedule.meta.name,
            description: schedule.meta.description
          })
        });
      });

    this.crawlconfigService.list()
      .map(reply => reply.value)
      .subscribe(crawlConfigs => {
        crawlConfigs.forEach((crawlConfig) => {
          this.crawlConfigList.push(
            {
              id: crawlConfig.id,
              itemName: crawlConfig.meta.name,
              description: crawlConfig.meta.description
            });
        });
      });

    this.dropdownScheduleSettings = {
      singleSelection: true,
      text: 'Velg Schedule',
      enableSearchFilter: true
    };


    this.dropdownCrawlConfigSettings = {
      singleSelection: true,
      text: 'Velg crawlConfig',
      enableSearchFilter: true
    };
  }

  revert() {
    this.ngOnChanges();
    this.snackBarService.openSnackBar('Tilbakestilt');
  }
}
