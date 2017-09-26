import {Component, Input, OnChanges} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators, Label} from '../../../commons/';
import {isUndefined} from 'util';
import {PolitenessConfig} from '../politenessconfig.model';
import {PolitenessConfigService} from '../politenessconfig.service';


@Component({
  selector: 'app-politenessconfig-details',
  templateUrl: './politenessconfig-details.component.html',
  styleUrls: ['./politenessconfig-details.component.css']
})

export class PolitenessconfigDetailsComponent implements OnChanges {
  @Input()
  politenessConfig: PolitenessConfig;
  politenessConfigFG: FormGroup;

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
              private mdSnackBar: MdSnackBar,
              private fb: FormBuilder) {
    this.filldropdown();
    this.createForm();
  }

  createForm() {
    this.politenessConfigFG = this.fb.group({
      id: '',
      robots_policy: ['', [Validators.required, CustomValidators.nonEmpty]],
      minimum_robots_validity_duration_s: ['', [Validators.required, CustomValidators.min(0)]],
      custom_robots: null,
      min_time_between_page_load_ms: ['', [Validators.required, CustomValidators.min(0)]],
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: '',
//        label: this.fb.array([]),
      }),
    });
  }

  updateData(politenessconfig: PolitenessConfig) {
    this.politenessConfigFG.controls['id'].setValue(politenessconfig.id);
    this.politenessConfigFG.controls['minimum_robots_validity_duration_s'].setValue(politenessconfig.minimum_robots_validity_duration_s);
    this.politenessConfigFG.controls['custom_robots'].setValue(politenessconfig.custom_robots);
    this.politenessConfigFG.controls['min_time_between_page_load_ms'].setValue(politenessconfig.min_time_between_page_load_ms);
    this.politenessConfigFG.controls['meta'].patchValue({
      name: politenessconfig.meta.name as string,
      description: politenessconfig.meta.description as string,
    });
    this.setLabel(politenessconfig.meta.label);
    this.setSelectedDropdown();
    this.selectedRobotsPolicyItems = [];
  };

  ngOnChanges() {
    this.updateData(this.politenessConfig);

  }

  createPolitenessconfig() {
    this.politenessConfig = this.prepareSavePolitenessConfig();
    this.politenessConfigService.create(this.politenessConfig)
      .subscribe((newPolitenessConfig: PolitenessConfig) => {
        this.createHandler(newPolitenessConfig);
      });
    this.mdSnackBar.open('Lagret');
  }


  updatePolitenessconfig(politenessConfig: PolitenessConfig): void {
    this.politenessConfig = this.prepareSavePolitenessConfig();
    this.politenessConfigService.update(this.politenessConfig)
      .subscribe((updatedPolitenessConfig: PolitenessConfig) => {
        this.updateHandler(updatedPolitenessConfig);
      });
    this.mdSnackBar.open('Lagret');
  }

  deletePolitenessconfig(politenessConfigId) {
    this.politenessConfigService.delete(politenessConfigId)
      .subscribe((deletedPolitenessConfig) => {
        this.deleteHandler(deletedPolitenessConfig);
        if (deletedPolitenessConfig === 'not_allowed') {
          this.mdSnackBar.open('Feil: Ikke slettet');
        } else {
          this.mdSnackBar.open('Slettet');
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
          this.politenessConfigFG.controls['robots_policy'].setValue(this.selectedRobotsPolicyItems);
        });
    }
    this.robetsPolicyDropdownSettings = {
      singleSelection: true,
      text: 'Velg Robots policy',
    };

  }

  setLabel(label) {
    const labelFGs = label.map(lbl => (this.fb.group(lbl)));
    const labelFormArray = this.fb.array(labelFGs);
    this.politenessConfigFG.setControl('label', labelFormArray);
  }

  addLabel() {
    const control = <FormArray>this.politenessConfigFG.controls['label'];
    control.push(this.initLabel());
  }

  removeLabel(i: number) {
    const control = <FormArray>this.politenessConfigFG.controls['label'];
    control.removeAt(i);
  }

  get label(): FormArray {
    return this.politenessConfigFG.get('label') as FormArray;
  }

  initLabel() {
    return this.fb.group({
      key: ['', [Validators.required, Validators.minLength(2)]],
      value: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  prepareSavePolitenessConfig(): PolitenessConfig {
    const formModel = this.politenessConfigFG.value;
    // deep copy of form model lairs
    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    return {
      id: this.politenessConfig.id,
      robots_policy: formModel.robots_policy[0].itemName,
      minimum_robots_validity_duration_s: formModel.minimum_robots_validity_duration_s,
      custom_robots: formModel.custom_robots,
      min_time_between_page_load_ms: formModel.min_time_between_page_load_ms,
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        // created: '',
        created_by: '',
        // last_modified: null,
        last_modified_by: '',
        label: labelsDeepCopy
      }
    };
  }

  revert() {
    this.ngOnChanges();
    this.mdSnackBar.open('Tilbakestilt');
  }
}
