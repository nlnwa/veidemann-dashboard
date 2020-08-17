import {Component} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {AppConfigService} from '../../../core/services';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})

export class AboutDialogComponent {

  constructor(private appConfig: AppConfigService) {
  }

  get dashBoardversion(): string {
    return environment.version;
  }

  get veidemannVersion(): string {
    return this.appConfig.veidemannVersion
  }

}
