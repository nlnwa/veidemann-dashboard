import {Component, Input} from "@angular/core";
import {Seed} from "../seed";
import {Label} from "../../commons/models/label";
import {SeedsService} from "../seeds.service";
import {Location} from "@angular/common";
import {FormGroup, FormArray, FormBuilder} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {MdlSnackbarService} from "angular2-mdl";


@Component({
  selector: 'seed-details',
  templateUrl: './seed-details.component.html',
  styleUrls: ['./seed-details.component.css'],

})

export class SeedDetailComponent {
  @Input() seed: Seed;
  seedForm: FormGroup;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  //collapse content
  public isCollapsedContent: boolean = true;

  dropdownCrawljobSettings = {};
  selectedCrawljobItems = [];
  crawljobList: any = [];

  constructor(private seedService: SeedsService,
              private router: Router,
              private fb: FormBuilder,
              private location: Location,
              private route: ActivatedRoute,
              private mdlSnackbarService: MdlSnackbarService,) {
    this.createForm();
    this.router = router;
    this.getParams();
    this.getJobs();
  }

  getParams() {
    this.route.params.subscribe(params => {
      if (params.seed == null) {
        this.createForm();
      } else {
        this.seedService.getSeed(params.seed).subscribe(seed => {
          this.seed = seed[0];
          this.updateData(this.seed);
        })
      }
    });
  }

  createForm() {
    this.seedForm = this.fb.group({
      id: {value: '', disabled: true},
      entity_id: {value: '', disabled: true},
      job_id: '',
      scope: this.fb.group({surt_prefix: ''}),
      meta: this.fb.group({
        name: '',
        description: '',
        created: this.fb.group({seconds: {value: '', disabled: true,}}),
        created_by: {value: '', disabled: true},
        last_modified: this.fb.group({seconds: {value: '', disabled: true}}),
        last_modified_by: {value: '', disabled: true},
      }),
      label: this.fb.array([]),
    });
  }

  updateData(seed: Seed) {
    this.seedForm.controls['id'].setValue(seed.id);
    this.seedForm.controls['entity_id'].setValue(seed.entity_id);
    this.seedForm.controls['scope'].patchValue({
      surt_prefix: seed.scope.surt_prefix
    });
    this.seedForm.controls['meta'].patchValue({
      name: seed.meta.name,
      description: seed.meta.description,
      created: {
        seconds: this.convertTimestamp(seed.meta.created.seconds),
      },
      created_by: seed.meta.created_by,
      last_modified: {
        seconds: this.convertTimestamp(seed.meta.last_modified.seconds),
      },
      last_modified_by: seed.meta.last_modified_by,
    });
    this.setLabel(this.seed.meta.label);
    this.setDropdown()
  }


  ngOnChanges() {
    console.log(this.seed);
    this.updateData(this.seed);
  }

  setDropdown() {
    this.selectedCrawljobItems = [];
    for (let i of this.seed.job_id) {
      this.seedService.getCrawlJob(i).map(crawljob => crawljob).forEach((value) => {
        value.forEach((key) => {
          this.selectedCrawljobItems.push({id: key.id, itemName: key.meta.name})
        })
      });
    }
  }

  convertTimestamp(timestamp) {
    const newdate = new Date(timestamp * 1000);
    return newdate
  }


  getJobs() {
    this.seedService.getCrawlJobs().map(crawljobs => crawljobs.value).forEach((value) => {
      value.forEach((key) => {
        this.crawljobList.push({id: key.id, itemName: key.meta.name})
      })
    });

    this.dropdownCrawljobSettings = {
      singleSelection: false,
      text: "Velg høstejobb",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
    };
  }


  updateSeed(seedForm): void {
    this.seed = this.prepareSaveSeed();
    this.seedService.updateSeed(this.seed)
      .then((updatedSeed) => {
        this.updateHandler(updatedSeed);
        this.updateData(updatedSeed);
      });

    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
  }

  deleteSeed(seedId: String): void {
    this.seedService.deleteSeed(seedId);
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Slettet',
      });
    this.goBack()
  }

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

  get label(): FormArray {
    return this.seedForm.get('label') as FormArray;
  };


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
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Tilbakestilt',
      });
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
