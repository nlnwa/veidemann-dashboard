import {Component, Input} from "@angular/core";
import {MdSnackBar} from "@angular/material";
import {FormGroup, FormArray, FormBuilder, Validators} from "@angular/forms";
import {CustomValidators, Label} from "../../../commons/";
import {isUndefined} from "util";
import {Politenessconfig} from '../politenessconfig';
import {PolitenessconfigService} from '../politenessconfig.service';


@Component({
  selector: 'politenessconfig-details',
  templateUrl: './politenessconfig-details.component.html',
  styleUrls: ['./politenessconfig-details.component.css']
})

export class PolitenessconfigDetailsComponent {
  @Input()
  politenessconfig: Politenessconfig;
  politenessconfigForm: FormGroup;

  robotspolicyList: any = [];
  robotspolicy_dropdownSettings = {};
  selectedRobotspolicyItems = [];

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;


  constructor(private politenessconfigService: PolitenessconfigService,
              private mdSnackBar: MdSnackBar,
              private fb: FormBuilder) {
    this.filldropdown();
    this.createForm();
  }

  createForm() {
    this.politenessconfigForm = this.fb.group({
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

  updateData(politenessconfig: Politenessconfig) {
    this.politenessconfigForm.controls['id'].setValue(politenessconfig.id);
    this.politenessconfigForm.controls['minimum_robots_validity_duration_s'].setValue(politenessconfig.minimum_robots_validity_duration_s);
    this.politenessconfigForm.controls['custom_robots'].setValue(politenessconfig.custom_robots);
    this.politenessconfigForm.controls['min_time_between_page_load_ms'].setValue(politenessconfig.min_time_between_page_load_ms);
    this.politenessconfigForm.controls['meta'].patchValue({
      name: politenessconfig.meta.name as string,
      description: politenessconfig.meta.description as string,
    });
    this.setLabel(politenessconfig.meta.label);
    this.setSelectedDropdown();
    this.selectedRobotspolicyItems = [];
  };

  ngOnChanges() {
    this.updateData(this.politenessconfig);

  }

  createPolitenessconfig() {
    this.politenessconfig = this.prepareSavePolitenessconfig();
    this.politenessconfigService.createPolitenessconfig(this.politenessconfig).then((newPolitenessconfig: Politenessconfig) => {
      this.createHandler(newPolitenessconfig);
    });
    this.mdSnackBar.open('Lagret');
  }


  updatePolitenessconfig(politenessconfig: Politenessconfig): void {
    this.politenessconfig = this.prepareSavePolitenessconfig();
    this.politenessconfigService.updatePolitenessConfig(this.politenessconfig).then((updatedPolitenessconfig: Politenessconfig) => {
      this.updateHandler(updatedPolitenessconfig);
    });
    this.mdSnackBar.open('Lagret');
  }

  deletePolitenessconfig(politenessconfigId): void {
    this.politenessconfigService.deletePolitenessConfig(politenessconfigId).then((deletedPolitenessconfig) => {
      this.deleteHandler(deletedPolitenessconfig);
      if (deletedPolitenessconfig === "not_allowed") {
        this.mdSnackBar.open('Feil: Ikke slettet');
      } else {
        this.mdSnackBar.open('Slettet');
      }
    });
  }

  filldropdown() {
    this.politenessconfigService.getRobotsconfig().map(robotspolicy => robotspolicy).forEach((value) => {
      for (let i of value.menuitem) {
        this.robotspolicyList.push({id: i.id, itemName: i.itemName});
      }
    });
  }

  setSelectedDropdown() {
    if (!isUndefined(this.politenessconfig.id)) {
      this.politenessconfigService.getPolitenessconfig(this.politenessconfig.id).map(politenessconfig => politenessconfig).forEach((value) => {
        value.forEach((key) => {
          for (let i of this.robotspolicyList) {
            if (i.itemName == key.robots_policy) {
              this.selectedRobotspolicyItems.push({id: i.id, itemName: key.robots_policy})
            }
          }
        });
        this.politenessconfigForm.controls['robots_policy'].setValue(this.selectedRobotspolicyItems);
      });
    }
    this.robotspolicy_dropdownSettings = {
      singleSelection: true,
      text: "Velg Robots policy",
    };

  }

  setLabel(label) {
    const labelFGs = label.map(label => (this.fb.group(label)));
    const labelFormArray = this.fb.array(labelFGs);
    this.politenessconfigForm.setControl('label', labelFormArray);
  }

  addLabel() {
    const control = <FormArray>this.politenessconfigForm.controls['label'];
    control.push(this.initLabel());
  }

  removeLabel(i: number) {
    const control = <FormArray>this.politenessconfigForm.controls['label'];
    control.removeAt(i);
  }

  get label(): FormArray {
    return this.politenessconfigForm.get('label') as FormArray;
  }

  initLabel() {
    return this.fb.group({
      key: ['', [Validators.required, Validators.minLength(2)]],
      value: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  prepareSavePolitenessconfig(): Politenessconfig {
    const formModel = this.politenessconfigForm.value;
    // deep copy of form model lairs
    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const savePolitenessconfig: Politenessconfig = {
      id: this.politenessconfig.id,
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
    return savePolitenessconfig;
  }

  revert() {
    this.ngOnChanges();
    this.mdSnackBar.open('Tilbakestilt');
  }
}
