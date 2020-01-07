import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseListComponent} from '../base-list/base-list';
import {ConfigObject} from '../../../commons/models/config';

@Component({
  selector: 'app-config-list',
  templateUrl: '../base-list/base-list.html',
  styleUrls: ['../base-list/base-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigListComponent extends BaseListComponent<ConfigObject> {
}
