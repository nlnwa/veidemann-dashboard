import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {CrawlConfigService} from '../../crawlconfig/';
import {ScheduleService} from '../../schedule/';
import {CustomValidators} from '../../../commons/';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrawlJobService} from '../crawljob.service';
import {CrawlJob} from '../../../commons/models/config.model';
import {SnackBarService} from '../../../snack-bar-service/snack-bar.service';

@Component({
  selector: 'app-crawljob-details',
  templateUrl: './crawljob-details.component.html',
  styleUrls: ['./crawljob-details.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class CrawljobDetailsComponent implements OnChanges {

  @Input()
  crawlJob: CrawlJob;

  @Output()
  created = new EventEmitter<CrawlJob>();
  @Output()
  updated = new EventEmitter<CrawlJob>();
  @Output()
  deleted = new EventEmitter<CrawlJob>();

  form: FormGroup;

  scheduleList: any = [];
  selectedScheduleItems = [];
  scheduleDropdownSettings = {
    singleSelection: true,
    text: 'Velg Schedule',
    enableSearchFilter: true
  };

  crawlConfigList: any = [];
  selectedCrawlConfigItems = [];
  crawlConfigDropdownSettings = {
    singleSelection: true,
    text: 'Velg crawlConfig',
    enableSearchFilter: true
  };

  constructor(private crawlJobService: CrawlJobService,
              private crawlconfigService: CrawlConfigService,
              private scheduleService: ScheduleService,
              private fb: FormBuilder,
              private snackBarService: SnackBarService) {
    this.fillDropdown();
    this.createForm();
  }

  get name() {
    return this.form.get('meta.name');
  }

  get depth() {
    return this.form.get('limits.depth');
  }

  get maxDurationSeconds() {
    return this.form.get('limits.max_duration_s');
  }

  get maxBytes() {
    return this.form.get('limits.max_bytes');
  }

  get scheduleId() {
    return this.form.get('schedule_id');
  }

  get crawlConfigId() {
    return this.form.get('crawl_config_id');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.crawlJob.currentValue) {
      this.updateForm();
    }
  }

  onSave() {
    this.crawlJob = this.prepareSave();
    this.crawlJobService.create(this.crawlJob)
      .subscribe(newCrawljob => {
        this.crawlJob = newCrawljob;
        this.updateForm();
        this.created.emit(newCrawljob);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdate(): void {
    this.crawlJob = this.prepareSave();
    this.crawlJobService.update(this.crawlJob)
      .subscribe(updatedCrawljob => {
        this.crawlJob = updatedCrawljob;
        this.updateForm();
        this.updated.emit(updatedCrawljob);
        this.snackBarService.openSnackBar('Lagret');
      });
  };

  onDelete(): void {
    this.crawlJobService.delete(this.crawlJob.id)
      .subscribe((response) => {
        this.deleted.emit(this.crawlJob);
        this.crawlJob = response;
        this.form.reset();
        this.snackBarService.openSnackBar('Slettet');
      });
  }

  onRevert() {
    this.updateForm();
    this.snackBarService.openSnackBar('Tilbakestilt');
  }

  private createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      schedule_id: [''],
      crawl_config_id: ['', CustomValidators.nonEmpty],
      disabled: false,
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
    });
  }

  private updateForm() {
    this.form.patchValue({
      id: this.crawlJob.id,
      disabled: this.crawlJob.disabled,
      limits: {
        depth: this.crawlJob.limits.depth,
        max_duration_s: this.crawlJob.limits.max_duration_s,
        max_bytes: this.crawlJob.limits.max_bytes,
      },
      meta: {
        name: this.crawlJob.meta.name,
        description: this.crawlJob.meta.description,
        label: [...this.crawlJob.meta.label],
      },
    });
    this.setSelectedDropdown();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  };

  private prepareSave(): CrawlJob {
    const formModel = this.form.value;
    return {
      id: this.crawlJob.id,
      schedule_id: formModel.schedule_id.length > 0 ? formModel.schedule_id[0].id : '',
      crawl_config_id: formModel.crawl_config_id[0].id as string,
      disabled: formModel.disabled as boolean,
      limits: {
        depth: formModel.limits.depth as number,
        max_duration_s: formModel.limits.max_duration_s as string,
        max_bytes: formModel.limits.max_bytes as string,
      },
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        label: formModel.meta.label.map(label => ({...label}))
      },
    };
  }

  private fillDropdown() {
    this.scheduleService.list()
      .map(reply => reply.value)
      .subscribe(schedules => {
        schedules.forEach((schedule) => {
          this.scheduleList.push({
            id: schedule.id,
            itemName: schedule.meta.name,
          });
        });
      });
    this.crawlconfigService.list()
      .map(reply => reply.value)
      .subscribe(crawlConfigs => {
        crawlConfigs.forEach((crawlConfig) => {
          this.crawlConfigList.push({
            id: crawlConfig.id,
            itemName: crawlConfig.meta.name,
          });
        });
      });
  }

  private setSelectedDropdown() {
    this.selectedCrawlConfigItems = [];
    this.selectedScheduleItems = [];
    if (this.crawlJob.schedule_id !== '') {
      this.scheduleService.get(this.crawlJob.schedule_id)
        .subscribe(schedule => {
          this.selectedScheduleItems.push({
            id: schedule.id,
            itemName: schedule.meta.name,
          });
          this.scheduleId.setValue(this.selectedScheduleItems);
        });
    }

    if (this.crawlJob.crawl_config_id !== '') {
      this.crawlconfigService.get(this.crawlJob.crawl_config_id)
        .subscribe(crawlConfig => {
          this.selectedCrawlConfigItems.push({
            id: crawlConfig.id,
            itemName: crawlConfig.meta.name,
          });
          this.crawlConfigId.setValue(this.selectedCrawlConfigItems);
        });
    }
  }
}
