import {Component, Input, OnChanges} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {DateTime} from '../../../commons/datetime/datetime';

@Component({
  selector: 'app-warcstatus-details',
  templateUrl: './warcstatus-details.component.html',
  styleUrls: ['./warcstatus-details.component.css']
})
export class WarcStatusDetailsComponent implements OnChanges {

  dataSource = new MatTableDataSource();
  displayedColumns = ['text', 'severity', 'subMessage'];
  timestamp;

  @Input()
  warcError: any;



  constructor() {
  }

  ngOnChanges() {
    if (this.warcError) {
      this.dataSource.data = this.warcError.messages;
      this.timestamp = DateTime.formatTimestamp(this.warcError.timestamp);
    }
  }
}
