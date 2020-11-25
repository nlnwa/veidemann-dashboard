import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Health {
  status: string;
  version: string;
  notes: string [];
  checks: {
    'veidemann:activity': HealthCheck[],
    'veidemann:crawlerStatus': HealthCheck[],
    'veidemann:dashboard': HealthCheck[],
    'veidemann:harvest': HealthCheck[],
    'veidemann:jobs': HealthCheck[],
  };

}

export interface HealthCheck {
  componentType?: string;
  observedValue?: string | boolean;
  output?: string;
  time?: string;
  description?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})


export class HealthApiService {

  healthUrl = '/health';


  constructor(private http: HttpClient) {
  }

  get() {
    return this.http.get<Health>(this.healthUrl);
  }
}
