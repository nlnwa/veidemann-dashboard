import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Resource} from '../../../../shared/models/log/resource.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AppConfigService} from '../../../core/services';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(000.4, 0.0, 0.2, 1)'))
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceComponent {

  @Input()
  resources: Resource[];

  constructor(public appConfigService: AppConfigService) {
  }

  displayedColumns: string[] = ['uri', 'discoveryPath'];
  expandedResource: Resource | null;

  hasError(resource: Resource): boolean {
    // @ts-ignore
    if (resource?.error) {
      return true;
    } else {
      return false;
    }
  }
}
