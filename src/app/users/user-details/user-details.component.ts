import {Component, Input} from "@angular/core";
import {User, Role} from "../user";
import {UserService} from "../users.service";
import {FormArray, FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent {
  @Input() user: User;
  userForm: FormGroup;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private fb: FormBuilder,
              private userService: UserService) {
    this.createForm();
    // this.logNameChange();
  }

  createForm() {
    this.userForm = this.fb.group({
      name: '',
      id: '',
      roles: this.fb.array([]),
    });
  }

  ngOnChanges() {
    this.userForm.reset({
      name: this.user.name,
      id: this.user.id

    });
    this.setRoles(this.user.roles);
  }

  get roles(): FormArray {
    return this.userForm.get('roles') as FormArray;
  };

  setRoles(roles: Role[]) {
    const roleFGs = roles.map(role => this.fb.group(role));
    const roleFormArray = this.fb.array(roleFGs);
    this.userForm.setControl('roles', roleFormArray);
  }

  addRole() {
    this.roles.push(this.fb.group(new Role()));
  }

  removeRole(i: number) {
    const control = <FormArray>this.userForm.controls['roles'];
    control.removeAt(i);
  }

  createUser() {
    console.log(this.createHandler);
    this.userService.createUser(this.userForm.value).then((newUser: User) => {
      this.createHandler(newUser);
    });
  }

  updateUser(user: User): void {
    this.userService.updateUser(this.userForm.value).then((updatedUser: User) => {
      this.updateHandler(updatedUser);
    });
  }

  deleteUser(userId: String): void {
    console.log(userId);
    this.userService.deleteUser(userId).then((deletedUserId: String) => {
      this.deleteHandler(deletedUserId);
    });
  }


}

