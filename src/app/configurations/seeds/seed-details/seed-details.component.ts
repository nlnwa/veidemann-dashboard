import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CrawlJob, Meta, Seed} from '../../../commons/models/config.model';
import 'rxjs/add/operator/concat';
import {RoleService} from '../../../auth/role.service';


@Component({
  selector: 'app-seed-details',
  templateUrl: './seed-details.component.html',
  styleUrls: ['./seed-details.component.css']
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

  crawlJobList: any[];

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm();
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  get crawlJobId() {
    return this.form.get('job_id');
  }

  get showShortcuts(): boolean {
    const crawljob = this.crawlJobId.value;
    if (crawljob.length > 0) {
      return true;
    }
    return false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.seed) {
      if (!changes.seed.currentValue) {
        this.form.reset();
      }
    }
    if (changes.crawlJobs && this.crawlJobs) {
      this.crawlJobList = this.crawlJobs.map((crawlJob) =>
        ({
          id: crawlJob.id,
          itemName: crawlJob.meta.name,
        }));
    }
    if (this.seed && this.crawlJobList) {
      this.updateForm();
    }
  }

  getCrawlJobName(id): string {
    for (let i = 0; i < this.crawlJobList.length; i++) {
      if (id === this.crawlJobList[i].id) {
        return this.crawlJobList[i].itemName;
      }
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

  private createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      disabled: true,
      entity_id: {value: '', disabled: true},
      job_id: [],
      scope: this.fb.group({surt_prefix: ''}),
      meta: new Meta(),
    });
  }

  private updateForm() {
    this.form.patchValue({
      id: this.seed.id,
      disabled: !this.seed.disabled, // disabled is named active in the view
      entity_id: this.seed.entity_id,
      job_id: this.seed.job_id,
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
  }

  /**
   * Disabled values in form must be copied from model and not the view model (form model)
   *
   * @returns {Seed}
   */
  private prepareSaveSeed(): Seed {
    const viewModel = this.form.value;
    return {
      id: this.seed.id,
      entity_id: this.seed.entity_id,
      scope: {surt_prefix: viewModel.scope.surt_prefix},
      job_id: viewModel.job_id,
      disabled: !viewModel.disabled,
      meta: viewModel.meta,
    };
  }
}
