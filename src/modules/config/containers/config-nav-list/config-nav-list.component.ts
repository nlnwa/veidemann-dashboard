import {AfterViewInit, ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ConfigOptions, ConfigPath} from '../../func';
import {Kind} from 'src/shared/models';
import {AuthService} from '../../../core/services/auth';
import {NavigationListComponent} from '../../../commons/components';
import {ShortcutEventOutput, ShortcutInput} from 'ng-keyboard-shortcuts';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AbilityService} from '@casl/angular';

@Component({
  selector: 'app-config-navigation-list',
  templateUrl: './config-nav-list.component.html',
  styleUrls: ['../../../commons/components/navigation-list/navigation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ConfigNavListComponent extends NavigationListComponent {
  readonly ConfigPath = ConfigPath;
  readonly Kind = Kind;
  readonly ability$: Observable<any>

  shortcuts: ShortcutInput[] = [];

  @Input()
  kind: Kind;

  @Input()
  options: ConfigOptions;

  constructor(protected authService: AuthService, private router: Router, abilityService: AbilityService<any>) {
    super(authService);
    this.ability$ = abilityService.ability$;
  }
}
