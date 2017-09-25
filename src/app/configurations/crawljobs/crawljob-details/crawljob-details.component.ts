import {Component, Input, OnChanges, ViewEncapsulation} from '@angular/core';
import {CrawlConfig, CrawlconfigService} from '../../crawlconfig/';
import {Schedule, ScheduleService} from '../../schedule/';
import {CustomValidators, Label} from '../../../commons/';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdSnackBar} from '@angular/material';
import {CrawlJob} from '../crawljob.model';
import {CrawlJobService} from '../crawljob.service';

@Component({
  selector: 'app-crawljob-details',
  templateUrl: './crawljob-details.component.html',
  styleUrls: ['./crawljob-details.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class CrawljobDetailsComponent implements OnChanges {

  crawljobForm: FormGroup;

  @Input()
  crawlJob: CrawlJob;
  schedule: Schedule;
  crawlconfig: CrawlConfig;
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

  constructor(private crawlJobService: CrawlJobService,
              private crawlconfigService: CrawlconfigService,
              private scheduleService: ScheduleService,
              private fb: FormBuilder,
              private mdSnackBar: MdSnackBar) {
    this.fillDropdown();
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
        created: this.fb.group({seconds: {value: '', disabled: true}}),
        created_by: {value: '', disabled: true},
        last_modified: this.fb.group({seconds: {value: '', disabled: true}}),
        last_modified_by: {value: '', disabled: true},
      }),
    });

  }

  updateData(crawljob: CrawlJob) {
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
    this.updateData(this.crawlJob);
  }

  updateCrawljob(crawljobForm): void {
    this.crawlJob = this.prepareSaveCrawljob();
    this.crawlJobService.updateCrawlJob(this.crawlJob)
      .map((updatedCrawljob) => {
        this.updateHandler(updatedCrawljob);
      });
    this.mdSnackBar.open('Lagret');
  };

  deleteCrawljob(crawljobId): void {
    this.crawlJobService.deleteCrawlJob(crawljobId)
      .map((deletedCrawljob) => {
        this.deleteHandler(deletedCrawljob);
        if (deletedCrawljob === 'not_allowed') {
          this.mdSnackBar.open('Feil: Ikke slettet');
        } else {
          this.mdSnackBar.open('Slettet');
        }
      });
  }

  createCrawljob() {
    this.crawlJob = this.prepareSaveCrawljob();
    this.crawlJobService.createCrawlJob(this.crawlJob)
      .map((newCrawljob: CrawlJob) => {
        this.createHandler(newCrawljob);
      });
    this.mdSnackBar.open('Lagret');
  }

  prepareSaveCrawljob(): CrawlJob {
    const formModel = this.crawljobForm.value;

    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

    return {
      id: this.crawlJob.id,
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
  }

  setDropdown() {
    if (this.crawlJob.schedule_id !== '') {
      this.scheduleService.getSchedule(this.crawlJob.schedule_id)
        .subscribe((schedule) => {
          this.selectedScheduleItems.push({
            id: schedule.id,
            itemName: schedule.meta.name,
            description: schedule.meta.description
          });

          this.crawljobForm.controls['schedule_id'].setValue(this.selectedScheduleItems);
        });
    }

    if (this.crawlJob.crawl_config_id !== '') {
      this.crawlconfigService.getCrawlConfig(this.crawlJob.crawl_config_id)
        .subscribe(crawlConfig => {
          this.selectedCrawlconfigItems.push({
            id: crawlConfig.id,
            itemName: crawlConfig.meta.name,
            description: crawlConfig.meta.description
          });
          this.crawljobForm.controls['crawl_config_id'].setValue(this.selectedCrawlconfigItems);
        });
    }
  }

  fillDropdown() {
    this.scheduleService.getAllSchedules()
      .map(reply => reply.value)
      .subscribe(schedules => {
        schedules.forEach((schedule) => {
          this.scheduleList.push({
            id: schedule.id,
            itemName: schedule.meta.name,
            description: schedule.meta.description
          })
        });
      });

    this.crawlconfigService.getAllCrawlConfigs()
      .map(reply => reply.value)
      .subscribe(crawlConfigs => {
        crawlConfigs.forEach((crawlConfig) => {
          this.crawlconfigList.push(
            {
              id: crawlConfig.id,
              itemName: crawlConfig.meta.name,
              description: crawlConfig.meta.description
            });
        });
      });

    this.dropdownScheduleSettings = {
      singleSelection: true,
      text: 'Velg Schedule',
      enableSearchFilter: true
    };


    this.dropdownCrawlconfigSettings = {
      singleSelection: true,
      text: 'Velg crawlConfig',
      enableSearchFilter: true
    };
  }

  setLabel(label) {
    const labelFGs = label.map(lbl => (this.fb.group(lbl)));
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
