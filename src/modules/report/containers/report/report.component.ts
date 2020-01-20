import {Component} from '@angular/core';
import {ConfigObject, RobotsPolicy, Role, RotationPolicy, SubCollectionType} from '../../../../shared/models/config';

export interface ConfigOptions {
  crawlJobs?: ConfigObject[];
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
}
