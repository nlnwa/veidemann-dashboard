import {Component, Input, OnChanges, ViewEncapsulation} from "@angular/core";
import {Crawljob} from "../crawljob";
import {CrawljobService} from "../crawljob.service";
import {CrawlconfigService} from "../../crawlconfig/crawlconfig.service";
import {Schedule} from "../../schedule/schedule";
import {Crawlconfig} from "../../crawlconfig/crawlconfig";
import {FormBuilder, FormGroup, FormArray, Validators} from "@angular/forms";
import {MdlSnackbarService} from "angular2-mdl";
import {Label} from "../../../commons/models/label";
import {CustomValidators} from "../../../commons/components/validators";

@Component({
  selector: 'crawljob-details',
  templateUrl: './crawljob-details.component.html',
  styleUrls: ['./crawljob-details.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class CrawljobDetailsComponent implements OnChanges {

  crawljobForm: FormGroup;

  @Input()
  crawljob: Crawljob;
  schedule: Schedule;
  crawlconfig: Crawlconfig;
  scheduleList: any = [];
  crawlconfigList: any = [];

  selectedScheduleItems = [];
  dropdownScheduleSettings = {};
  dropdownCrawlconfigSettings = {};
  selectedCrawlconfigItems = [];

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private crawljobService: CrawljobService,
              private crawlconfigService: CrawlconfigService,
              private fb: FormBuilder,
              private mdlSnackbarService: MdlSnackbarService,) {
    this.filldropdown();
    this.createForm();
  }

  createForm() {
    this.crawljobForm = this.fb.group({
      id: {value: '', disabled: true},
      schedule_id: ['', CustomValidators.nonEmpty],
      crawl_config_id: ['', CustomValidators.nonEmpty],
      limits: this.fb.group({
        depth: ['', [Validators.required, CustomValidators.min(0)]],
        max_duration_s: ['', [Validators.required, CustomValidators.min(0)]],
        max_bytes: ['', [Validators.required, CustomValidators.min(0)]],
      }),
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: '',
        created: this.fb.group({seconds: {value: '', disabled: true,}}),
        created_by: {value: '', disabled: true},
        last_modified: this.fb.group({seconds: {value: '', disabled: true}}),
        last_modified_by: {value: '', disabled: true},
      }),
    });

  }

  updateData(crawljob: Crawljob) {
    console.log(this.crawljobForm.controls);

    this.crawljobForm.controls['id'].setValue(crawljob.id);
    this.crawljobForm.controls['limits'].setValue({
      depth: crawljob.limits.depth,
      max_duration_s: crawljob.limits.max_duration_s,
      max_bytes: crawljob.limits.max_bytes,
    });
    this.crawljobForm.controls['meta'].patchValue({
      name: crawljob.meta.name as string,
      description: crawljob.meta.description as string,
    });
    this.setLabel(crawljob.meta.label);
    this.setDropdown();
  };

  ngOnChanges() {
    this.updateData(this.crawljob);
  }

  updateCrawljob(crawljobForm): void {
    this.crawljob = this.prepareSaveCrawljob();
    this.crawljobService.updateCrawljob(this.crawljob)
      .then((updatedCrawljob) => {
        this.updateHandler(updatedCrawljob);
      });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
  };

  deleteCrawljob(crawljobId: String): void {
    this.crawljobService.deleteCrawljob(crawljobId).then((deletedCrawljobId: String) => {
      this.deleteHandler(deletedCrawljobId);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Slettet'
      });
  }

  createCrawljob() {
    this.crawljob = this.prepareSaveCrawljob();
    this.crawljobService.createCrawljob(this.crawljob).then((newCrawljob: Crawljob) => {
      this.createHandler(newCrawljob);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret'
      });
  }

  prepareSaveCrawljob(): Crawljob {
    const formModel = this.crawljobForm.value;

    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

    const saveCrawljob: Crawljob = {
      id: this.crawljob.id,
      schedule_id: formModel.schedule_id[0].id as string,
      crawl_config_id: formModel.crawl_config_id[0].id as string,
      limits: {
        depth: formModel.limits.depth as number,
        max_duration_s: formModel.limits.max_duration_s as string,
        max_bytes: formModel.limits.max_bytes as string,
      },
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        label: labelsDeepCopy
      }
    };
    return saveCrawljob;
  }

  setDropdown() {
    this.selectedScheduleItems = [];
    this.selectedCrawlconfigItems = [];

    if (this.crawljob.schedule_id !== "") {
      this.crawljobService.getSchedule(this.crawljob.schedule_id).map(schedule => schedule).forEach((value) => {
        value.forEach((key) => {
          this.selectedScheduleItems.push({id: key.id, itemName: key.meta.name})
        })
      });
    }

    if (this.crawljob.crawl_config_id !== "") {
      this.crawlconfigService.getCrawlconfig(this.crawljob.crawl_config_id).map(crawlconfig => crawlconfig).forEach((value) => {
        value.forEach((key) => {
          this.selectedCrawlconfigItems.push({id: key.id, itemName: key.meta.name})
        })
      });
    }
  }

  filldropdown() {
    this.crawljobService.getAllSchedules().map(schedules => schedules.value).forEach((value) => {
      value.forEach((key) => {
        this.scheduleList.push({id: key.id, itemName: key.meta.name})
      })
    });

    this.crawlconfigService.getAllCrawlconfigs().map(crawlconfigs => crawlconfigs.value).forEach((value) => {
      value.forEach((key) => {
        this.crawlconfigList.push({id: key.id, itemName: key.meta.name})
      })
    });

    this.selectedCrawlconfigItems = [];
    this.selectedScheduleItems = [];

    this.dropdownScheduleSettings = {
      singleSelection: true,
      text: "Velg Schedule",
      enableSearchFilter: true
    };


    this.dropdownCrawlconfigSettings = {
      singleSelection: true,
      text: "Velg crawlconfig",
      enableSearchFilter: true
    };
  }

  setLabel(label) {
    const labelFGs = label.map(label => (this.fb.group(label)));
    const labelFormArray = this.fb.array(labelFGs);
    this.crawljobForm.setControl('label', labelFormArray);
  }

  addLabel() {
    const control = <FormArray>this.crawljobForm.controls['label'];
    control.push(this.initLabel());
  }

  removeLabel(i: number) {
    const control = <FormArray>this.crawljobForm.controls['label'];
    control.removeAt(i);
  }

  get label(): FormArray {
    return this.crawljobForm.get('label') as FormArray;
  };

  initLabel() {
    return this.fb.group({
      key: ['', [Validators.required, Validators.minLength(2)]],
      value: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
}
