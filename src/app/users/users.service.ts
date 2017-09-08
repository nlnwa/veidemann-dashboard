import {Injectable} from "@angular/core";
import {User} from "./user";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {ErrorHandlerService} from '../commons/';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {

  private usersUrl = `${environment.API_URL}/users`;

  constructor(private http: Http,
              private errorHandlerService: ErrorHandlerService) {
  }

  getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.errorHandlerService.handleError);
  }

  getAllUsers() {
    return this.http.get(this.usersUrl)
      .map(res => res.json());
  }

  createUser(newUser: User): Promise<User> {
    return this.http.post(this.usersUrl, newUser)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.errorHandlerService.handleError);
  }

  deleteUser(delUserId: String): Promise<String> {
    return this.http.delete(this.usersUrl + '/' + delUserId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.errorHandlerService.handleError);
  }

  updateUser(putUser: User): Promise<User> {
    const putUrl = this.usersUrl + '/' + putUser.id;
    return this.http.put(putUrl, putUser)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.errorHandlerService.handleError);
  }
}
