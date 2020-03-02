import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {NUMBER_OR_EMPTY_STRING} from '../../../../../shared/validation/patterns';
import {ConfigObject, ConfigRef, CrawlJob, Kind, Meta} from '../../../../../shared/models';
import {UnitOfTime} from '../../../../../shared/models/duration/unit-time.model';

@Component({
  selector: 'app-crawljob-details',
  templateUrl: './crawl-job-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlJobDetailsComponent implements OnChanges {
  readonly Kind = Kind;
  readonly UnitOfTime = UnitOfTime;

  @Input()
  configObject: ConfigObject;

  @Input()
  crawlScheduleConfigs: ConfigObject[];

  @Input()
  crawlConfigs: ConfigObject[];

  @Output()
  save = new EventEmitter<ConfigObject>();

  @Output()
  update = new EventEmitter<ConfigObject>();

  // noinspection ReservedWordAsName
  @Output()
  delete = new EventEmitter<ConfigObject>();

  form: FormGroup;

  constructor(protected fb: FormBuilder,
              protected authService: AuthService) {
    this.createForm();
  }

  get canEdit(): boolean {
    return this.authService.isAdmin();
  }

  get showSave(): boolean {
    return (this.configObject && !this.configObject.id);
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
    return this.form.get('limits.maxDurationS');
  }

  get maxBytes() {
    return this.form.get('limits.maxBytes');
  }

  get disabled() {
    return this.form.get('disabled');
  }

  get scheduleRef() {
    return this.form.get('scheduleRef');
  }

  get crawlConfigRef() {
    return this.form.get('crawlConfigRef');
  }

  get showShortcuts(): boolean {
    return this.scheduleRef.value.id !== '' || this.crawlConfigRef.value.id !== '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.configObject) {
      this.form.reset();
      if (this.configObject) {
        this.updateForm();
      }
    }
  }

  onSave() {
    this.save.emit(this.prepareSave());
  }

  onUpdate(): void {
    this.update.emit(this.prepareSave());
  }

  onDelete(): void {
    this.delete.emit(this.configObject);
  }

  onRevert() {
    this.updateForm();
  }

  protected createForm() {
    this.form = this.fb.group({
      id: '',
      scheduleRef: this.fb.group({
        id: '',
        kind: Kind.CRAWLSCHEDULECONFIG,
      }),
      crawlConfigRef: this.fb.group({
        id: ['', Validators.required],
        kind: Kind.CRAWLCONFIG,
      }),
      disabled: '',
      limits: this.fb.group({
        depth: ['', [Validators.min(0)]],
        maxDurationS: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
        maxBytes: '',
      }),
      meta: new Meta(),
    });
  }

  protected updateForm() {
    this.form.setValue({
      id: this.configObject.id,
      disabled: this.configObject.crawlJob.disabled,
      scheduleRef: this.configObject.crawlJob.scheduleRef,
      crawlConfigRef: this.configObject.crawlJob.crawlConfigRef,
      limits: {
        depth: this.configObject.crawlJob.limits.depth || '',
        maxDurationS: this.configObject.crawlJob.limits.maxDurationS || '',
        maxBytes: this.configObject.crawlJob.limits.maxBytes || 0,
      },
      meta: this.configObject.meta,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  protected prepareSave(): ConfigObject {
    const formModel = this.form.value;

    const configObject = new ConfigObject({
      id: formModel.id,
      kind: Kind.CRAWLJOB,
      meta: formModel.meta
    });

    const crawlJob = new CrawlJob();
    crawlJob.disabled = formModel.disabled;
    crawlJob.crawlConfigRef = formModel.crawlConfigRef.id ? new ConfigRef({id: formModel.crawlConfigRef.id, kind: Kind.CRAWLCONFIG}) : null;
    crawlJob.scheduleRef = formModel.scheduleRef.id ?  new ConfigRef({id: formModel.scheduleRef.id, kind: Kind.CRAWLSCHEDULECONFIG}) : null;
    crawlJob.limits.depth = parseInt(formModel.limits.depth, 10);
    crawlJob.limits.maxDurationS = parseInt(formModel.limits.maxDurationS, 10);
    crawlJob.limits.maxBytes = formModel.limits.maxBytes || 0;

    configObject.crawlJob = crawlJob;

    return configObject;
  }
}
