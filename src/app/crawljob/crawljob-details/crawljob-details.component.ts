import {Component, Input, OnChanges, ViewEncapsulation} from "@angular/core";
import {Crawljob} from "../../models/crawljob";
import {CrawljobService} from "../crawljob.service";
import {Schedule} from "../../models/schedule";
import {Crawlconfig} from "../../models/crawlconfig";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MdlSnackbarService} from "angular2-mdl";

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
              private fb: FormBuilder,
              private mdlSnackbarService: MdlSnackbarService,) {
    this.filldropdown();
    this.createForm();
  }

  createForm() {
    this.crawljobForm = this.fb.group({
      id: {value: '', disabled: true},
      schedule_id: '',
      crawl_config_id: '',
      limits: this.fb.group({
        depth: '',
        max_duration_s: '',
        max_bytes: '',
      }),
      meta: this.fb.group({
        name: '',
        description: '',
        created: this.fb.group({seconds: {value: '', disabled: true,}}),
        created_by: {value: '', disabled: true},
        last_modified: this.fb.group({seconds: {value: '', disabled: true}}),
        last_modified_by: {value: '', disabled: true},
      }),
    });
  }

  ngOnChanges() {
    this.createForm();
    this.crawljobForm.reset({
      id: this.crawljob.id,
      limits: this.fb.group({
        depth: this.crawljob.limits.depth,
        max_duration_s: this.crawljob.limits.max_duration_s,
        max_bytes: this.crawljob.limits.max_bytes,
      }),
      meta: this.fb.group({
        name: this.crawljob.meta.name,
        description: this.crawljob.meta.description,
        created: this.crawljob.meta.created,
        created_by: this.crawljob.meta.created_by,
        last_modified: this.crawljob.meta.last_modified,
        last_modified_by: this.crawljob.meta.last_modified_by,
      }),
    });
    this.setDropdown();
  }


  updateCrawljob(crawljobForm): void {
    this.crawljob = this.prepareSaveCrawljob();
    // console.log(this.seed);
    //console.log(seedForm.getRawValue());
    this.crawljobService.updateCrawljob(this.crawljob)
    /*.then((updatedCrawljob) => {
     this.updateHandler(updatedCrawljob);
     this.ngOnChanges();
     });*/
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
  };

  deleteCrawljob(crawljobId: String): void {
    this.crawljobService.deleteCrawljob(crawljobId);
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Slettet',
      });
  }

  createCrawljob() {
    this.crawljob = this.prepareSaveCrawljob();
    this.crawljobService.createCrawljob(this.crawljob);
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
  }

  prepareSaveCrawljob(): Crawljob {
    const formModel = this.crawljobForm.value;
    console.log(formModel);

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
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
      }
    };
    return saveCrawljob;
  }


  onItemSelect(item) {
    console.log('Selected Item:');
    console.log(item);
  }

  OnItemDeSelect(item) {
    console.log('De-Selected Item:');
    console.log(item);
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
      this.crawljobService.getCrawlConfig(this.crawljob.crawl_config_id).map(crawlconfig => crawlconfig).forEach((value) => {
        value.forEach((key) => {
          this.selectedCrawlconfigItems.push({id: key.id, itemName: key.meta.name})
        })
      });
    }
  }

  filldropdown() {
    //  this.setLabel(this.seed.meta.label);
    this.crawljobService.getAllSchedules().map(schedules => schedules.value).forEach((value) => {
      value.forEach((key) => {
        this.scheduleList.push({id: key.id, itemName: key.meta.name})
      })
    });

    this.crawljobService.getAllCrawlconfigs().map(crawlconfigs => crawlconfigs.value).forEach((value) => {
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

}
