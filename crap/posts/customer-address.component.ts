import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'address',
  templateUrl: 'customer-address.component.html',
})
export class CustomerAddressComponent {
  @Input('group')
  public adressForm: FormGroup;
}
