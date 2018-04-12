import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {WarcStatusService} from '../warcstatus.service';

@Component({
  selector: 'app-warcstatus-list',
  templateUrl: './warcstatus-list.component.html',
  styleUrls: ['./warcstatus-list.component.css']
})
export class WarcStatusListComponent implements OnInit {

  selectedRowIndex = -1;

  @Output()
    protected rowClick = new EventEmitter<any[]>();

  dataSource = new MatTableDataSource();
  displayedColumns = ['filename', 'status'];

  constructor(private warcStatusService: WarcStatusService) {
  }

  ngOnInit() {
    this.warcStatusService.getValidationErrors()
      .subscribe(warcErrors => {
        this.dataSource.data = warcErrors;
      });
  }

   onRowClick(row) {
     this.rowClick.emit(row);
     this.selectedRowIndex = row.filename;
   }
}
