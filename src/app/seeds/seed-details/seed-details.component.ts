import {Component, Input, OnChanges} from '@angular/core';
import {Seed} from '../seed.model';
import {SeedService} from '../seeds.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {CustomValidators, DateTime, Label} from '../../commons/';
import {CrawlJob, CrawlJobService} from '../../configurations/crawljobs/';
import {EntityService} from '../../entities/entity.service';

@Component({
  selector: 'app-seed-details',
  templateUrl: './seed-details.component.html',
  styleUrls: ['./seed-details.component.css'],

})

export class SeedDetailComponent implements OnChanges {

  private readonly urlPattern =
    '(http|https)(://)([w]{3}[.]{1})([a-z0-9-]+[.]{1}[A-z]+)' +
    '|(http|https)(://)([^www.][a-z0-9-]+[.]{1}[A-z]+.+)';

  @Input() seed: Seed;
  seedForm: FormGroup;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  dropdownCrawljobSettings = {};
  selectedCrawljobItems = [];
  crawljobList: any = [];
  crawljob: CrawlJob;

  constructor(private seedService: SeedService,
              private router: Router,
              private fb: FormBuilder,
              private crawljobService: CrawlJobService,
              private route: ActivatedRoute,
              private mdSnackBar: MdSnackBar,
              private convertTimestamp: DateTime,
              private entityService: EntityService) {
    this.createForm();
    this.getParams();
    this.getCrawljobs();
  }

  getParams() {
    this.route.paramMap.subscribe(params => {
      if (params.has('seed')) {
        this.seedService.getSeed(params.get('seed')).subscribe(seed => {
          this.seed = seed;
          this.ngOnChanges();
        })
      } else {
        // TODO fix this
      }
    });
  }

  createForm() {
    this.seedForm = this.fb.group({
        id: {value: '', disabled: true},
        entity_id: this.fb.group({
          entity_name: {value: '', disabled: true},
          entity_ids: ''
        }),
        job_id: ['', CustomValidators.nonEmpty],
        scope: this.fb.group(
          {surt_prefix: ['', [Validators.required, Validators.minLength(2)]]}),
        meta: this.fb.group({
          name: ['http://', [Validators.required, Validators.pattern(this.urlPattern)]],
          description: '',
          created: this.fb.group({seconds: {value: '', disabled: true}}),
          created_by: {value: '', disabled: true},
          last_modified: this.fb.group({seconds: {value: '', disabled: true}}),
          last_modified_by: {value: '', disabled: true},
        }),
        label: this.fb.array([]),
      }
    );
  }

  updateData(seed: Seed) {
    this.seedForm.controls['id'].setValue(seed.id);
    this.seedForm.controls['scope'].patchValue({
      surt_prefix: seed.scope.surt_prefix
    });
    this.seedForm.controls['meta'].patchValue({
      name: seed.meta.name,
      description: seed.meta.description,
      created: {
        seconds: this.convertTimestamp.convertFullTimestamp(seed.meta.created.seconds),
      },
      created_by: seed.meta.created_by,
      last_modified: {
        seconds: this.convertTimestamp.convertFullTimestamp(seed.meta.last_modified.seconds),
      },
      last_modified_by: seed.meta.last_modified_by,
    });
    this.setLabel(this.seed.meta.label);
    this.setSelectedDropdown()
  }

  getEntityName(entity_id) {
    this.entityService.getEntity(entity_id).subscribe(entity => {
      this.seedForm.controls['entity_id'].setValue({entity_name: entity.meta.name, entity_ids: this.seed.entity_id});
    });
  }

  ngOnChanges() {
    setTimeout(() => {
      this.getEntityName(this.seed.entity_id);
    }, 0);
    this.updateData(this.seed);
  }

  setSelectedDropdown() {
    this.selectedCrawljobItems = [];
    if (this.seed.job_id) {
      for (const i of this.seed.job_id) {
        this.crawljobService.getCrawlJob(i)
          .subscribe(crawlJob => {
            this.selectedCrawljobItems.push({
              id: crawlJob.id,
              itemName: crawlJob.meta.name,
              description: crawlJob.meta.description
            });
          });
      }
    }
    // this.seedForm.controls['job_id'].setValue(this.selectedCrawlJobItems);
  }


  getCrawljobs() {
    this.selectedCrawljobItems = [];
    this.dropdownCrawljobSettings = {
      singleSelection: false,
      text: 'Velg høstejobb',
      enableSearchFilter: true
    };

    this.crawljobService.getAllCrawlJobs()
      .map(reply => reply.value)
      .subscribe(crawlJobs => {
        crawlJobs.forEach((crawlJob) => {
          this.crawljobList.push({
            id: crawlJob.id,
            itemName: crawlJob.meta.name,
            description: crawlJob.meta.description
          });
        });
      });
  }


  updateSeed(seedForm): void {
    this.seed = this.prepareSaveSeed();
    this.seedService.updateSeed(this.seed)
      .subscribe((updatedSeed) => {
        // this.updateHandler(updatedSeed);
        this.updateData(updatedSeed);
      });

    this.mdSnackBar.open('Lagret');
  }

  deleteSeed(): void {
    this.seedService.deleteSeed(this.seed.id)
      .map((deletedSeed) => {
        if (deletedSeed === 'not_allowed') {
          this.mdSnackBar.open('Feil: Ikke slettet');
        } else {
          this.mdSnackBar.open('Slettet');
        }
      });
    this.goBack()
  }

  prepareSaveSeed(): Seed {
    const formModel = this.seedForm.value;
    const job_idlist = [];
    for (const i of formModel.job_id) {
      const job_id = i.id;
      job_idlist.push(job_id);
    }

    // deep copy of form
    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

    // return new `Seed` object containing a combination of original seed value(s)
    // and deep copies of changed form model values
    const saveSeed: Seed = {
      id: this.seed.id,
      entity_id: this.seed.entity_id,
      scope: {surt_prefix: formModel.scope.surt_prefix as string},
      job_id: job_idlist,
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        created: this.seed.meta.created,
        created_by: this.seed.meta.created_by,
        last_modified: this.seed.meta.last_modified,
        last_modified_by: this.seed.meta.last_modified_by,
        label: labelsDeepCopy
      }
    };
    return saveSeed;
  }

  setLabel(label) {
    const labelFGs = label.map(lbl => (this.fb.group(lbl)));
    const labelFormArray = this.fb.array(labelFGs);
    this.seedForm.setControl('label', labelFormArray);
  }

  initLabel() {
    return this.fb.group({
      key: 'Label',
      value: '',
    });
  }

  get label(): FormArray {
    return this.seedForm.get('label') as FormArray;
  }


  addLabel() {
    const control = <FormArray>this.seedForm.controls['label'];
    control.push(this.initLabel());
  }

  removeLabel(i: number) {
    const control = <FormArray>this.seedForm.controls['label'];
    control.removeAt(i);
  }

  revert() {
    this.updateData(this.seed);
    this.mdSnackBar.open('Tilbakestilt');
  }

  goToEntity() {
    this.router.navigate(['/entities/', this.seed.entity_id])
  }

  goBack(): void {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 0);
    setTimeout(() => {
      this.router.navigate(['/seedsearch']);
    }, 0);
  }

}
