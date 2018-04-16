import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {WarcStatusService} from '../warcstatus.service';

@Component({
  selector: 'app-warcstatus-list',
  templateUrl: './warcstatus-list.component.html',
  styleUrls: ['./warcstatus-list.component.css']
})
export class WarcStatusListComponent implements OnInit, AfterViewInit {

  selectedRowIndex = -1;

  @Output()
  protected rowClick = new EventEmitter<any[]>();

  dataSource = new MatTableDataSource();
  displayedColumns = ['filename', 'status'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private warcStatusService: WarcStatusService) {
  }

  ngOnInit() {
    this.warcStatusService.getValidationErrors()
      .subscribe(warcErrors => {
        this.dataSource.data = warcErrors;
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onRowClick(row) {
    this.rowClick.emit(row);
    this.selectedRowIndex = row.filename;
  }
}
