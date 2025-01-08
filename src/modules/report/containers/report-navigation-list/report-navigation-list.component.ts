import {Component} from '@angular/core';
import {AuthService} from '../../../core/services/auth';
import {NavigationListComponent} from '../../../commons/components';

@Component({
    selector: 'app-report-navigation-list',
    templateUrl: './report-navigation-list.component.html',
    styleUrls: ['../../../commons/components/navigation-list/navigation-list.component.scss'],
    standalone: false
})
export class ReportNavigationListComponent extends NavigationListComponent {

  constructor(protected authService: AuthService) {
    super(authService);
  }
}
