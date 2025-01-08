import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {ConfigObject, Kind, Meta} from '../../../../../shared/models';

@Component({
    selector: 'app-entity-details',
    templateUrl: './entity-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
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

  form: UntypedFormGroup;

  constructor(protected fb: UntypedFormBuilder,
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
  }

  get canDelete(): boolean {
    return this.authService.canDelete(this.configObject.kind);
  }

  ngOnChanges(changes: SimpleChanges): void {
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
      id: '',
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

    if (!this.canEdit) {
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
