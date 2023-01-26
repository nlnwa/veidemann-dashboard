import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Resource} from '../../../../shared/models';
import {animate, state, style, transition, trigger} from '@angular/animations';
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
  resourceDisplayedColumn: string[] = ['resourceType', 'resourceValue']
  expandedResource: Resource | null;
  dataSource = new MatTableDataSource<Resource>();

  constructor() {
  }


  ngOnInit() {
    this.dataSource = new MatTableDataSource<Resource>(this.resources);
  }

  hasError(resource: Resource): boolean {
    return !!resource?.error;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getResource(resource: Resource) {
    const datasource = [];
    const resources = [
      {key: 'URI', value: resource.uri},
      {key: 'From cache', value: resource.fromCache},
      {key: 'Renderable', value: resource.renderable},
      {key: 'Resource type', value: resource.resourceType},
      {key: 'Mime type', value: resource.mimeType},
      {key: 'Status code', value: resource.statusCode},
      {key: 'Discovery path', value: resource.discoveryPath},
      {key: 'WARC ID', value: resource.warcId},
      {key: 'Referrer', value: resource.referrer},
      {key: 'Method', value: resource.method},
      {
        key: 'Error', value: resource.error ?
          resource.error.code + ': ' + resource?.error.msg + ' - ' + resource?.error.detail : null
      }
    ]
    for (const res of resources) {
      if (res.value) {
          datasource.push(res);
        }
      }
      return datasource;
    }
}
