import {Component, Input, OnChanges} from '@angular/core';
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
  providers: [SnackBarService]
})

export class PolitenessconfigDetailsComponent implements OnChanges {
  @Input()
  politenessConfig: PolitenessConfig;

  _form: FormGroup;

  get form(): FormGroup {
    return this._form;
  }

  set form(form: FormGroup) {
    this._form = form;
  }

  robotsPolicyList: any = [];
  robetsPolicyDropdownSettings = {};
  selectedRobotsPolicyItems = [];

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;


  constructor(private politenessConfigService: PolitenessConfigService,
              private snackBarService: SnackBarService,
              private fb: FormBuilder) {
    this.filldropdown();
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      id: '',
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

  updateData(politenessconfig: PolitenessConfig) {
    this.form.controls['id'].setValue(politenessconfig.id);
    this.form.controls['minimum_robots_validity_duration_s'].setValue(politenessconfig.minimum_robots_validity_duration_s);
    this.form.controls['custom_robots'].setValue(politenessconfig.custom_robots);
    this.form.controls['min_time_between_page_load_ms'].setValue(politenessconfig.min_time_between_page_load_ms);
    this.form.controls['max_time_between_page_load_ms'].setValue(politenessconfig.max_time_between_page_load_ms);
    this.form.controls['delay_factor'].setValue(politenessconfig.delay_factor);
    this.form.controls['max_retries'].setValue(politenessconfig.max_retries);
    this.form.controls['retry_delay_seconds'].setValue(politenessconfig.retry_delay_seconds);
    this.form.controls['meta'].patchValue({
      name: politenessconfig.meta.name as string,
      description: politenessconfig.meta.description as string,
      label: [...politenessconfig.meta.label],
    });
    this.form.get('crawl_host_group_selector').setValue([...politenessconfig.crawl_host_group_selector.label]);
    this.setSelectedDropdown();
    this.selectedRobotsPolicyItems = [];
    this.form.markAsPristine();
  };

  ngOnChanges() {
    if (!this.politenessConfig.crawl_host_group_selector) {
      this.politenessConfig.crawl_host_group_selector = new Selector();
    }
    this.updateData(this.politenessConfig);
  }

  createPolitenessconfig() {
    this.politenessConfig = this.prepareSavePolitenessConfig();
    this.politenessConfigService.create(this.politenessConfig)
      .subscribe((newPolitenessConfig: PolitenessConfig) => {
        this.createHandler(newPolitenessConfig);
      });
    this.snackBarService.openSnackBar('Lagret');
  }


  updatePolitenessconfig(politenessConfig: PolitenessConfig): void {
    this.politenessConfig = this.prepareSavePolitenessConfig();
    this.politenessConfigService.update(this.politenessConfig)
      .subscribe((updatedPolitenessConfig: PolitenessConfig) => {
        this.updateHandler(updatedPolitenessConfig);
      });
    this.snackBarService.openSnackBar('Lagret');
  }

  deletePolitenessconfig(politenessConfigId) {
    this.politenessConfigService.delete(politenessConfigId)
      .subscribe((response) => {
        this.deleteHandler(politenessConfigId);
        if (response instanceof Object) {
          this.snackBarService.openSnackBar('Feil: Ikke slettet');
        } else {
          this.snackBarService.openSnackBar('Slettet');
        }
      });
  }

  filldropdown() {
    this.politenessConfigService.getRobotsConfig()
      .subscribe(robotsPolicies => {
        robotsPolicies.forEach((robotsPolicy) => {
          this.robotsPolicyList.push(robotsPolicy);
        });
      });
  }

  setSelectedDropdown() {
    if (!isUndefined(this.politenessConfig.id)) {
      this.politenessConfigService.get(this.politenessConfig.id)
        .subscribe(politenessConfig => {
          for (const robotsPolicy of this.robotsPolicyList) {
            if (robotsPolicy.itemName === politenessConfig.robots_policy) {
              this.selectedRobotsPolicyItems.push({id: robotsPolicy.id, itemName: politenessConfig.robots_policy})
            }
          }
          this.form.controls['robots_policy'].setValue(this.selectedRobotsPolicyItems);
        });
    }
    this.robetsPolicyDropdownSettings = {
      singleSelection: true,
      text: 'Velg Robots policy',
    };

  }

  prepareSavePolitenessConfig(): PolitenessConfig {
    const formModel = this.form.value;

    // deep copy of form model lairs
    const labelsDeepCopy = formModel.meta.label.map(label => ({...label}));
    const crawlHostGroup_selectorDeepCopy: Selector = {label: formModel.crawl_host_group_selector.map(label => ({...label}))};

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
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

  revert() {
    this.ngOnChanges();
    this.snackBarService.openSnackBar('Tilbakestilt');
  }
}
