import {Component, Input} from '@angular/core';
import {SeedsService} from "./seeds.service";
import {Seed, Label} from "./seed";
import {Entity} from "../../../crap/entities/entity"
import {FormGroup, FormBuilder, FormArray, Validators} from "@angular/forms";
import {MdlSnackbarService} from "angular2-mdl";
import {Router} from "@angular/router";

@Component({
  selector: 'app-seeds',
  templateUrl: './seeds.component.html',
  styleUrls: ['./seeds.component.css']
})
export class SeedsComponent {
  @Input() seed : Seed;
  entities: Entity[];
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

  constructor(
    private seedService: SeedsService,
    private fb: FormBuilder,
    private mdlSnackbarService: MdlSnackbarService,
    private router: Router,
  ) {
    this.createForm();
    this.getSeeds();
    this.getEntities();
  }

  createForm() {
    this.seedForm = this.fb.group({
      entity_id: ['', FormValidatorUtils.nonEmpty],
      uri: '',
      job_id: ['', FormValidatorUtils.nonEmpty],
      scope: this.fb.group ({
        surt_prefix: ''}),
      meta: this.fb.group ({
        name: ['http://', [Validators.required,Validators.pattern(`(http|https)(:\/\/)([w]{3}[.]{1})([a-z0-9-]+[.]{1}[A-z]+)|(http|https)(:\/\/)([^www\.][a-z0-9-]+[.]{1}[A-z]+.+)`)]],
        description: '',
        label: this.fb.array([]),
      }),
    });
    this.setLabel([]);
  }

  initLabel() {
    return this.fb.group({
      key: ['', [Validators.required, Validators.minLength(2)]],
      value: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  getSeeds(): void {
    this.seedService.getAllSeeds().subscribe(seed => this.seed = seed)
}

  createSeedNew() {
    this.seed  = this.prepareSaveSeed();
    this.seedService.createSeed(this.seed);
    this.mdlSnackbarService.showSnackbar(
      {
        message:'Lagret',
      });
    setTimeout(()=> {this.router.navigate(['/']);},0);
    setTimeout(()=> {this.router.navigate(['/seeds']);},0);
  }

  createSeed() {
    this.seed  = this.prepareSaveSeed();
    this.seedService.createSeed(this.seed);
    this.mdlSnackbarService.showSnackbar(
      {
      message:'Lagret',
  });
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

    /* kanskje sette id i objektet, beholder inntil videre
    const job_idDeepCopy: Job_id[] = job_idlist.map(
      (job_id: Job_id) => Object.assign({}, job_id)
    );
    */

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveSeed: Seed = {
      id: this.seed.id,
      entity_id: formModel.entity_id[0].id,
      uri: formModel.uri as string,
      scope: {surt_prefix: ''},
      job_id: job_idlist,
      meta: {
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

  onItemSelect(item){
    console.log('Selected Item:');
    console.log(item);
  }
  OnItemDeSelect(item){
    console.log('De-Selected Item:');
    console.log(item);
  }
  getEntities() {
    //  this.setLabel(this.seed.meta.label);
    this.seedService.getEntities().map(entities => entities.value).forEach((value) => {
      value.forEach((key) => {
        this.entityList.push({id: key.id, itemName: key.meta.name})
      })
    });

    this.seedService.getCrawlJobs().map(crawljobs => crawljobs.value).forEach((value) => {
      value.forEach((key) => {
        this.crawljobList.push({id: key.id, itemName: key.meta.name})
      })
    });

    this.selectedCrawljobItems = [];
    this.selectedEntityItems = [];

    this.dropdownEntitySettings = {
      singleSelection: true,
      text:"Velg Entitet",
      enableSearchFilter: true
    };

    this.dropdownCrawljobSettings = {
      singleSelection: false,
      text:"Velg høstejobb",
      enableSearchFilter: true
    };
  }

}
export class FormValidatorUtils {
  static nonEmpty(control: any) {
    if (!control.value || control.value.length === 0) {
      return { 'noElements': true };
    }
    return null;
  }

}
