import {Component} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {AppConfigService} from '../../../core/services';
import {DeploymentVersions} from '../../../../shared/models/deployment-versions.model';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})

export class AboutDialogComponent {
  versions: DeploymentVersions

  constructor(private appConfig: AppConfigService) {
    this.versions = appConfig.versions;
  }

  get dashBoardversion(): string {
    return environment.version;
  }
}
