import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ConfigOptions, ConfigPath} from '../../func';
import {Kind} from 'src/shared/models';
import {AuthService} from '../../../core/services/auth';
import {NavigationListComponent} from '../../../commons/components';

@Component({
  selector: 'app-config-navigation-list',
  templateUrl: './config-nav-list.component.html',
  styleUrls: ['../../../commons/components/navigation-list/navigation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigNavListComponent extends NavigationListComponent {
  readonly ConfigPath = ConfigPath;
  readonly Kind = Kind;

  @Input()
  kind: Kind;

  @Input()
  options: ConfigOptions;

  constructor(protected authService: AuthService) {
    super(authService);
  }
}
