import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Resource} from '../../../../shared/models/log/resource.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AppConfigService} from '../../../core/services';
import {MatTableDataSource} from '@angular/material/table';

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
export class ResourceComponent implements OnInit {

  @Input()
  resources: Resource[];

  displayedColumns: string[] = ['uri', 'discoveryPath'];
  expandedResource: Resource | null;
  dataSource = new MatTableDataSource<Resource>();

  constructor(public appConfigService: AppConfigService) {
  }


  ngOnInit() {
    this.dataSource = new MatTableDataSource<Resource>(this.resources);
  }

  hasError(resource: Resource): boolean {
    // @ts-ignore
    if (resource?.error) {
      return true;
    } else {
      return false;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
