import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';


import {AuthService} from '../../../../core/services/auth';
import {ConfigObject, ConfigRef, Kind, Meta, Seed} from '../../../../commons/models';
import {MetaComponent} from '../../meta/meta.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-seed-details',
  templateUrl: './seed-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedDetailComponent implements OnChanges, OnInit, OnDestroy {

  @Input()
  configObject: ConfigObject;

  @Input()
  crawlJobs: ConfigObject[];

  @Input()
  seedToMove: ConfigObject;

  @Output()
  save = new EventEmitter<ConfigObject>();

  @Output()
  saveMultiple = new EventEmitter<{ seeds: string[], configObject: ConfigObject }>();

  @Output()
  update = new EventEmitter<ConfigObject>();

  @Output()
  move = new EventEmitter<ConfigObject>();

  // noinspection ReservedWordAsName
  @Output()
  delete = new EventEmitter<ConfigObject>();

  form: FormGroup;
  ngUnsubscribe = new Subject<void>();

  @ViewChild(MetaComponent) metaComponent;

  constructor(protected fb: FormBuilder,
              protected authService: AuthService) {
    this.createForm();
  }

  get showShortcuts(): boolean {
    return !this.showSave;
  }

  get showSave(): boolean {
    return (this.configObject && !this.configObject.id);
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
    return this.authService.isAdmin() || this.authService.isCurator();
  }

  get entityRef() {
    return this.form.get('entityRef');
  }

  get jobRefListId() {
    return this.form.get('jobRefListId');
  }

  get meta(): AbstractControl {
    return this.form.get('meta');
  }

  get disabled() {
    return this.form.get('disabled');
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (this.form.dirty && this.form.status === 'INVALID' && this.meta.errors && this.meta.errors.name && this.meta.errors.name.seedExists) {
          const existingSeeds = this.meta.errors.name.seedExists;
          const entityId = this.configObject.seed.entityRef.id;
          for (const seed of existingSeeds) {
            const seedEntityRef = seed.seed.entityRef.id;
            if (seedEntityRef === entityId && !this.configObject.id) {
              this.onRemoveExistingUrl(seed.meta.name);
            }
          }
        }
      });
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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onRemoveExistingUrl(url: string) {
    const urls = this.metaComponent.name.value;
    const replaced = urls.replace(url, '');
    this.metaComponent.name.setValue(replaced);
  }

  onMoveSeedToCurrentEntity(seed: any) {
    this.onRemoveExistingUrl(seed.meta.name);
    this.move.emit(seed);
  }

  getCrawlJobName(id) {
    const found = this.crawlJobs.find(crawlJob => crawlJob.id === id);
    return found ? found.meta.name : 'crawlJob';
  }

  onSave(): void {
    if (this.isMultipleSeed() && this.form.valid) {
      this.saveMultiple.emit(this.prepareSaveMultiple());
    } else {
      if (this.form.valid) {
        this.save.emit(this.prepareSave());
      }
    }
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
      disabled: formModel.disabled,
      entityRef: {kind: Kind.CRAWLENTITY, id: formModel.entityRef.id} // Nødvendig?
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

  private isMultipleSeed() {
    const formModel = this.form.value;
    const parts = formModel.meta.name.split(/\s+/);
    return parts.length > 1;
  }

  private prepareSaveMultiple(): { seeds: string[], configObject: ConfigObject } {
    const formModel = this.form.value;

    const seeds = formModel.meta.name.trim().split(/\s+/).filter(s => !!s);
    const seed = new Seed({
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

    return {seeds, configObject};
  }

}
