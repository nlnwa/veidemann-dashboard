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
  errorSummaryColumns = ['subMessage', 'subMessageCount'];
  timestamp;
  errors;

  @Input()
  warcError: any;


  constructor() {
  }

  ngOnChanges() {
    if (this.warcError) {
      this.errors = this.errorSummary(this.warcError);
      this.dataSource.data = this.warcError.messages;
      this.timestamp = DateTime.formatTimestamp(this.warcError.timestamp);
    }
  }

  errorSummary(warcError: any): any {
    const errors = [];
    for (const error of warcError.messages) {
      const errorTypeIndex = errors.findIndex(function (err) {
        return err.type === error.text;
      });
      if (errorTypeIndex !== -1) {
        errors[errorTypeIndex].total += 1;
        errors[errorTypeIndex].subMessages.push({message: error.subMessage});
      } else {
        errors.push({type: error.text, total: 1, subMessages: [{message: error.subMessage}]});
      }
    }
    for (const error of errors) {
      error.subMessages = this.filterSubMessages(error.subMessages);
    }
    return errors;
  }

  filterSubMessages(subMessages) {
    const filtered = [];
    for (const subMessage of subMessages) {
      const split = subMessage.message.split(',');
      const index = filtered.findIndex(function (sub) {
        return sub.message === split[0];
      });
      if (index !== -1) {
        filtered[index].count += 1;
      } else {
        filtered.push({message: split[0], count: 1});
      }
    }
    return filtered;
  }

  totalErrors(errors) {
    let total = 0;
    for (const error of errors) {
      total += error.total;
    }
    return total;
  }
}
