import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

import {Politenessconfig} from "./politenessconfig";


@Injectable()
export class PolitenessconfigService {

  private politenessconfigUrl = '/api/politenessconfig';

  constructor(private http: Http) { }


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
      .catch(this.handleError);
  }

  deletePolitenessConfig(delPolitenessconfigId: String): Promise<String> {
    return this.http.delete(this.politenessconfigUrl + '/' + delPolitenessconfigId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  updatePolitenessConfig(putPolitenessconfig: Politenessconfig): Promise<Politenessconfig> {
    const putUrl = this.politenessconfigUrl + '/' + putPolitenessconfig.id;
    return this.http.put(putUrl, putPolitenessconfig)
      .toPromise()
      .then(response => response.json() as Politenessconfig)
      .catch(this.handleError);
  }
  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
