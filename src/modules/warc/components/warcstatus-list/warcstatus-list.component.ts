import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {WarcStatusService} from '../../services/warcstatus.service';

@Component({
  selector: 'app-warcstatus-list',
  templateUrl: './warcstatus-list.component.html',
  styleUrls: ['./warcstatus-list.component.css']
})
export class WarcStatusListComponent implements OnInit, AfterViewInit {

  selectedRowIndex = -1;

  @Output()
  protected rowClick = new EventEmitter<any[]>();

  @Output()
  allErrors = new EventEmitter<any[]>();

  dataSource = new MatTableDataSource();
  displayedColumns = ['filename', 'status'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private warcStatusService: WarcStatusService) {
  }

  ngOnInit() {
    this.warcStatusService.getValidationErrors()
      .subscribe(warcErrors => {
        this.dataSource.data = warcErrors;
        this.allErrors.emit(warcErrors);
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onRowClick(row) {
    if (this.selectedRowIndex !== row.filename) {
      this.rowClick.emit(row);
      this.selectedRowIndex = row.filename;
    } else {
      if (this.selectedRowIndex === row.filename) {
        this.rowClick.emit(null);
        this.selectedRowIndex = -1;
      }
    }
  }
}
