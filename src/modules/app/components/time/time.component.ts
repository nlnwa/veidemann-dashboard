import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-time',
  template: `<span class="time">{{time$ | async | date: 'long': 'UTC'}}</span>`,
  styleUrls: ['./time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeComponent implements OnInit, OnDestroy {
  time$: Subject<Date> = new Subject();
  interval: number;

  ngOnInit() {
    this.interval = setInterval(() => {
      this.time$.next(new Date());
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
