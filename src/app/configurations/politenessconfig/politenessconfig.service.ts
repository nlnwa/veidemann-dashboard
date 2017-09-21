import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Politenessconfig} from './';
import {ErrorHandlerService} from '../../commons/';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class PolitenessconfigService {

  private politenessconfigUrl = `${environment.API_URL}/politenessconfig`;
  private robotspolicyUrl = `${environment.API_URL}/robotspolicy`;

  constructor(private http: Http,
              private errorhandlerservice: ErrorHandlerService) {
  }


  getAllPolitenessconfigs() {
    return this.http.get(this.politenessconfigUrl)
      .map(res => res.json());
  }

  getPolitenessconfig(politenessconfig_id) {
    return this.http.get(`${this.politenessconfigUrl}/${politenessconfig_id}`)
      .map(res => res.json().value);
  }

  createPolitenessconfig(newPolitenessconfig: Politenessconfig): Observable<Politenessconfig> {
    return this.http.post(this.politenessconfigUrl, newPolitenessconfig)
      .map(response => response.json() as Politenessconfig)
      .catch(this.errorhandlerservice.handleError);
  }

  deletePolitenessConfig(delPolitenessconfigId: String): Observable<String> {
    return this.http.delete(this.politenessconfigUrl + '/' + delPolitenessconfigId)
      .map(response => response.json() as String)
      .catch(this.errorhandlerservice.handleError);
  }

  updatePolitenessConfig(putPolitenessconfig: Politenessconfig): Observable<Politenessconfig> {
    const putUrl = this.politenessconfigUrl + '/' + putPolitenessconfig.id;
    return this.http.put(putUrl, putPolitenessconfig)
      .map(response => response.json() as Politenessconfig)
      .catch(this.errorhandlerservice.handleError);
  }

  getRobotsconfig() {
    return this.http.get(this.robotspolicyUrl)
      .map(res => res.json());
  }


}
