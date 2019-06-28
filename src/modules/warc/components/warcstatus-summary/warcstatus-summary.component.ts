import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-warcstatus-summary',
  templateUrl: './warcstatus-summary.component.html',
  styleUrls: ['./warcstatus-summary.component.css']
})
export class WarcStatusSummaryComponent implements OnChanges {

  errorSummaryColumns = ['subMessage', 'subMessageCount'];
  errors;

  @Input()
  allErrors: any;

  constructor() {
  }

  ngOnChanges() {
    if (this.allErrors) {
      this.errors = this.errorSummary(this.allErrors);
    }
  }


  errorSummary(warcErrors: any): any {
    const errorsSummary = [];
    for (const errors of warcErrors) {
      for (const error of errors.messages) {
        const errorTypeIndex = errorsSummary.findIndex(err => err.type === error.text);
        if (errorTypeIndex !== -1) {
          errorsSummary[errorTypeIndex].total += 1;
          errorsSummary[errorTypeIndex].subMessages.push({message: error.subMessage});
        } else {
          errorsSummary.push({type: error.text, total: 1, subMessages: [{message: error.subMessage}]});
        }
      }
    }
    for (const error of errorsSummary) {
      error.subMessages = this.filterSubMessages(error.subMessages);
    }
    return errorsSummary;
  }

  filterSubMessages(subMessages) {
    const filtered = [];
    for (const subMessage of subMessages) {
      const split = subMessage.message.split(',');
      const index = filtered.findIndex(sub => sub.message === split[0]);
      if (index !== -1) {
        filtered[index].count += 1;
      } else {
        filtered.push({message: split[0], count: 1});
      }
    }
    return filtered;
  }
}


