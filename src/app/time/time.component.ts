import {Component, OnInit} from '@angular/core';

import {DateTime} from '../commons/datetime';

@Component({
  selector: 'app-time',
  template: `<span>{{myDate}}</span>`,
})
export class TimeComponent implements OnInit {
  myDate: String;

  ngOnInit() {
    setInterval(() => {
      this.myDate = DateTime.nowUTC();
    }, 1000);
  }
}
