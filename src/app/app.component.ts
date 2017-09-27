import {Component, OnInit} from '@angular/core';
import {DateTime} from './commons/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myDate: String;
  isExpertMode: boolean;

  constructor() {}

  setExpertMode(bool: boolean) {
    this.isExpertMode = bool;
  }

  getTimestamp() {
    setInterval(() => {
      this.myDate = DateTime.nowUTC();
    }, 1000);
  }

  ngOnInit() {
    this.getTimestamp();
  }
}
