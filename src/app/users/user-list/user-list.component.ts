import {Component, OnInit} from "@angular/core";
import {User} from "../user";
import {UserService} from "../users.service";

@Component({
  selector: 'users',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})

export class UserComponent implements OnInit {

  users: User[];
  selectedUser: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users
    })
  }

  private getIndexOfUser = (userId: String) => {
    return this.users.findIndex((user) => {
      return user.id === userId;
    });
  };

  selectUser(user: User) {
    this.selectedUser = user
  }

  deleteUser = (userId: String) => {
    const idx = this.getIndexOfUser(userId);
    if (idx !== -1) {
      this.users.splice(idx, 1);
      this.selectUser(null);
    }
    return this.users;
  };

  createNewUser() {
    const user: User = {
      name: '',
      id: '',
      roles: [],
    };
    // By default, a newly-created  will have the selected state.
    this.selectUser(user);
  }

  addUser = (user: User) => {
    this.users.push(user);
    this.selectUser(user);
    return this.users;
  };

  updateUser = (user: User) => {
    const idx = this.getIndexOfUser(user.id);
    if (idx !== -1) {
      this.users[idx] = user;
      this.selectUser(user);
    }
    return this.users;
  }
}
