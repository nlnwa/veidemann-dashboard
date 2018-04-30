import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {CustomValidators} from '../../../commons/validator';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrawlJob, Meta} from '../../../commons/models/config.model';
import {RoleService} from '../../../auth/role.service';
import {NUMBER_OR_EMPTY_STRING, VALID_YEAR_PATTERN} from '../../../commons/validator/patterns';


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

  get canEdit(): boolean {
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
    return this.form.get('meta').value.name;
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

  getScheduleName(id): string {
    for (let i = 0; i < this.schedules.length; i++) {
      if (id === this.schedules[i].id) {
        return this.schedules[i].itemName;
      }
    }
  }

  getCrawlConfigName(id): string {
    for (let i = 0; i < this.crawlConfigs.length; i++) {
      if (id === this.crawlConfigs[i].id) {
        return this.crawlConfigs[i].itemName;
      }
    }
  }

  get showSchedule(): boolean {
    const schedule = this.scheduleId.value;
    if (schedule != null && schedule !== '') {
      return true;
    }
    return false;
  }

  get showCrawlConfig(): boolean {
    const crawlconfig = this.crawlConfigId.value;
    if (crawlconfig != null && crawlconfig !== '') {
      return true;
    }
    return false;
  }

  get showShortcuts(): boolean {
    if (this.showSchedule || this.showCrawlConfig) {
      return true;
    }
    return false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.crawlJob && !changes.crawlJob.currentValue) {
      this.form.reset();
      return;
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
  }
  ;

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
        depth: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
        max_duration_s: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
        max_bytes: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      }),
      meta: new Meta(),
    })
    ;
  }

  private updateForm() {
    this.form.patchValue({
      id: this.crawlJob.id,
      disabled: !this.crawlJob.disabled,
      schedule_id: this.crawlJob.schedule_id,
      crawl_config_id: this.crawlJob.crawl_config_id,
      limits: {
        depth: this.crawlJob.limits.depth || '',
        max_duration_s: this.crawlJob.limits.max_duration_s || '',
        max_bytes: this.crawlJob.limits.max_bytes || '',
      },
      meta: this.crawlJob.meta,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
    }
  }
  ;

  private prepareSave(): CrawlJob {
    const formModel = this.form.value;
    return {
      id: this.crawlJob.id,
      schedule_id: formModel.schedule_id,
      crawl_config_id: formModel.crawl_config_id,
      disabled: !formModel.disabled,
      limits: {
        depth: parseInt(formModel.limits.depth, 10) || 0,
        max_duration_s: formModel.limits.max_duration_s || '0',
        max_bytes: formModel.limits.max_bytes || '0',
      },
      meta: formModel.meta,
    };
  }

}
