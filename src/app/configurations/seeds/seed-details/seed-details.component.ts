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
  seed: Seed;

  @Input()
  crawlJobs: CrawlJob[];

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

  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm(new Seed());
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  get crawlJobId() {
    return this.form.get('job_id');
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
      this.updateForm(this.seed);
    }
  }

  getCrawlJobName(id): string {
    const found = this.crawlJobs.find((job) => job.id === id);
    return found ? found.meta.name : '';
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
    this.updateForm(this.seed);
  }

  private createForm(seed: Seed) {
    this.form = this.fb.group({
      id: {value: seed.id, disabled: true},
      disabled: seed.disabled,
      entity_id: {value: seed.entity_id, disabled: true},
      job_id: seed.job_id,
      scope: this.fb.group({surt_prefix: seed.scope.surt_prefix}),
      meta: seed.meta,
    });
  }

  private updateForm(seed: Seed) {
    if (!this.canEdit) {
      this.form.disable();
    }
    this.form.setValue({
      id: seed.id,
      disabled: !!seed.disabled,
      entity_id: seed.entity_id,
      job_id: seed.job_id || [],
      scope: {
        surt_prefix: seed.scope.surt_prefix,
      },
      meta: seed.meta,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
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
