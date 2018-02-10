import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrawlJob, Label, Seed} from '../../../commons/models/config.model';
import 'rxjs/add/operator/concat';
import {VALID_URL_PATTERN} from '../../../commons/validator';
import {DateTime} from '../../../commons/datetime';


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

  /*
  selectedCrawlJobItems = [];
  dropdownCrawlJobSettings = {
    singleSelection: false,
    text: 'Velg høstejobb',
    enableCheckAll: false,
    enableSearchFilter: true
  };
  */
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
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
        meta: this.fb.group({
          name: ['', [Validators.required, Validators.pattern(VALID_URL_PATTERN)]],
          description: '',
          created: this.fb.group({seconds: {value: '', disabled: true}}),
          created_by: {value: '', disabled: true},
          last_modified: this.fb.group({seconds: {value: '', disabled: true}}),
          last_modified_by: {value: '', disabled: true},
          label: [],
        }),
      }
    );
  }

  private updateForm() {
    this.form.setValue({
      id: this.seed.id,
      disabled: !this.seed.disabled, // disabled is named active in the view
      entity_id: this.seed.entity_id,
      job_id: this.seed.job_id,
      scope: {
        surt_prefix: this.seed.scope.surt_prefix,
      },
      meta: {
        name: this.seed.meta.name,
        description: this.seed.meta.description,
        created: {
          seconds: DateTime.convertFullTimestamp(this.seed.meta.created.seconds),
        },
        created_by: this.seed.meta.created_by,
        last_modified: {
          seconds: DateTime.convertFullTimestamp(this.seed.meta.last_modified.seconds),
        },
        last_modified_by: this.seed.meta.last_modified_by,
        label: [...this.seed.meta.label],
      }
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
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
      meta: {
        name: viewModel.meta.name,
        description: viewModel.meta.description,
        // created: this.seed.meta.created,
        // created_by: this.seed.meta.created_by,
        // last_modified: this.seed.meta.last_modified,
        // last_modified_by: this.seed.meta.last_modified_by,
        label: viewModel.meta.label.map((label: Label) => ({...label})),
      }
    };
  }
}
