import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef} from '@angular/core';
import {BaseListComponent} from '../../../commons/components';
import {ConfigObject} from '../../../../shared/models/config';
import {BASE_LIST} from '../../../../shared/directives';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-config-list',
  templateUrl: '../../../commons/components/base-list/base-list.html',
  styleUrls: [
    '../../../commons/components/base-list/base-list.scss',
    '../../../commons/components/base-list/base-list-odd-preview.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BASE_LIST,
      useExisting: forwardRef(() => ConfigListComponent)
    }
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', opacity: 0})),
      state('expanded', style({height: '*', opacity: 1})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ConfigListComponent extends BaseListComponent<ConfigObject> {
  constructor(protected cdr: ChangeDetectorRef) {
    super(cdr);
  }

  isDisabled(config: ConfigObject): boolean {
    return config?.crawlJob?.disabled || config?.seed?.disabled;
  }

  reset() {
    // this.selection.clear();
    this.selectedRow = null;
    this.allSelected = false;
    this.selectedRowIndex = null;
  }

  clearSelection() {
    this.selection.clear();
  }
}
