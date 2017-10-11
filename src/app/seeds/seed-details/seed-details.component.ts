import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SeedService} from '../seeds.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdSnackBar} from '@angular/material';
import {CustomValidators, DateTime} from '../../commons/';
import {CrawlJobService} from '../../configurations/crawljobs/';
import {Label, Seed} from '../../commons/models/config.model';
import {UrlHelper} from '../../commons/url-util';
import 'rxjs/add/operator/concat';
import {SeedDetailsText} from './seed-details.text';


@Component({
  selector: 'app-seed-details',
  templateUrl: './seed-details.component.html',
  styleUrls: ['./seed-details.component.css'],
  providers: [SeedDetailsText]

})

export class SeedDetailComponent {
  @Output()
  seedCreated = new EventEmitter<Seed>();
  @Output()
  seedDeleted = new EventEmitter<Seed>();

  dropdownCrawlJobSettings = {};
  selectedCrawlJobItems = [];
  crawlJobList = [];

  private _seed: Seed;

  private _form: FormGroup;

  constructor(private seedService: SeedService,
              private fb: FormBuilder,
              private crawlJobService: CrawlJobService,
              private mdSnackBar: MdSnackBar,
              public seedDetailsText: SeedDetailsText) {
    this.createForm();
    this.getCrawlJobs();
  }

  get seed() {
    return this._seed;
  }

  @Input()
  set seed(seed: Seed) {
    if (seed) {
      this._seed = seed;
      setTimeout(() => this.updateForm(seed), 0);
    } else {
      this._seed = null;
    }
  }

  get form() {
    return this._form;
  }

  set form(fg: FormGroup) {
    this._form = fg;
  }

  createForm() {
    this.form = this.fb.group({
        id: {value: '', disabled: true},
        disabled: true,
        entity_id: {value: '', disabled: true},
        job_id: [[], CustomValidators.nonEmpty],
        scope: this.fb.group({surt_prefix: ''}),
        meta: this.fb.group({
          name: ['', [Validators.required, Validators.pattern(UrlHelper.URL_PATTERN)]],
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

  updateForm(seed: Seed) {
    this.form.patchValue({
      id: seed.id,
      entity_id: seed.entity_id,
      disabled: !seed.disabled, // disabled is named active in the view
      job_id: seed.job_id,
      scope: {
        surt_prefix: seed.scope.surt_prefix,
      },
      meta: {
        name: seed.meta.name,
        description: seed.meta.description,
        created: {
          seconds: DateTime.convertFullTimestamp(seed.meta.created.seconds),
        },
        created_by: seed.meta.created_by,
        last_modified: {
          seconds: DateTime.convertFullTimestamp(seed.meta.last_modified.seconds),
        },
        last_modified_by: seed.meta.last_modified_by,
        label: seed.meta.label,
      }
    });
    this.form.markAsPristine();
    this.setSelectedDropdown(seed.job_id);
  }

  /**
   * Disabled values in form must be copied from model and not the view model (form model)
   * @param {Seed} viewModel
   * @returns {Seed}
   */
  prepareSaveSeed(viewModel: Seed): Seed {
    return {
      id: this.seed.id,
      entity_id: this.seed.entity_id,
      scope: {surt_prefix: viewModel.scope.surt_prefix},
      job_id: viewModel.job_id.map(element => (element as any).jobId),
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

  setSelectedDropdown(jobIds) {
    this.selectedCrawlJobItems = [];
    if (!jobIds.length) {
      return;
    } else {
      console.log('setSelectedDropdown', jobIds);
    }
    jobIds
      .map((jobId) => this.crawlJobService.get(jobId))
      .reduce((acc, curr) => acc.concat(curr))
      .subscribe((crawlJob) =>
        this.selectedCrawlJobItems.push({
          id: this.selectedCrawlJobItems.length,
          itemName: crawlJob.meta.name,
          jobId: crawlJob.id
        }));
  }

  getCrawlJobs() {
    this.selectedCrawlJobItems = [];
    this.dropdownCrawlJobSettings = {
      singleSelection: false,
      text: 'Velg høstejobb',
      enableSearchFilter: true
    };

    this.crawlJobService.list()
      .map(reply => reply.value)
      .subscribe(crawlJobs => {
        crawlJobs.forEach((crawlJob, index) => {
          this.crawlJobList.push({
            id: index,
            itemName: crawlJob.meta.name,
            jobId: crawlJob.id,
          });
        });
      });
  }

  onSave(): void {
    const seed = this.prepareSaveSeed(this.form.value);
    this.seedService.create(seed)
      .subscribe((createdSeed) => {
        this.seed = createdSeed;
        this.seedCreated.emit(createdSeed);
      });

    this.mdSnackBar.open('Lagret');
  }

  onUpdate(): void {
    const seed = this.prepareSaveSeed(this.form.value);
    this.seedService.update(seed)
      .subscribe((updatedSeed) => {
        this.seed = updatedSeed;
      });

    this.mdSnackBar.open('Lagret');
  }

  onDelete(): void {
    this.seedService.delete(this.seed.id)
      .subscribe((deletedSeed) => {
        this.seedDeleted.emit({...this.seed});
        this.seed = deletedSeed;
        if (deletedSeed === 'not_allowed') {
          this.mdSnackBar.open('Feil: Ikke slettet');
        } else {
          this.mdSnackBar.open('Slettet');
        }
      });
  }

  onRevert() {
    this.updateForm(this.seed);
    this.mdSnackBar.open('Tilbakestilt');
  }


}
