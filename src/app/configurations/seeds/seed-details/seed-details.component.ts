import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CrawlJob, Meta, Seed} from '../../../commons/models/config.model';

import {RoleService} from '../../../auth/role.service';


@Component({
  selector: 'app-seed-details',
  templateUrl: './seed-details.component.html',
  styleUrls: ['./seed-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedDetailComponent implements OnChanges {

  @Input()
  set data(show) {
    this.shouldShow = show;
  }

  @Input()
  seed: Seed;

  @Input()
  crawlJobs: CrawlJob[];

  @Input()
  equalDisabled: boolean;

  @Output()
  save = new EventEmitter<Seed>();

  @Output()
  update = new EventEmitter<Seed>();

  // noinspection ReservedWordAsName
  @Output()
  delete = new EventEmitter<Seed>();

  @Output()
  clear = new EventEmitter<void>();

  form: FormGroup;
  shouldShow = true;

  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm({
      id: {value: '', disabled: true},
      disabled: '',
      entity_id: {value: '', disabled: true},
      job_id: [''],
      scope: this.fb.group({surt_prefix: ''}),
      meta: new Meta(),
    });
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  get crawlJobId() {
    return this.form.get('job_id');
  }

  get disabled() {
    return this.form.get('disabled');
  }

  get showShortcuts(): boolean {
    const crawlJob = this.crawlJobId.value;
    return crawlJob && crawlJob.length > 0;
  }

  onClearClicked() {
    this.clear.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.seed && !this.seed) {
      this.form.reset();
    }
    if (this.seed && this.crawlJobs) {
      this.updateForm();
    }
  }

  getCrawlJobName(id): string {
    const found = this.crawlJobs.find((job) => job.id === id);
    return found ? found.meta.name : '';
  }

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

  onSave(): void {
    this.save.emit(this.prepareSaveSeed());
  }

  onUpdate(): void {
    this.update.emit(this.prepareSaveSeed());
  }

  onDelete(): void {
    this.delete.emit(this.seed);
  }

  onRevert() {
    this.updateForm();
  }

  private createForm(controlsConfig: object) {
    this.form = this.fb.group(controlsConfig);
  }

  updateForm() {
    this.form.patchValue({
      id: this.seed.id,
      disabled: this.seed.disabled,
      entity_id: this.seed.entity_id,
      job_id: this.seed.job_id || [],
      scope: {
        surt_prefix: this.seed.scope.surt_prefix,
      },
      meta: this.seed.meta,
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
  private prepareSaveSeed(): Seed {
    return this.form.getRawValue();
  }
}
