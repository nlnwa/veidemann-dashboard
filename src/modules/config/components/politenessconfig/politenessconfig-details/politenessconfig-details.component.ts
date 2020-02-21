import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {NUMBER_OR_EMPTY_STRING} from '../../../../../shared/validation/patterns';
import {ConfigObject, Kind, Label, Meta, PolitenessConfig, RobotsPolicy} from '../../../../../shared/models';
import {UnitOfTime} from '../../../../../shared/models/duration/unit-time.model';


@Component({
  selector: 'app-politenessconfig-details',
  templateUrl: './politenessconfig-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PolitenessConfigDetailsComponent implements OnChanges {
  readonly RobotsPolicy = RobotsPolicy;
  readonly UnitOfTime = UnitOfTime;

  @Input()
  configObject: ConfigObject;

  @Input()
  robotsPolicies: RobotsPolicy[] = [];

  @Output()
  save = new EventEmitter<ConfigObject>();

  @Output()
  update = new EventEmitter<ConfigObject>();

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

  get canSave(): boolean {
    return this.form.valid;
  }

  get canUpdate(): boolean {
    return (this.form.valid && this.form.dirty);
  }

  get canRevert(): boolean {
    return this.form.dirty;
  }

  get name(): string {
    return this.form.get('meta').value.name;
  }

  get robotsPolicy(): AbstractControl {
    return this.form.get('robotsPolicy');
  }

  get customRobots(): AbstractControl {
    return this.form.get('customRobots');
  }

  get minRobotsValidDurationSec(): AbstractControl {
    return this.form.get('minimumRobotsValidityDurationS');
  }

  get minTimeBetweenPageloadMs(): AbstractControl {
    return this.form.get('minTimeBetweenPageLoadMs');
  }

  get maxTimeBetweenPageloadMs(): AbstractControl {
    return this.form.get('maxTimeBetweenPageLoadMs');
  }

  get delayFactor(): AbstractControl {
    return this.form.get('delayFactor');
  }

  get maxRetries(): AbstractControl {
    return this.form.get('maxRetries');
  }

  get retryDelaySeconds(): AbstractControl {
    return this.form.get('retryDelaySeconds');
  }

  get crawlHostGroupSelectorList(): AbstractControl {
    return this.form.get('crawlHostGroupSelectorList');
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

  protected createForm() {
    this.form = this.fb.group({
      id: '',
      robotsPolicy: RobotsPolicy.OBEY_ROBOTS,
      minimumRobotsValidityDurationS: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      customRobots: '',
      minTimeBetweenPageLoadMs: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      maxTimeBetweenPageLoadMs: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      delayFactor: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      maxRetries: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      retryDelaySeconds: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      crawlHostGroupSelectorList: [],
      meta: new Meta(),
    });
  }

  protected updateForm() {
    this.form.setValue({
      id: this.configObject.id,
      meta: this.configObject.meta,
      robotsPolicy: this.configObject.politenessConfig.robotsPolicy || RobotsPolicy.OBEY_ROBOTS,
      minimumRobotsValidityDurationS: this.configObject.politenessConfig.minimumRobotsValidityDurationS || '',
      customRobots: this.configObject.politenessConfig.customRobots,
      minTimeBetweenPageLoadMs: this.configObject.politenessConfig.minTimeBetweenPageLoadMs || '',
      maxTimeBetweenPageLoadMs: this.configObject.politenessConfig.maxTimeBetweenPageLoadMs || '',
      delayFactor: this.configObject.politenessConfig.delayFactor || '',
      maxRetries: this.configObject.politenessConfig.maxRetries || '',
      retryDelaySeconds: this.configObject.politenessConfig.retryDelaySeconds || '',
      crawlHostGroupSelectorList: this.configObject.politenessConfig.crawlHostGroupSelectorList
        .map(selector => {
          const parts = selector.split(':', 2);
          const key = parts.shift();
          const value = parts.join(':');
          return new Label({key, value});
        })
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
      kind: Kind.POLITENESSCONFIG,
      meta: formModel.meta
    });

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

    configObject.politenessConfig = politenessConfig;

    return configObject;
  }
}
