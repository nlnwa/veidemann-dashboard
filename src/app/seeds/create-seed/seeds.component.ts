import {Component, Input} from '@angular/core';
import {Seed} from '../seed.model';
import {SeedService} from '../seeds.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {CustomValidators, Label} from '../../commons/';
import {CrawlJobService} from '../../configurations/crawljobs/';
import {EntityService} from '../../entities/entity.service';

@Component({
  selector: 'app-seeds',
  templateUrl: './seeds.component.html',
  styleUrls: ['./seeds.component.css']
})
export class SeedsComponent {
  @Input() seed: Seed;
  seedForm: FormGroup;
  entityList: any = [];
  crawlJobList: any = [];

  selectedEntityItems = [];
  dropdownEntitySettings = {};
  dropdownCrawlJobSettings = {};
  selectedCrawlJobItems = [];

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private seedService: SeedService,
              private fb: FormBuilder,
              private entityService: EntityService,
              private crawlJobService: CrawlJobService,
              private mdSnackBar: MdSnackBar,
              private router: Router) {

    this.createForm();
    // this.getSeeds();
    this.getEntities();
    this.getCrawlJobs()
  }

  createForm() {
    this.seedForm = this.fb.group({
      entity_id: ['', CustomValidators.nonEmpty],
      job_id: ['', CustomValidators.nonEmpty],
      scope: this.fb.group({
        surt_prefix: ''
      }),
      meta: this.fb.group({
        name: ['http://',
          [Validators.required,
            Validators.pattern(
              `(http|https)(:\/\/)([w]{3}[.]{1})([a-z0-9-]+[.]{1}[A-z]+)|(http|https)(:\/\/)([^www\.][a-z0-9-]+[.]{1}[A-z]+.+)`)]],
        description: '',
        label: this.fb.array([]),
      }),
    });
    this.setLabel([]);
  }

  createSeedNew() {
    this.seed = this.prepareSaveSeed();
    this.seedService.createSeed(this.seed).subscribe();
    this.mdSnackBar.open('Lagret');
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 0);
    setTimeout(() => {
      this.router.navigate(['/seeds']);
    }, 0);
  }

  createSeed() {
    this.seed = this.prepareSaveSeed();
    this.seedService.createSeed(this.seed).subscribe();
    this.mdSnackBar.open('Lagret');
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 0);
  }

  prepareSaveSeed(): Seed {
    const formModel = this.seedForm.value;
    const job_idlist = [];

    for (const i of formModel.job_id) {
      const job_id = i.id;
      job_idlist.push(job_id);
    }

    // deep copy of form model lairs
    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveSeed: Seed = {
      // id: this.seed.id,
      entity_id: formModel.entity_id[0].id,
      scope: {surt_prefix: ''},
      job_id: job_idlist,
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        created: null,
        created_by: '',
        last_modified: null,
        last_modified_by: '',
        label: labelsDeepCopy
      }
    };
    return saveSeed;
  }

  updateSeed(seed: Seed): void {
    this.seedService.updateSeed(this.seedForm.value)
      .map((updatedSeed: Seed) => {
        this.updateHandler(updatedSeed);
      });
  }

  get label(): FormArray {
    return this.seedForm.get('label') as FormArray;
  };

  setLabel(label) {
    const labelFGs = label.map(l => (this.fb.group(l)));
    const labelFormArray = this.fb.array(labelFGs);
    this.seedForm.setControl('label', labelFormArray);
  }

  addLabel() {
    const control = <FormArray>this.seedForm.controls['label'];
    control.push(this.initLabel());
  }

  removeLabel(i: number) {
    const control = <FormArray>this.seedForm.controls['label'];
    control.removeAt(i);
  }

  initLabel() {
    return this.fb.group({
      key: ['Label', [Validators.required, Validators.minLength(2)]],
      value: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  getEntities() {
    this.selectedEntityItems = [];
    this.dropdownEntitySettings = {
      singleSelection: true,
      text: 'Velg Entitet',
      enableSearchFilter: true
    };

    this.entityService.getAllEntities()
      .map(reply => reply.value)
      .subscribe((entities) => {
        entities.forEach((entity) => {
          this.entityList.push({
            id: entity.id,
            itemName: entity.meta.name,
            description: entity.meta.description
          })
        })
      });
  }

  getCrawlJobs() {
    this.selectedCrawlJobItems = [];
    this.dropdownCrawlJobSettings = {
      singleSelection: false,
      text: 'Velg høstejobb',
      enableSearchFilter: true
    };

    this.crawlJobService.getAllCrawlJobs()
      .map(reply => reply.value)
      .subscribe((crawlJobs) => {
        crawlJobs.forEach((crawlJob) => {
          this.crawlJobList.push({
            id: crawlJob.id,
            itemName: crawlJob.meta.name,
            description: crawlJob.meta.description
          })
        })
      });
  }
}
