import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {RunStatus} from '../../../shared/models/controller';
import {CrawlerStatus} from '../../../shared/models/controller/controller.model';
import {Observable} from "rxjs";
import {AbilityService} from "@casl/angular";


@Component({
    selector: 'app-crawlerstatus',
    templateUrl: './crawlerstatus.component.html',
    styleUrls: ['./crawlerstatus.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CrawlerStatusComponent {
  readonly RunStatus = RunStatus;
  readonly ability$: Observable<any>;

  constructor(private abilityService: AbilityService<any>) {
    this.ability$ = this.abilityService.ability$;
  }

  @Input()
  crawlerStatus: CrawlerStatus;

  @Output()
  changeRunStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  onPauseCrawler(shouldPause: boolean) {
    this.changeRunStatus.emit(shouldPause);
  }
}
