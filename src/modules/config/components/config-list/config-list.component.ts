import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseListComponent} from '../../../commons/components/base-list/base-list';
import {ConfigObject} from '../../../../shared/models/config';

@Component({
  selector: 'app-config-list',
  templateUrl: '../../../commons/components/base-list/base-list.html',
  styleUrls: ['../../../commons/components/base-list/base-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigListComponent extends BaseListComponent<ConfigObject> {
  constructor() {
    super();
  }
}
