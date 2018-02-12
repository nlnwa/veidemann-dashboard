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
import {DateTime} from '../../../commons/datetime';
import {RoleService} from '../../../roles/roles.service';

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


  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm();
  }

  get isAdmin(): boolean {
    return this.roleService.isAdmin();
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
      schedule_id: [],
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
    if (! this.isAdmin) {
      this.form.disable();
    }
  }

  private updateForm() {
    this.form.patchValue({
      id: this.crawlJob.id,
      disabled: !this.crawlJob.disabled,
      schedule_id: this.crawlJob.schedule_id,
      crawl_config_id: this.crawlJob.crawl_config_id,
      limits: {
        depth: this.crawlJob.limits.depth,
        max_duration_s: this.crawlJob.limits.max_duration_s,
        max_bytes: this.crawlJob.limits.max_bytes,
      },
      meta: {
        name: this.crawlJob.meta.name,
        description: this.crawlJob.meta.description,
        created: {
          seconds: DateTime.convertFullTimestamp(this.crawlJob.meta.created.seconds),
        },
        created_by: this.crawlJob.meta.created_by,
        last_modified: {
          seconds: DateTime.convertFullTimestamp(this.crawlJob.meta.last_modified.seconds),
        },
        last_modified_by: this.crawlJob.meta.last_modified_by,
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
      schedule_id: formModel.schedule_id,
      crawl_config_id: formModel.crawl_config_id,
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

}
