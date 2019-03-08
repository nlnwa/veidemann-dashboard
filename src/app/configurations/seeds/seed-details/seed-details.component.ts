import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';


import {RoleService} from '../../../auth/';
import {ConfigObject, Kind, Meta, Seed} from '../../../commons/models';


@Component({
  selector: 'app-seed-details',
  templateUrl: './seed-details.component.html',
  styleUrls: ['./seed-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedDetailComponent implements OnChanges {
  readonly Kind = Kind;

  @Input()
  set data(show) {
    this.shouldShow = show;
  }

  @Input()
  options: any;

  @Input()
  configObject: ConfigObject;

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
  shouldAddCrawlJob = undefined;
  allSelected = false;

  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm();
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  get crawlJobRefList() {
     return this.form.get('jobRefList').value;
  }

  get disabled() {
    return this.form.get('disabled');
  }

  get showShortcuts(): boolean {
     return this.crawlJobRefList.length > 0;
  }

  get showSave() {
    return this.configObject ? !this.configObject.id : false;
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
    const found = this.options.crawlJobs.find(crawlJob => crawlJob.id === id);
    return found ? found.meta.name : 'crawlJob';
  }
  //
  // getCrawlJobName(id): string {
  //   const found = this.crawlJobs.find((job) => job.id === id);
  //   return found ? found.meta.name : '';
  // }

  // Disables disable toggle switch if every selected seed doesn't have the same disabled value
  shouldDisableDisabled(): void {
    if (this.equalDisabled !== undefined || !this.shouldShow) {
      if (!this.equalDisabled) {
        this.disabled.disable();
      }
    }
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

  onToggleShouldAddCrawlJob(shouldAdd: boolean): void {
    this.shouldAddCrawlJob = shouldAdd;
    this.form.controls.jobRefList.markAsDirty();
  }

  onSave(): void {
    this.save.emit(this.prepareSaveSeed());
  }

  onUpdate(): void {
    this.update.emit(this.prepareSaveSeed());
  }

  onDelete(): void {
    this.delete.emit(this.configObject);
  }

  onRevert() {
    this.updateForm();
  }

  private createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      disabled: '',
      // entityRef: {value: '', disabled: true},
      entityRef: this.fb.group({
        kind: '',
        id: {value: '', disabled: true}
      }),
      jobRefList: '',
      scope: this.fb.group({
        surtPrefix: ''
      }),
      meta: new Meta(),
    });
  }

  updateForm() {
    this.form.patchValue({
      id: this.configObject.id,
      disabled: this.configObject.seed.disabled || false,
      entityRef: {
        kind: this.configObject.seed.entityRef.kind,
        id: this.configObject.seed.entityRef.id
      },
      jobRefList: this.configObject.seed.jobRefList || [],
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
    this.shouldDisableDisabled();
  }

  /**
   * Disabled values in form must be copied from model and not the view model (form.value)
   *
   * @returns {Seed}
   */
  private prepareSaveSeed(): ConfigObject {
    const formModel = this.form.value;

    const configObject = new ConfigObject({kind: Kind.SEED});

    if (this.configObject.id !== '') {
      configObject.id = this.configObject.id;
    }

    const seed = new Seed();
    seed.disabled = formModel.disabled;
    seed.entityRef.id = this.configObject.seed.entityRef.id;
    seed.jobRefList = formModel.jobRefList;
    seed.scope.surtPrefix = formModel.scope.surtPrefix;

    configObject.seed = seed;
    configObject.meta = formModel.meta;
    return configObject;
  }
}
