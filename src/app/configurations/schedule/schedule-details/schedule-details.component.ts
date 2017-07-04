import {Component, Input} from "@angular/core";
import {Schedule} from "../schedule";
import {CrawljobService} from "../../crawljobs/crawljob.service";
import {FormGroup, FormArray, FormBuilder, Validators, AbstractControl, ValidatorFn} from "@angular/forms";
import {MdlSnackbarService} from "angular2-mdl";
import {Label} from "../../../commons/models/label";
import {ConvertTimestamp} from "../../../commons/components/convertTimestamp";
import {CustomValidators} from "../../../commons/components/validators";

@Component({
  selector: 'schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.css']
})
export class ScheduleDetailsComponent {
  @Input()
  schedule: Schedule;
  scheduleForm: FormGroup;


  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private crawljobService: CrawljobService,
              private mdlSnackbarService: MdlSnackbarService,
              private fb: FormBuilder,
              private convertTimestamp: ConvertTimestamp) {
    this.createForm();
  }

  createForm() {
    this.scheduleForm = this.fb.group({
      id: {value: '', disabled: true},
      cron_expression: this.fb.group({
        minute: ['', [Validators.required, Validators.minLength(1)]],
        hour: ['', [Validators.required, Validators.minLength(1)]],
        dom: ['', [Validators.required, Validators.minLength(1)]],
        month: ['', [Validators.required, Validators.minLength(1)]],
        dow: ['', [Validators.required, Validators.minLength(1)]],
      }),
      valid_from: this.fb.group({
        year: ['', [Validators.required, CustomValidators.min(1970), CustomValidators.max(1970)]],
        month: ['', [Validators.required, CustomValidators.min(1), CustomValidators.max(12)]],
        day: ['', [Validators.required, CustomValidators.min(1), CustomValidators.max(31)]],
      }),
      valid_to: this.fb.group({
        year: ['', [Validators.required, CustomValidators.min(1970), CustomValidators.max(2999)]],
        month: ['', [Validators.required, CustomValidators.min(1), CustomValidators.max(12)]],
        day: ['', [Validators.required, CustomValidators.min(1), CustomValidators.max(31)]],
      }),
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: ['', [Validators.required, Validators.minLength(2)]],
//        label: this.fb.array([]),
      }),
    });
  }

  updateData(schedule: Schedule) {
    const cron_splitted = schedule.cron_expression.split(' ');
    const valid_from_splitted = this.convertTimestamp.convertTimestamp_s_to_yyyymmddhhmm(schedule.valid_from.seconds).split('-');
    const valid_to_splitted = this.convertTimestamp.convertTimestamp_s_to_yyyymmddhhmm(schedule.valid_to.seconds).split('-');
    this.scheduleForm.controls['id'].setValue(schedule.id);
    this.scheduleForm.controls['cron_expression'].setValue({
      minute: cron_splitted[0],
      hour: cron_splitted[1],
      dom: cron_splitted[2],
      month: cron_splitted[3],
      dow: cron_splitted[4],
    });
    this.scheduleForm.controls['valid_from'].setValue({
      year: valid_from_splitted[0],
      month: valid_from_splitted[1],
      day: valid_from_splitted[2],
    });
    this.scheduleForm.controls['valid_to'].setValue({
      year: valid_to_splitted[0],
      month: valid_to_splitted[1],
      day: valid_to_splitted[2],
    });
    this.scheduleForm.controls['meta'].patchValue({
      name: schedule.meta.name as string,
      description: schedule.meta.description as string,
    });
    this.setLabel(schedule.meta.label);
  };

  ngOnChanges() {
    this.updateData(this.schedule);
  }

  createSchedule() {
    this.schedule = this.prepareSaveSchedule();
    this.crawljobService.createSchedule(this.schedule).then((newSchedule: Schedule) => {
      this.createHandler(newSchedule);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
  }

  updateSchedule(schedule: Schedule): void {
    this.schedule = this.prepareSaveSchedule();
    this.crawljobService.updateSchedule(this.schedule).then((updatedSchedule: Schedule) => {
      this.updateHandler(updatedSchedule);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
  }

  deleteSchedule(scheduleId: String): void {
    this.crawljobService.deleteSchedule(scheduleId).then((deletedScheduleId: String) => {
      this.deleteHandler(deletedScheduleId);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Slettet',
      });
  }

  setLabel(label) {
    const labelFGs = label.map(label => (this.fb.group(label)));
    const labelFormArray = this.fb.array(labelFGs);
    this.scheduleForm.setControl('label', labelFormArray);
  }

  addLabel() {
    const control = <FormArray>this.scheduleForm.controls['label'];
    control.push(this.initLabel());
  }

  removeLabel(i: number) {
    const control = <FormArray>this.scheduleForm.controls['label'];
    control.removeAt(i);
  }

  get label(): FormArray {
    return this.scheduleForm.get('label') as FormArray;
  };

  initLabel() {
    return this.fb.group({
      key: ['', [Validators.required, Validators.minLength(2)]],
      value: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  prepareSaveSchedule(): Schedule {
    const formModel = this.scheduleForm.value;
    // deep copy of form model lairs
    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );
    const valid_from = formModel.valid_from.year.toString()+
      '-'+formModel.valid_from.month.toString()+
      '-'+formModel.valid_from.day.toString();

    const valid_from_unix = this.convertTimestamp.convertTimestamp_yyyymmddhhmm_to_unix(valid_from);

    const valid_to = formModel.valid_to.year+ '-'
      + formModel.valid_to.month+ '-'
      +formModel.valid_to.day;

    const valid_to_unix = this.convertTimestamp.convertTimestamp_yyyymmddhhmm_to_unix(valid_to);

    const cron_expression = formModel.cron_expression.minute + ' '
      + formModel.cron_expression.hour + ' '
      + formModel.cron_expression.dom + ' '
      + formModel.cron_expression.month + ' '
      + formModel.cron_expression.dow;

    //console.log(this.convertTimestamp.convertTimestamp_yyyymmddhhmm_to_unix(valid_from+' 00:00'));
    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveSchedule: Schedule = {
      id: this.schedule.id,
      cron_expression: cron_expression,
      valid_from:{seconds: (valid_from_unix/ 1000)
      },
      valid_to:{seconds: (valid_to_unix / 1000)},
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        // created: '',
        // created_by: '',
        // last_modified: null,
        last_modified_by: '',
        label: labelsDeepCopy
      }
    };
    return saveSchedule;
  }



}
export function maxValue(max: Number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const input = control.value,
      isValid = input > max;
    if(isValid)
      return { 'maxValue': {max} };
    else
      return null;
  };
}
