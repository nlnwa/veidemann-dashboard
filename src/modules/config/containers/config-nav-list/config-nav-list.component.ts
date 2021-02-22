import {AfterViewInit, ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ConfigOptions, ConfigPath} from '../../func';
import {Kind} from 'src/shared/models';
import {AuthService} from '../../../core/services/auth';
import {NavigationListComponent} from '../../../commons/components';
import {ShortcutEventOutput, ShortcutInput} from 'ng-keyboard-shortcuts';
import {Router} from '@angular/router';

@Component({
  selector: 'app-config-navigation-list',
  templateUrl: './config-nav-list.component.html',
  styleUrls: ['../../../commons/components/navigation-list/navigation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigNavListComponent extends NavigationListComponent implements AfterViewInit {
  readonly ConfigPath = ConfigPath;
  readonly Kind = Kind;

  shortcuts: ShortcutInput[] = [];

  @Input()
  kind: Kind;

  @Input()
  options: ConfigOptions;

  constructor(protected authService: AuthService, private router: Router) {
    super(authService);
  }

  ngAfterViewInit(): void {
    this.shortcuts.push(
      {
        key: 'c e',
        label: 'Configurations',
        description: 'Show entity view',
        command: (output: ShortcutEventOutput) => this.router.navigate(['/config/entity'])
      },
      {
        key: 'c s',
        label: 'Configurations',
        description: 'Show seed view',
        command: (output: ShortcutEventOutput) => this.router.navigate(['/config/seed'])
      },
      {
        key: 'c j',
        label: 'Configurations',
        description: 'Show crawljob view',
        command: (output: ShortcutEventOutput) => this.router.navigate(['/config/crawljobs'])
      },
      {
        key: 'c s c',
        label: 'Configurations',
        description: 'Show schedule view',
        command: (output: ShortcutEventOutput) => this.router.navigate(['/config/schedule'])
      },
      {
        key: 'c r',
        label: 'Configurations',
        description: 'Show crawlconfig view',
        command: (output: ShortcutEventOutput) => this.router.navigate(['/config/crawlconfig'])
      },
      {
        key: 'c o',
        label: 'Configurations',
        description: 'Show entity view',
        command: (output: ShortcutEventOutput) => this.router.navigate(['/config/entity'])
      },
      {
        key: 'c b',
        label: 'Configurations',
        description: 'Show browserconfig view',
        command: (output: ShortcutEventOutput) => this.router.navigate(['/config/browserconfig'])
      },
      {
        key: 'c b s',
        label: 'Configurations',
        description: 'Show browserscript view',
        command: (output: ShortcutEventOutput) => this.router.navigate(['/config/browserscript'])
      },
      {
        key: 'c p',
        label: 'Configurations',
        description: 'Show politeness view',
        command: (output: ShortcutEventOutput) => this.router.navigate(['/config/politenessconfig'])
      },
      {
        key: 'c h',
        label: 'Configurations',
        description: 'Show crawlhostgroup view',
        command: (output: ShortcutEventOutput) => this.router.navigate(['/config/crawlhostgroupconfig'])
      },
      {
        key: 'c u',
        label: 'Configurations',
        description: 'Show users view',
        command: (output: ShortcutEventOutput) => this.router.navigate(['/config/rolemapping'])
      },
      {
        key: 'r j',
        label: 'Reports',
        description: 'Show jobexecution reports',
        command: (output: ShortcutEventOutput) => this.router.navigate(['/report/jobexecution'])
      },
      {
        key: 'r c',
        label: 'Reports',
        description: 'Show crawlexecution reports',
        command: (output: ShortcutEventOutput) => this.router.navigate(['/report/jobexecution'])
      },
      {
        key: 'r p',
        label: 'Reports',
        description: 'Show pagelog reports',
        command: (output: ShortcutEventOutput) => this.router.navigate(['/report/jobexecution'])
      },
      {
        key: 'r c l',
        label: 'Reports',
        description: 'Show crawllog reports',
        command: (output: ShortcutEventOutput) => this.router.navigate(['/report/jobexecution'])
      },
    );
  }
}
