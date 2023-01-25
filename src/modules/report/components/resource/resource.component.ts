import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ApiError, Resource} from '../../../../shared/models';
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
  resourceDisplayedColumn: string[] = ['resourceType','resourceValue']
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

  getResource(resource: Resource){
    console.log(resource);
    const datasource = [];
    const resource = {
    {type: }
    }

    // for (const [key, value] of resource){
    //   if(value) {
    //     datasource.push({key,value});
    //   }
    // }
    return datasource;
  }
}
