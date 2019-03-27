import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {DateTime} from '../../../commons/func';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-time',
  template: `
    <style>
      .time {
        font-family: monospace;
        font-size: 1rem;
      }
    </style>
    <span class="time">{{time$ | async | date: 'long': 'UTC'}}</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeComponent implements OnInit, OnDestroy {
  time$: Subject<string> = new Subject();
  interval: number;

  ngOnInit() {
    this.interval = setInterval(() => {
      this.time$.next(DateTime.nowUTC());
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
