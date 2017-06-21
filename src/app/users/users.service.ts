import {Injectable} from "@angular/core";
import {User} from "./user";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class UserService {

  private userssUrl = '/api/users';

  constructor(private http: Http) {
  }

  getUsers(): Promise<User[]> {
    return this.http.get(this.userssUrl)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  getAllUsers() {
    return this.http.get(this.userssUrl)
      .map(res => res.json());
  }

  createUser(newUser: User): Promise<User> {
    return this.http.post(this.userssUrl, newUser)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  deleteUser(delUserId: String): Promise<String> {
    return this.http.delete(this.userssUrl + '/' + delUserId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  updateUser(putUser: User): Promise<User> {
    const putUrl = this.userssUrl + '/' + putUser.id;
    return this.http.put(putUrl, putUser)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
