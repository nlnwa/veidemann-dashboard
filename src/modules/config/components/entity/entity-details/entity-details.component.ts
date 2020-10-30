import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {ConfigObject, Kind, Meta} from '../../../../../shared/models';

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EntityDetailsComponent implements OnChanges {

  @Input()
  configObject: ConfigObject;

  @Input()
  seeds: ConfigObject[];

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

  get showSave(): boolean {
    return this.configObject ? !this.configObject.id : false;
  }

  get canSave(): boolean {
    return this.form.valid;
  }

  get canUpdate(): boolean {
    return this.form.valid && this.form.dirty;
  }

  get canRevert(): boolean {
    return this.form.dirty;
  }

  get canEdit(): boolean {
   return this.authService.canUpdate(this.configObject.kind);
    // return this.authService.isAdmin() || this.authService.isCurator() || this.authService.isConsultant();
  }

  get canDelete(): boolean {
   // return this.authService.isAdmin();
    return this.authService.canDelete(this.configObject.kind);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('get: ', this.authService.getAbility());
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

  onUpdate() {
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
      id: {value: ''},
      meta: new Meta(),
    });
  }

  protected updateForm() {
    this.form.patchValue({
      id: this.configObject.id,
      meta: this.configObject.meta
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();

    const ability = this.authService.getAbility();
    console.log('configObject kind: ', this.configObject.kind);
    if (!ability.can('update', this.configObject.kind.toString())) {
      this.form.disable();
    }
  }

  protected prepareSave(): ConfigObject {
    const formModel = this.form.value;

    return new ConfigObject({
      id: formModel.id,
      meta: formModel.meta,
      kind: Kind.CRAWLENTITY
    });
  }
}
