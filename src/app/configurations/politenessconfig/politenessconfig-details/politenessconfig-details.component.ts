import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleService} from '../../../auth/';
import {NUMBER_OR_EMPTY_STRING} from '../../../commons/validator/patterns';
import {ConfigObject} from '../../../commons/models/';
import {Meta} from '../../../commons/models/';
import {Label} from '../../../commons/models/';
import {PolitenessConfig} from '../../../commons/models';
import {Kind} from '../../../commons/models/';
import {RobotsPolicy} from '../../../commons/models/configs/politenessconfig.model';

@Component({
  selector: 'app-politenessconfig-details',
  templateUrl: './politenessconfig-details.component.html',
  styleUrls: ['./politenessconfig-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PolitenessconfigDetailsComponent implements OnChanges, OnInit {
  readonly RobotsPolicy = RobotsPolicy;

  @Input()
  set data(show) {
    this.shouldShow = show;
  }

  @Input()
  configObject: ConfigObject;

  @Output()
  save = new EventEmitter<ConfigObject>();
  @Output()
  update = new EventEmitter<ConfigObject>();
  @Output()
  delete = new EventEmitter<ConfigObject>();

  form: FormGroup;
  shouldShow = true;
  robotsPolicies: RobotsPolicy[] = [];

  // adding or subtracting labels ect when updating multiple configs.
  shouldAddLabel = undefined;
  shouldAddSelector = undefined;

  // disable fields on multi update if not equal
  shouldDisablePolicy = false;
  allSelected = false;

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

  get robotsPolicy() {
    return this.form.get('robotsPolicy');
  }

  get customRobots() {
    return this.form.get('customRobots');
  }

  get minRobotsValidDurationSec() {
    return this.form.get('minimumRobotsValidityDurationS');
  }

  get minTimeBetweenPageloadMs() {
    return this.form.get('minTimeBetweenPageLoadMs');
  }

  get maxTimeBetweenPageloadMs() {
    return this.form.get('maxTimeBetweenPageLoadMs');
  }

  get delayFactor() {
    return this.form.get('delayFactor');
  }

  get maxRetries() {
    return this.form.get('maxRetries');
  }

  get retryDelaySeconds() {
    return this.form.get('retryDelaySeconds');
  }

  get crawlHostGroupSelectorList() {
    return this.form.get('crawlHostGroupSelectorList');
  }

  ngOnInit() {
    for (const policy in RobotsPolicy) {
      if (isNaN(Number(policy))) {
        this.robotsPolicies.push(policy as any as RobotsPolicy);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.configObject) {
      if (this.configObject) {
        this.updateForm();
      } else {
        this.form.reset();
      }
    }
  }

  shouldDisableRobotPolicy(): void {
    if (this.shouldDisablePolicy) {
      this.robotsPolicy.disable();
    }
  }

  onEnableRobotsPolicy(): void {
    if (this.robotsPolicy.disabled) {
      this.robotsPolicy.enable();
    }
  }

  onSave() {
    this.save.emit(this.prepareSave());
  }

  onUpdate(): void {
    this.update.emit(this.prepareSave());
  }

  onDelete() {
    this.delete.emit(this.configObject);
  }

  onRevert() {
    this.updateForm();
  }

  onToggleShouldAddLabels(shouldAdd: boolean): void {
    this.shouldAddLabel = shouldAdd;
    this.form.controls.meta.markAsDirty();
  }

  onToggleShouldAddSelector(shouldAdd: boolean): void {
    this.shouldAddSelector = shouldAdd;
    this.form.controls.crawlHostGroupSelectorList.markAsDirty();
  }

  private createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      robotsPolicy: [''],
      minimumRobotsValidityDurationS: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      customRobots: null,
      minTimeBetweenPageLoadMs: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      maxTimeBetweenPageLoadMs: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      delayFactor: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      maxRetries: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      retryDelaySeconds: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      crawlHostGroupSelectorList: '',
      meta: new Meta(),
    });
  }

  updateForm() {
    this.form.patchValue({
      id: this.configObject.id,
      meta: this.configObject.meta,
      robotsPolicy: this.configObject.politenessConfig.robotsPolicy || RobotsPolicy[RobotsPolicy.OBEY_ROBOTS],
      minimumRobotsValidityDurationS: this.configObject.politenessConfig.minimumRobotsValidityDurationS || '',
      customRobots: this.configObject.politenessConfig.customRobots,
      minTimeBetweenPageLoadMs: this.configObject.politenessConfig.minTimeBetweenPageLoadMs || '',
      maxTimeBetweenPageLoadMs: this.configObject.politenessConfig.maxTimeBetweenPageLoadMs || '',
      delayFactor: this.configObject.politenessConfig.delayFactor || '',
      maxRetries: this.configObject.politenessConfig.maxRetries || '',
      retryDelaySeconds: this.configObject.politenessConfig.retryDelaySeconds || '',
      crawlHostGroupSelectorList: this.configObject.politenessConfig.crawlHostGroupSelectorList
        ? this.configObject.politenessConfig.crawlHostGroupSelectorList.map(selector => {
          const parts = selector.split(':');
          const key = parts.shift();
          const value = parts.join(':');
          const label = new Label();
          label.key = key;
          label.value = value;
          return label;
        })
        : [],
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.shouldDisableRobotPolicy();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  private prepareSave(): ConfigObject {

    const formModel = this.form.value;

    const configObject = new ConfigObject({kind: Kind.POLITENESSCONFIG});
    if (this.configObject.id !== '') {
      configObject.id = this.configObject.id;
    }

    const politenessConfig = new PolitenessConfig();
    politenessConfig.robotsPolicy = formModel.robotsPolicy;
    politenessConfig.minimumRobotsValidityDurationS = parseInt(formModel.minimumRobotsValidityDurationS, 10) || 0;
    politenessConfig.customRobots = formModel.customRobots;
    politenessConfig.minTimeBetweenPageLoadMs = parseInt(formModel.minTimeBetweenPageLoadMs, 10) || 0;
    politenessConfig.maxTimeBetweenPageLoadMs = parseInt(formModel.maxTimeBetweenPageLoadMs, 10) || 0;
    politenessConfig.delayFactor = parseFloat(formModel.delayFactor) || 0.0;
    politenessConfig.maxRetries = parseInt(formModel.maxRetries, 10) || 0;
    politenessConfig.retryDelaySeconds = parseInt(formModel.retryDelaySeconds, 10) || 0;
    politenessConfig.crawlHostGroupSelectorList = formModel.crawlHostGroupSelectorList.map(label => label.key + ':' + label.value);

    configObject.meta = formModel.meta;
    configObject.politenessConfig = politenessConfig;
    return configObject;
  }
}
