import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../commons/';
import {isUndefined} from 'util';
import {PolitenessConfigService} from '../politenessconfig.service';
import {PolitenessConfig, Selector} from '../../../commons/models/config.model';
import {SnackBarService} from '../../../snack-bar-service/snack-bar.service';


@Component({
  selector: 'app-politenessconfig-details',
  templateUrl: './politenessconfig-details.component.html',
  styleUrls: ['./politenessconfig-details.component.css'],
})

export class PolitenessconfigDetailsComponent implements OnChanges {

  @Input()
  politenessConfig: PolitenessConfig;

  @Output()
  created = new EventEmitter<PolitenessConfig>();
  @Output()
  updated = new EventEmitter<PolitenessConfig>();
  @Output()
  deleted = new EventEmitter<PolitenessConfig>();

  form: FormGroup;

  robotsPolicyList: any = [];
  selectedRobotsPolicyItems = [];
  robotsPolicyDropdownSettings = {
    singleSelection: true,
    text: 'Velg Robots policy',
  };


  constructor(private politenessConfigService: PolitenessConfigService,
              private snackBarService: SnackBarService,
              private fb: FormBuilder) {
    this.fillDropdown();
    this.createForm();
  }

  get name() {
    return this.form.get('meta.name');
  }

  get robotsPolicy() {
    return this.form.get('robots_policy');
  }

  get customRobots() {
    return this.form.get('custom_robots');
  }

  get minRobotsValidDurationSec() {
    return this.form.get('minimum_robots_validity_duration_s');
  }

  get minTimeBetweenPageloadMs() {
    return this.form.get('min_time_between_page_load_ms');
  }

  get maxTimeBetweenPageloadMs() {
    return this.form.get('max_time_between_page_load_ms');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.politenessConfig.crawl_host_group_selector) {
      this.politenessConfig.crawl_host_group_selector = new Selector();
    }
    if (changes.politenessConfig.currentValue) {
      this.updateForm();
    }
  }

  onSave() {
    this.politenessConfig = this.prepareSave();
    this.politenessConfigService.create(this.politenessConfig)
      .subscribe(newPolitenessConfig => {
        this.politenessConfig = newPolitenessConfig;
        this.updateForm();
        this.created.emit(newPolitenessConfig);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdate(): void {
    this.politenessConfig = this.prepareSave();
    this.politenessConfigService.update(this.politenessConfig)
      .subscribe(updatedPolitenessConfig => {
        this.politenessConfig = updatedPolitenessConfig;
        this.updateForm();
        this.updated.emit(updatedPolitenessConfig);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onDelete() {
    this.politenessConfigService.delete(this.politenessConfig.id)
      .subscribe((response) => {
        this.deleted.emit(this.politenessConfig);
        this.politenessConfig = response;
        this.form.reset();
        this.snackBarService.openSnackBar('Slettet');
      });
  }

  onRevert() {
    this.updateForm();
    this.snackBarService.openSnackBar('Tilbakestilt');
  }

  private createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      robots_policy: ['', [Validators.required, CustomValidators.nonEmpty]],
      minimum_robots_validity_duration_s: ['', [Validators.required, CustomValidators.min(0)]],
      custom_robots: null,
      min_time_between_page_load_ms: ['', [Validators.required, CustomValidators.min(0)]],
      max_time_between_page_load_ms: ['', [Validators.required, CustomValidators.min(0)]],
      delay_factor: '',
      max_retries: '',
      retry_delay_seconds: '',
      crawl_host_group_selector: [],
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: '',
        label: [],
      }),
    });
  }

  private updateForm() {
    this.form.patchValue({
      id: this.politenessConfig.id,
      minimum_robots_validity_duration_s: this.politenessConfig.minimum_robots_validity_duration_s,
      custom_robots: this.politenessConfig.custom_robots,
      min_time_between_page_load_ms: this.politenessConfig.min_time_between_page_load_ms,
      max_time_between_page_load_ms: this.politenessConfig.max_time_between_page_load_ms,
      delay_factor: this.politenessConfig.delay_factor,
      max_retries: this.politenessConfig.max_retries,
      retry_delay_seconds: this.politenessConfig.retry_delay_seconds,
      crawl_host_group_selector: [...this.politenessConfig.crawl_host_group_selector.label],
      meta: {
        name: this.politenessConfig.meta.name,
        description: this.politenessConfig.meta.description,
        label: [...this.politenessConfig.meta.label],
      },
    });
    this.setSelectedDropdown();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  };

  private prepareSave(): PolitenessConfig {
    const formModel = this.form.value;
    const labelsDeepCopy = formModel.meta.label.map(label => ({...label}));
    const crawlHostGroup_selectorDeepCopy: Selector = {label: formModel.crawl_host_group_selector.map(label => ({...label}))};
    return {
      id: this.politenessConfig.id,
      robots_policy: formModel.robots_policy[0].itemName,
      minimum_robots_validity_duration_s: parseInt(formModel.minimum_robots_validity_duration_s, 10),
      custom_robots: formModel.custom_robots,
      min_time_between_page_load_ms: formModel.min_time_between_page_load_ms,
      max_time_between_page_load_ms: formModel.max_time_between_page_load_ms,
      delay_factor: parseFloat(formModel.delay_factor) || 0,
      max_retries: parseInt(formModel.max_retries, 10) || 0,
      retry_delay_seconds: parseInt(formModel.retry_delay_seconds, 10) || 0,
      crawl_host_group_selector: crawlHostGroup_selectorDeepCopy,
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        // created: '',
        // created_by: '',
        // last_modified: null,
        // last_modified_by: '',
        label: labelsDeepCopy
      }
    };
  }

  private fillDropdown() {
    this.politenessConfigService.getRobotsConfig()
      .subscribe(robotsPolicies => {
        robotsPolicies.forEach((robotsPolicy) => {
          this.robotsPolicyList.push(robotsPolicy);
        });
      });
  }

  private setSelectedDropdown() {
    this.selectedRobotsPolicyItems = [];
    if (!isUndefined(this.politenessConfig.id)) {
      this.politenessConfigService.get(this.politenessConfig.id)
        .subscribe(politenessConfig => {
          for (const robotsPolicy of this.robotsPolicyList) {
            if (robotsPolicy.itemName === politenessConfig.robots_policy) {
              this.selectedRobotsPolicyItems.push({
                id: robotsPolicy.id,
                itemName: politenessConfig.robots_policy})
            }
          }
          this.robotsPolicy.setValue(this.selectedRobotsPolicyItems);
        });
    }
  }


}
