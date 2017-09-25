import {Injectable} from '@angular/core';
import {PolitenessConfig} from './';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {PolitenessConfigs} from './politenessconfig.model';


@Injectable()
export class PolitenessConfigService {

  private politenessConfigUrl = `${environment.API_URL}/politenessconfig`;
  private robotsPolicyUrl = `${environment.API_URL}/robotspolicy`;

  constructor(private http: HttpClient) {}

  getAllPolitenessConfigs(): Observable<PolitenessConfigs> {
    return this.http.get(this.politenessConfigUrl);
  }

  getPolitenessConfig(politenessConfigId): Observable<PolitenessConfig> {
    return this.http.get<PolitenessConfigs>(`${this.politenessConfigUrl}/${politenessConfigId}`)
      .map(res => res.value[0]);
  }

  createPolitenessConfig(newPolitenessconfig: PolitenessConfig): Observable<PolitenessConfig> {
    return this.http.post<PolitenessConfig>(this.politenessConfigUrl, newPolitenessconfig);
  }

  deletePolitenessConfig(politenessConfigId: String): Observable<String> {
    return this.http.delete(this.politenessConfigUrl + '/' + politenessConfigId);
  }

  updatePolitenessConfig(politenessConfig: PolitenessConfig): Observable<PolitenessConfig> {
    const putUrl = this.politenessConfigUrl + '/' + politenessConfig.id;
    return this.http.put<PolitenessConfig>(putUrl, politenessConfig);
  }

  getRobotsConfig(): Observable<Object[]> {
    return this.http.get(this.robotsPolicyUrl)
      .map((res => res['menuitem']));
  }
}
