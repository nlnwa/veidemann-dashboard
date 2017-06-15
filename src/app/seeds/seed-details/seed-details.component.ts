import {Component, Input} from "@angular/core";
import {Seed, Label} from "../seed";
import {SeedsService} from "../seeds.service";
import {Location} from "@angular/common";
import {FormGroup, FormArray, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {MdlSnackbarService} from "angular2-mdl";


@Component({
  selector: 'seed-details',
  templateUrl: './seed-details.component.html',
  styleUrls: ['./seed-details.component.css'],

})


export class SeedDetailComponent {
  @Input() seed : Seed;
  seedForm: FormGroup;
  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  //collapse content
  public isCollapsedContent:boolean = true;


  dropdownCrawljobSettings = {};
  selectedCrawljobItems = [];
  crawljobList: any = [];

  constructor(
    private seedService: SeedsService,
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private mdlSnackbarService: MdlSnackbarService,
  ) {
    this.router = router;
    this.createForm();
    this.getJobs();
  }

  createForm() {
    this.seedForm = this.fb.group({
      id: {value: '', disabled: true},
      entity_id: {value: '', disabled: true},
      job_id: '',
      scope: this.fb.group ({
        surt_prefix: ''}),
      meta: this.fb.group ({
        name: '',
        description: '',
        created: this.fb.group({seconds: {value: '', disabled: true, }}),
        created_by: {value: '', disabled: true},
        last_modified: this.fb.group({seconds: {value: '', disabled: true}}),
        last_modified_by: {value: '', disabled: true},
        label: this.fb.array([]),
      }),
    });
  }

  ngOnChanges() {
    this.seedForm.reset({
    id: this.seed.id,
    entity_id: this.seed.entity_id,
    scope: this.fb.group({
      surt_prefix: this.seed.scope.surt_prefix,
    }),
      meta: this.fb.group ({
        name: this.seed.meta.name,
        description: this.seed.meta.description,
        created: this.seed.meta.created,
        created_by: this.seed.meta.created_by,
        last_modified: this.seed.meta.last_modified,
        last_modified_by: this.seed.meta.last_modified_by,
    }),
  });

    this.setLabel(this.seed.meta.label);
    for (let i of this.seed.job_id) {
      this.seedService.getCrawlJob(i).map(crawljob => crawljob).forEach((value) => {
        value.forEach((key) => {
          this.selectedCrawljobItems.push({id: key.id, itemName: key.meta.name})
        })
      });
    }
  }

  get label(): FormArray {
    return this.seedForm.get('label') as FormArray;
  };


  getJobs(){
    this.seedService.getCrawlJobs().map(crawljobs => crawljobs.value).forEach((value) => {
      value.forEach((key) => {
        this.crawljobList.push({id: key.id, itemName: key.meta.name})
      })
    });

    this.dropdownCrawljobSettings = {
      singleSelection: false,
      text:"Velg høstejobb",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true
    };
  }

  setLabel(label) {
    const labelFGs = label.map(label => (this.fb.group(label)));
    const labelFormArray = this.fb.array(labelFGs);
    this.seedForm.setControl('label', labelFormArray);
  }

  initLabel() {
    return this.fb.group({
      key: '',
      value: '',
    });
  }

  addLabel() {
    const control = <FormArray>this.seedForm.controls['label'];
    control.push(this.initLabel());
  }

  removeLabel(i: number) {
    const control = <FormArray>this.seedForm.controls['label'];
    control.removeAt(i);
  }


  /*updateSchedule(schedule: Schedule): void {
    this.crawljobService.updateSchedule(this.schedule).then((updatedSchedule: Schedule) => {
      this.updateHandler(updatedSchedule);
      //   this.ngOnChanges();
    });
  }*/

  updateSeed(seedForm): void {
    this.seed  = this.prepareSaveSeed();
   // console.log(this.seed);
    //console.log(seedForm.getRawValue());
    this.seedService.updateSeed(this.seed);
    this.mdlSnackbarService.showSnackbar(
      {
        message:'Lagret',
      });
  }


  deleteSeed(seedId: String): void {
    this.seedService.deleteSeed(seedId);
    this.mdlSnackbarService.showSnackbar(
      {
        message:'Slettet',
      });
    this.goBack()
  }

  revert() {this.ngOnChanges(); }

  prepareSaveSeed(): Seed {
    const formModel = this.seedForm.value;
    let job_idlist = [];
    for (let i of formModel.job_id) {
      let job_id = i.id;
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
      uri: formModel.uri as string,
      scope: {surt_prefix: formModel.scope.surt_prefix as string},
      job_id: job_idlist,
      meta: {
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
  onItemSelect(item){
    console.log('Selected Item:');
    console.log(item.id);
  }
  OnItemDeSelect(item){
    console.log('De-Selected Item:');
    console.log(item);
  }


  goBack(): void {
    setTimeout(()=> {this.router.navigate(['/']);},0);
    setTimeout(()=> {this.router.navigate(['/seedsearch']);},0);
  }

}
