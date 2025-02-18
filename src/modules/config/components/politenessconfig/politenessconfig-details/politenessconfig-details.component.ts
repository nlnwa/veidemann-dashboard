import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {DECIMAL_NUMBER_OR_EMPTY_STRING, NUMBER_OR_EMPTY_STRING} from '../../../../../shared/validation/patterns';
import {ConfigObject, Kind, Label, Meta, PolitenessConfig, RobotsPolicy} from '../../../../../shared/models';
import {UnitOfTime} from '../../../../../shared/models/duration/unit-time.model';


@Component({
    selector: 'app-politenessconfig-details',
    templateUrl: './politenessconfig-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
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

  form: UntypedFormGroup;


  constructor(protected fb: UntypedFormBuilder,
              protected authService: AuthService) {
    this.createForm();
  }

  get canEdit(): boolean {
    return this.authService.canUpdate(this.configObject.kind);
  }

  get canDelete(): boolean {
    return this.authService.canDelete(this.configObject.kind);
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

  get useHostname(): AbstractControl {
    return this.form.get('useHostname');
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
      useHostname: '',
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
      useHostname: this.configObject.politenessConfig.useHostname || '',
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
    politenessConfig.useHostname = formModel.useHostname;

    configObject.politenessConfig = politenessConfig;

    return configObject;
  }
}
