import {Component, Input, OnChanges, ViewEncapsulation} from '@angular/core';
import {Crawlconfig, CrawlconfigService} from '../../crawlconfig/';
import {Schedule, ScheduleService} from '../../schedule/';
import {CustomValidators, Label} from '../../../commons/';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {MdSnackBar} from '@angular/material';
import {Crawljob} from '../crawljob';
import {CrawljobService} from '../crawljob.service';

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
              private scheduleService: ScheduleService,
              private fb: FormBuilder,
              private mdSnackBar: MdSnackBar,) {
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
    this.selectedScheduleItems = [];
    this.selectedCrawlconfigItems = [];
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
    this.mdSnackBar.open('Lagret');
  };

  deleteCrawljob(crawljobId): void {
    this.crawljobService.deleteCrawljob(crawljobId).then((deletedCrawljob) => {
      this.deleteHandler(deletedCrawljob);
      if (deletedCrawljob === 'not_allowed') {
        this.mdSnackBar.open('Feil: Ikke slettet');
      } else {
        this.mdSnackBar.open('Slettet');
      }
    });
  }

  createCrawljob() {
    this.crawljob = this.prepareSaveCrawljob();
    this.crawljobService.createCrawljob(this.crawljob).then((newCrawljob: Crawljob) => {
      this.createHandler(newCrawljob);
    });
    this.mdSnackBar.open('Lagret');
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
    if (this.crawljob.schedule_id !== '') {
      this.scheduleService.getSchedule(this.crawljob.schedule_id).map(schedule => schedule).forEach((value) => {
        value.forEach((key) => {
          this.selectedScheduleItems.push({id: key.id, itemName: key.meta.name, description: key.meta.description})
        });
        this.crawljobForm.controls['schedule_id'].setValue(this.selectedScheduleItems);
      });
    }

    if (this.crawljob.crawl_config_id !== '') {
      this.crawlconfigService.getCrawlconfig(this.crawljob.crawl_config_id).map(crawlconfig => crawlconfig).forEach((value) => {
        value.forEach((key) => {
          this.selectedCrawlconfigItems.push({id: key.id, itemName: key.meta.name, description: key.meta.description});

        });
        this.crawljobForm.controls['crawl_config_id'].setValue(this.selectedCrawlconfigItems);
      });
    }
  }

  filldropdown() {
    this.scheduleService.getAllSchedules().map(schedules => schedules.value).forEach((value) => {
      value.forEach((key) => {
        this.scheduleList.push({id: key.id, itemName: key.meta.name, description: key.meta.description})
      })
    });

    this.crawlconfigService.getAllCrawlconfigs().map(crawlconfigs => crawlconfigs.value).forEach((value) => {
      value.forEach((key) => {
        this.crawlconfigList.push({id: key.id, itemName: key.meta.name, description: key.meta.description})
      })
    });


    this.dropdownScheduleSettings = {
      singleSelection: true,
      text: 'Velg Schedule',
      enableSearchFilter: true
    };


    this.dropdownCrawlconfigSettings = {
      singleSelection: true,
      text: 'Velg crawlconfig',
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

  revert() {
    this.ngOnChanges();
    this.mdSnackBar.open('Tilbakestilt');
  }
}
