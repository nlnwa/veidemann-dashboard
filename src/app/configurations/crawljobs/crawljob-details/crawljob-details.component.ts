import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CustomValidators} from '../../../commons/validator';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleService} from '../../../auth';
import {NUMBER_OR_EMPTY_STRING} from '../../../commons/validator/patterns';
import {ConfigObject} from '../../../commons/models/configobject.model';
import {Meta} from '../../../commons/models/meta/meta.model';
import {CrawlJob} from '../../../commons/models';
import {Kind} from '../../../commons/models/kind.model';


@Component({
  selector: 'app-crawljob-details',
  templateUrl: './crawljob-details.component.html',
  styleUrls: ['./crawljob-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawljobDetailsComponent implements OnChanges {
  readonly Kind = Kind;

  @Input()
  set data(show) {
    this.shouldShow = show;
  }

  @Input()
  configObject: ConfigObject;
  @Input()
  crawlConfigs: ConfigObject[];
  @Input()
  schedules: ConfigObject[];
  @Input()
  equalDisabled: boolean;

  @Output()
  save = new EventEmitter<ConfigObject>();
  @Output()
  update = new EventEmitter<ConfigObject>();
  // noinspection ReservedWordAsName
  @Output()
  delete = new EventEmitter<ConfigObject>();

  form: FormGroup;
  shouldShow = true;
  shouldAddLabel = undefined;


  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm();
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin();
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

  // get scheduleId() {
  //   return this.form.get('scheduleId');
  // }
  //
  // get crawlConfigId() {
  //   return this.form.get('crawlConfigId');
  // }

  get disabled() {
    return this.form.get('disabled');
  }

  // get showSchedule(): boolean {
  //   const schedule = this.scheduleId.value;
  //   return schedule != null && schedule !== '';
  // }
  //
  // get showCrawlConfig(): boolean {
  //   const crawlconfig = this.crawlConfigId.value;
  //   return crawlconfig != null && crawlconfig !== '';
  // }

  // get showShortcuts(): boolean {
  //   return this.showSchedule || this.showCrawlConfig;
  // }

  // getScheduleName(id): string {
  //   for (let i = 0; i < this.schedules.length; i++) {
  //     if (id === this.schedules[i].id) {
  //       return this.schedules[i].itemName;
  //     }
  //   }
  // }
  //
  // getCrawlConfigName(id): string {
  //   for (let i = 0; i < this.crawlConfigs.length; i++) {
  //     if (id === this.crawlConfigs[i].id) {
  //       return this.crawlConfigs[i].itemName;
  //     }
  //   }
  // }

  shouldDisableDisabled(): void {
    if (this.equalDisabled !== undefined || !this.shouldShow) {
      if (!this.equalDisabled) {
        this.disabled.disable();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.configObject && !changes.configObject.currentValue) {
    //   this.form.reset();
    //   return;
    // }
    // if (changes.crawlConfigs && changes.configObject.currentValue) {
    //   this.crawlConfigs = changes.crawlConfigs.currentValue.map((crawlConfig) =>
    //     ({
    //       id: crawlConfig.id,
    //       itemName: crawlConfig.meta.name,
    //     }));
    // }
    // if (changes.schedules && changes.schedules.currentValue) {
    //   this.schedules = changes.schedules.currentValue.map((schedule) =>
    //     ({
    //       id: schedule.id,
    //       itemName: schedule.meta.name,
    //     }));
    // }
    // if (this.configObject && this.crawlConfigs && this.schedules) {
    //   this.updateForm();
    // }
    if (changes.configObject) {
      if (!this.configObject) {
        this.form.reset();
      } else {
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

  onEnableDisabled() {
    if (this.disabled.disabled) {
      this.disabled.enable();
    }
  }

  onToggleShouldAddLabels(shouldAdd: boolean): void {
    this.shouldAddLabel = shouldAdd;
    this.form.controls.meta.markAsDirty();
  }

  private createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      scheduleRef: '',
      crawlConfigRef: ['', CustomValidators.nonEmpty],
      disabled: '',
      limits: this.fb.group({
        depth: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
        maxDurationS: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
        maxBytes: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      }),
      meta: new Meta(),
    });
  }

  updateForm() {
    console.log('updateForm: ', this.configObject);
    this.form.patchValue({
      id: this.configObject.id,
      disabled: this.configObject.crawlJob.disabled,
      scheduleRef: this.configObject.crawlJob.scheduleRef,
      crawlConfigRef: this.configObject.crawlJob.crawlConfigRef,
      limits: {
        depth: this.configObject.crawlJob.limits.depth || '',
        maxDurationS: this.configObject.crawlJob.limits.maxDurationS || '',
        maxBytes: this.configObject.crawlJob.limits.maxBytes || '',
      },
      meta: this.configObject.meta,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
    }
    this.shouldDisableDisabled();
  }

  private prepareSave(): ConfigObject {
    const formModel = this.form.value;

    const configObject = new ConfigObject({kind: Kind.CRAWLJOB});
    if (this.configObject.id !== '') {
      configObject.id = this.configObject.id;
    }
    const crawlJob = new CrawlJob();
    crawlJob.disabled = formModel.disabled;
    crawlJob.crawlConfigRef = formModel.crawlConfigRef;
    crawlJob.scheduleRef = formModel.scheduleRef;
    crawlJob.limits.depth = parseInt(formModel.limits.depth, 10);
    crawlJob.limits.maxDurationS = parseInt(formModel.limits.maxDurationS, 10);
    crawlJob.limits.maxBytes = parseInt(formModel.limits.maxBytes, 10);

    configObject.meta = formModel.meta;
    configObject.crawlJob = crawlJob;
    console.log(configObject);
    return configObject;
  }
}
