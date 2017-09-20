import {Component, Input, OnChanges} from "@angular/core";
import {Seed} from '../seed';
import {SeedService} from "../seeds.service";
import {FormGroup, FormArray, FormBuilder, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {MdlSnackbarService} from "angular2-mdl";
import {DateTime, Label, CustomValidators} from "../../commons/";
import {CrawljobService, Crawljob} from "../../configurations/crawljobs/";
import {EntityService} from "../../entities/entity.service";

@Component({
  selector: 'seed-details',
  templateUrl: './seed-details.component.html',
  styleUrls: ['./seed-details.component.css'],

})

export class SeedDetailComponent implements OnChanges {
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
  crawljob: Crawljob;

  constructor(private seedService: SeedService,
              private router: Router,
              private fb: FormBuilder,
              private crawljobService: CrawljobService,
              private route: ActivatedRoute,
              private mdlSnackbarService: MdlSnackbarService,
              private convertTimestamp: DateTime,
              private entityService: EntityService) {
    this.createForm();
    this.getParams();
    this.getCrawljobs();
  }

  getParams() {
    this.route.params.subscribe(params => {
      if (params.seed == null) {

      } else {
        this.seedService.getSeed(params.seed).subscribe(seed => {
          this.seed = seed[0];
          this.ngOnChanges();
        })
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
        scope: this.fb.group({surt_prefix: ['', [Validators.required, Validators.minLength(2)]],}),
        meta: this.fb.group({
          name: ['http://', [Validators.required, Validators.pattern(`(http|https)(:\/\/)([w]{3}[.]{1})([a-z0-9-]+[.]{1}[A-z]+)|(http|https)(:\/\/)([^www\.][a-z0-9-]+[.]{1}[A-z]+.+)`)]],
          description: '',
          created: this.fb.group({seconds: {value: '', disabled: true,}}),
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
    this.entityService.getEntity(entity_id).map(entity => entity).forEach((value) => {
      value.forEach((key) => {
        this.seedForm.controls['entity_id'].setValue({entity_name: key.meta.name, entity_ids: this.seed.entity_id});
      });
    })
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
      for (let i of this.seed.job_id) {
        this.crawljobService.getCrawlJob(i).map(crawljob => crawljob).forEach((value) => {
          value.forEach((key) => {
            this.selectedCrawljobItems.push({id: key.id, itemName: key.meta.name, description: key.meta.description})
          });
        });
      }
      // this.seedForm.controls['job_id'].setValue(this.selectedCrawljobItems);

    }
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


  updateSeed(seedForm): void {
    this.seed = this.prepareSaveSeed();
    this.seedService.updateSeed(this.seed)
      .then((updatedSeed) => {
        //this.updateHandler(updatedSeed);
        this.updateData(updatedSeed);
      });

    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
  }

  deleteSeed(): void {
    this.seedService.deleteSeed(this.seed.id).then((deletedSeed) => {
      if (deletedSeed === "not_allowed") {
        this.mdlSnackbarService.showSnackbar(
          {
            message: 'Feil: Ikke slettet',
          });
      } else {
        this.mdlSnackbarService.showSnackbar(
          {
            message: 'Slettet',
          });
      }
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
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Tilbakestilt',
      });
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
