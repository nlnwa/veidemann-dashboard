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

  constructor(private datetime: DateTime) {}

  setExpertMode(bool: boolean) {
    this.isExpertMode = bool;
  }

  getTimestamp() {
    setInterval(() => {
      this.myDate = this.datetime.nowUTC();
    }, 1000);
  }

  ngOnInit() {
    this.getTimestamp();
  }
}
