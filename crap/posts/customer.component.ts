import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Customer } from './customer.interface';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'customer.component.html',
})
export class CustomerComponent implements OnInit {
  public myForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      addresses: this._fb.array([])
    });

    // add address
    this.addAddress();

    /* subscribe to addresses value changes */
    // this.myForm.controls['addresses'].valueChanges.subscribe(x => {
    //   console.log(x);
    // })
  }

  initAddress() {
    return this._fb.group({
      street: ['', Validators.required]
    });
  }

  addAddress() {
    const control = <FormArray>this.myForm.controls['addresses'];
    const addrCtrl = this.initAddress();

    control.push(addrCtrl);

    /* subscribe to individual address value changes */
    // addrCtrl.valueChanges.subscribe(x => {
    //   console.log(x);
    // })
  }

  removeAddress(i: number) {
    const control = <FormArray>this.myForm.controls['addresses'];
    control.removeAt(i);
  }

  save(model: Customer) {
    // call API to save
    // ...
    console.log(model);
  }
}
