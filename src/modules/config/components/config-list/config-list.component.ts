import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef} from '@angular/core';
import {BaseListComponent} from '../../../commons/components/base-list/base-list';
import {ConfigObject} from '../../../../shared/models/config';
import {BASE_LIST} from '../../../../shared/directives';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-config-list',
  templateUrl: '../../../commons/components/base-list/base-list.html',
  styleUrls: ['../../../commons/components/base-list/base-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BASE_LIST,
      useExisting: forwardRef(() => ConfigListComponent)
    }
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ConfigListComponent extends BaseListComponent<ConfigObject> {
  constructor(public cdr: ChangeDetectorRef) {
    super();
  }

  reset() {
    super.reset();
    this.cdr.markForCheck();
  }
}
