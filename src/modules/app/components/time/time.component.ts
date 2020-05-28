import {ChangeDetectionStrategy, Component} from '@angular/core';
import {interval, Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-time',
  template: `<span class="time">{{time$ | async | date: 'long': 'UTC'}}</span>`,
  styleUrls: ['./time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeComponent {
  time$: Observable<Date>;

  constructor() {
    this.time$ = interval(1000).pipe(
      map(() => new Date())
    );
  }
}
