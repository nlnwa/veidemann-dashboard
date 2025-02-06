import {Component, Input, OnInit} from '@angular/core';
import {CrawlLog} from '../../../../shared/models';
import {Observable} from 'rxjs';
import {AbilityService} from '@casl/angular';

@Component({
    selector: 'app-crawl-log-shortcuts',
    templateUrl: './crawl-log-shortcuts.component.html',
    styleUrls: ['./crawl-log-shortcuts.component.css'],
    standalone: false
})
export class CrawlLogShortcutsComponent {
  readonly ability$: Observable<any>

  @Input() crawlLog: CrawlLog;

  constructor(abilityService: AbilityService<any>) {
    this.ability$ = abilityService.ability$;
  }
}
