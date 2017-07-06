import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Politenessconfig} from "./politenessconfig";
import {ErrorHandlerService} from "../../commons/components/errorhandlerservice";


@Injectable()
export class PolitenessconfigService {

  private politenessconfigUrl = '/api/politenessconfig';

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

  createPolitenessconfig(newPolitenessconfig: Politenessconfig): Promise<Politenessconfig> {
    return this.http.post(this.politenessconfigUrl, newPolitenessconfig)
      .toPromise()
      .then(response => response.json() as Politenessconfig)
      .catch(this.errorhandlerservice.handleError);
  }

  deletePolitenessConfig(delPolitenessconfigId: String): Promise<String> {
    return this.http.delete(this.politenessconfigUrl + '/' + delPolitenessconfigId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.errorhandlerservice.handleError);
  }

  updatePolitenessConfig(putPolitenessconfig: Politenessconfig): Promise<Politenessconfig> {
    const putUrl = this.politenessconfigUrl + '/' + putPolitenessconfig.id;
    return this.http.put(putUrl, putPolitenessconfig)
      .toPromise()
      .then(response => response.json() as Politenessconfig)
      .catch(this.errorhandlerservice.handleError);
  }

}
