import {Component, Input} from "@angular/core";
import {Politenessconfig} from "../politenessconfig";
import {MdlSnackbarService} from "angular2-mdl";
import {FormGroup, FormArray, FormBuilder} from "@angular/forms";
import {PolitenessconfigService} from "../politenessconfig.service";
import {Label} from "../../../commons/models/label";


@Component({
  selector: 'politenessconfig-details',
  templateUrl: './politenessconfig-details.component.html',
  styleUrls: ['./politenessconfig-details.component.css']
})

export class PolitenessconfigDetailsComponent {
  @Input()
  politenessconfig: Politenessconfig;
  politenessconfigForm: FormGroup;
  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;


  constructor(private politenessconfigService: PolitenessconfigService,
              private mdlSnackbarService: MdlSnackbarService,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.politenessconfigForm = this.fb.group({
      id: '',
      robots_policy:'',
      minimum_robots_validity_duration_s:'',
      custom_robots: '',
      min_time_between_page_load_ms:'',
      meta: this.fb.group({
        name: '',
        description: '',
//        label: this.fb.array([]),
      }),
    });
  }

  updateData(politenessconfig: Politenessconfig) {
    this.politenessconfigForm.controls['id'].setValue(politenessconfig.id);
    this.politenessconfigForm.controls['robots_policy'].setValue(politenessconfig.robots_policy);
    this.politenessconfigForm.controls['minimum_robots_validity_duration_s'].setValue(politenessconfig.minimum_robots_validity_duration_s);
    this.politenessconfigForm.controls['custom_robots'].setValue(politenessconfig.custom_robots);
    this.politenessconfigForm.controls['min_time_between_page_load_ms'].setValue(politenessconfig.min_time_between_page_load_ms);
    this.politenessconfigForm.controls['meta'].patchValue({
        name: politenessconfig.meta.name as string,
        description: politenessconfig.meta.description as string,
    });
      this.setLabel(politenessconfig.meta.label);
  };

  ngOnChanges() {
    this.updateData(this.politenessconfig);
  }

  createPolitenessconfig() {
    this.politenessconfig = this.prepareSavePolitenessconfig();
    this.politenessconfigService.createPolitenessconfig(this.politenessconfig).then((newPolitenessconfig: Politenessconfig) => {
      this.createHandler(newPolitenessconfig);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
  }


  updatePolitenessconfig(politenessconfig: Politenessconfig): void {
    this.politenessconfig = this.prepareSavePolitenessconfig();
    this.politenessconfigService.updatePolitenessConfig(this.politenessconfig).then((updatedPolitenessconfig: Politenessconfig) => {
      this.updateHandler(updatedPolitenessconfig);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret'
      });
  }

  deletePolitenessconfig(politenessconfigId: String): void {
    this.politenessconfigService.deletePolitenessConfig(politenessconfigId).then((deletedPolitenessconfigId: String) => {
      this.deleteHandler(deletedPolitenessconfigId);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Slettet'
      });
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
  };

  initLabel() {
    return this.fb.group({
      key: '',
      value: '',
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
      robots_policy: formModel.robots_policy,
      minimum_robots_validity_duration_s: formModel.minimum_robots_validity_duration_s,
      custom_robots: formModel.custom_robots,
      min_time_between_page_load_ms:formModel.min_time_between_page_load_ms,
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
}
