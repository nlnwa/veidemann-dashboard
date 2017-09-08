import {Component, Input} from "@angular/core";
import {Seed} from '../seed';
import {SeedService} from "../seeds.service";
import {FormGroup, FormBuilder, FormArray, Validators} from "@angular/forms";
import {MdlSnackbarService} from "angular2-mdl";
import {Router} from "@angular/router";
import {CustomValidators, Label} from "../../commons/";
import {CrawljobService} from "../../configurations/crawljobs/";
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
  crawljobList: any = [];

  selectedEntityItems = [];
  dropdownEntitySettings = {};
  dropdownCrawljobSettings = {};
  selectedCrawljobItems = [];

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private seedService: SeedService,
              private fb: FormBuilder,
              private entityService: EntityService,
              private crawljobService: CrawljobService,
              private mdlSnackbarService: MdlSnackbarService,
              private router: Router,) {

    this.createForm();
    // this.getSeeds();
    this.getEntities();
    this.getCrawljobs()
  }

  createForm() {
    this.seedForm = this.fb.group({
      entity_id: ['', CustomValidators.nonEmpty],
      job_id: ['', CustomValidators.nonEmpty],
      scope: this.fb.group({
        surt_prefix: ''
      }),
      meta: this.fb.group({
        name: ['http://', [Validators.required, Validators.pattern(`(http|https)(:\/\/)([w]{3}[.]{1})([a-z0-9-]+[.]{1}[A-z]+)|(http|https)(:\/\/)([^www\.][a-z0-9-]+[.]{1}[A-z]+.+)`)]],
        description: '',
        label: this.fb.array([]),
      }),
    });
    this.setLabel([]);
  }

  getSeeds(): void {
    this.seedService.getAllSeeds().subscribe(seed => this.seed = seed)
  }

  createSeedNew() {
    this.seed = this.prepareSaveSeed();
    this.seedService.createSeed(this.seed);
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 0);
    setTimeout(() => {
      this.router.navigate(['/seeds']);
    }, 0);
  }

  createSeed() {
    this.seed = this.prepareSaveSeed();
    this.seedService.createSeed(this.seed);
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 0);
  }

  prepareSaveSeed(): Seed {
    const formModel = this.seedForm.value;
    let job_idlist = [];

    for (let i of formModel.job_id) {
      let job_id = i.id;
      job_idlist.push(job_id);
    }

    // deep copy of form model lairs
    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveSeed: Seed = {
      //id: this.seed.id,
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
    this.seedService.updateSeed(this.seedForm.value).then((updatedSeed: Seed) => {
      this.updateHandler(updatedSeed);
    });
  }

  get label(): FormArray {
    return this.seedForm.get('label') as FormArray;
  };

  setLabel(label) {
    const labelFGs = label.map(label => (this.fb.group(label)));
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
      text: "Velg Entitet",
      enableSearchFilter: true
    };

    this.entityService.getEntities().map(entities => entities.value).forEach((value) => {
      value.forEach((key) => {
        this.entityList.push({id: key.id, itemName: key.meta.name, description: key.meta.description})
      })
    });
  }

  getCrawljobs() {
    this.selectedCrawljobItems = [];
    this.dropdownCrawljobSettings = {
      singleSelection: false,
      text: "Velg høstejobb",
      enableSearchFilter: true
    };

    this.crawljobService.getAllCrawlJobs().map(crawljobs => crawljobs.value).forEach((value) => {
      value.forEach((key) => {
        this.crawljobList.push({id: key.id, itemName: key.meta.name, description: key.meta.description})
      })
    });
  }
}
