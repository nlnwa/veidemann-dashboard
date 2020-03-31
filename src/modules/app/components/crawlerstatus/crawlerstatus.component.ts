import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {RunStatus} from '../../../../shared/models/controller';


@Component({
  selector: 'app-crawlerstatus',
  templateUrl: './crawlerstatus.component.html',
  styleUrls: ['./crawlerstatus.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlerStatusComponent {
  readonly RunStatus = RunStatus;

  @Input()
  runStatus: RunStatus;

  @Output()
  change: EventEmitter<boolean> = new EventEmitter<boolean>();

  onPauseCrawler(shouldPause: boolean) {
    this.change.emit(shouldPause);
  }
}
