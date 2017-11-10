import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {CustomValidators} from '../../../commons/';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrawlJob} from '../../../commons/models/config.model';
import {ListItem} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-crawljob-details',
  templateUrl: './crawljob-details.component.html',
  styleUrls: ['./crawljob-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawljobDetailsComponent implements OnChanges {

  @Input()
  crawlJob: CrawlJob;
  @Input()
  crawlConfigs: any[];
  @Input()
  schedules: any[];

  @Output()
  save = new EventEmitter<CrawlJob>();
  @Output()
  update = new EventEmitter<CrawlJob>();
  // noinspection ReservedWordAsName
  @Output()
  delete = new EventEmitter<CrawlJob>();

  form: FormGroup;

  selectedScheduleItems: ListItem[];
  scheduleDropdownSettings = {
    singleSelection: true,
    text: 'Velg Schedule',
    enableSearchFilter: true
  };

  selectedCrawlConfigItems: ListItem[];
  crawlConfigDropdownSettings = {
    singleSelection: true,
    text: 'Velg crawlConfig',
    enableSearchFilter: true
  };

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  get showSave(): boolean {
    return (this.crawlJob && !this.crawlJob.id);
  }

  get canSave() {
    return this.form.valid;
  }

  get canUpdate() {
    return (this.form.valid && this.form.dirty);
  }

  get canRevert() {
    return this.form.dirty;
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
    if (changes.crawlJob) {
      if (!changes.crawlJob.currentValue) {
        this.form.reset();
      }
    }
    if (changes.crawlConfigs && changes.crawlJob.currentValue) {
      this.crawlConfigs = changes.crawlConfigs.currentValue.map((crawlConfig) =>
        ({
          id: crawlConfig.id,
          itemName: crawlConfig.meta.name,
        }));
    }
    if (changes.schedules && changes.schedules.currentValue) {
      this.schedules = changes.schedules.currentValue.map((schedule) =>
        ({
          id: schedule.id,
          itemName: schedule.meta.name,
        }));
    }
    if (this.crawlJob && this.crawlConfigs && this.schedules) {
      this.updateForm();
    }
  }

  onSave() {
    this.save.emit(this.prepareSave());
  }

  onUpdate(): void {
    this.update.emit(this.prepareSave());
  };

  onDelete(): void {
    this.delete.emit(this.crawlJob);
  }

  onRevert() {
    this.updateForm();
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
    this.setSelectedCrawlConfigItem();
    this.setSelectedScheduleItem();

    this.form.patchValue({
      id: this.crawlJob.id,
      disabled: !this.crawlJob.disabled,
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

    this.form.markAsPristine();
    this.form.markAsUntouched();
  };

  private prepareSave(): CrawlJob {
    const formModel = this.form.value;
    return {
      id: this.crawlJob.id,
      schedule_id: formModel.schedule_id.length > 0 ? formModel.schedule_id[0].id : '',
      crawl_config_id: formModel.crawl_config_id.length > 0 ? formModel.crawl_config_id[0].id : '',
      disabled: !formModel.disabled,
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

  private setSelectedCrawlConfigItem() {
    this.selectedCrawlConfigItems = this.crawlConfigs.reduce((acc, curr) => {
      if (this.crawlJob.crawl_config_id === curr.id) {
        acc.push(curr);
      }
      return acc;
    }, []);
  }

  private setSelectedScheduleItem() {
    this.selectedScheduleItems = this.schedules.reduce((acc, curr) => {
      if (this.crawlJob.schedule_id === curr.id) {
        acc.push(curr);
      }
      return acc;
    }, []);
  }
}
