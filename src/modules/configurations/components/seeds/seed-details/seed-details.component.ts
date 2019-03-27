import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';


import {RoleService} from '../../../../core/services/auth';
import {ConfigObject, ConfigRef, Kind, Meta, Seed} from '../../../../commons/models';


@Component({
  selector: 'app-seed-details',
  templateUrl: './seed-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedDetailComponent implements OnChanges {

  @Input()
  configObject: ConfigObject;

  @Input()
  crawlJobs: ConfigObject[];

  @Output()
  save = new EventEmitter<ConfigObject>();

  @Output()
  update = new EventEmitter<ConfigObject>();

  // noinspection ReservedWordAsName
  @Output()
  delete = new EventEmitter<ConfigObject>();

  form: FormGroup;

  constructor(protected fb: FormBuilder,
              protected roleService: RoleService) {
    this.createForm();
  }

  get showShortcuts(): boolean {
    return !this.showSave;
  }

  get showSave(): boolean {
    return !this.configObject.id;
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
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  get entityRef() {
    return this.form.get('entityRef');
  }

  get jobRefListId() {
    return this.form.get('jobRefListId');
  }

  get disabled() {
    return this.form.get('disabled');
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

  getCrawlJobName(id) {
    const found = this.crawlJobs.find(crawlJob => crawlJob.id === id);
    return found ? found.meta.name : 'crawlJob';
  }

  onSave(): void {
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
      id: {value: ''},
      disabled: '',
      entityRef: this.fb.group({
        kind: '',
        id: ''
      }),
      jobRefListId: {value: []},
      scope: this.fb.group({
        surtPrefix: ''
      }),
      meta: new Meta(),
    });
  }

  protected updateForm() {
    this.form.setValue({
      id: this.configObject.id,
      disabled: !!this.configObject.seed.disabled,
      entityRef: this.configObject.seed.entityRef,
      jobRefListId: this.configObject.seed.jobRefList.map(job => job.id),
      scope: {
        surtPrefix: this.configObject.seed.scope.surtPrefix,
      },
      meta: this.configObject.meta,
    });

    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  /**
   * Disabled values in form must be copied from model and not the view model (form.value)
   *
   * @returns {Seed}
   */
  protected prepareSave(): ConfigObject {
    const formModel = this.form.value;
    const seed = new Seed({
      entityRef: formModel.entityRef,
      disabled: formModel.disabled,
    });
    seed.jobRefList = formModel.jobRefListId.map(id => new ConfigRef({kind: Kind.CRAWLJOB, id}));
    seed.scope.surtPrefix = formModel.scope.surtPrefix;

    const configObject = new ConfigObject({
      id: formModel.id,
      kind: Kind.SEED,
      meta: formModel.meta,
      seed
    });

    return configObject;
  }
}
