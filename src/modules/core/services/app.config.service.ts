import {Injectable} from '@angular/core';
import {AppConfig} from '../../commons/models/app-config.model';

@Injectable()
export class AppConfigService extends AppConfig {
  constructor() {
    super();
  }
}
