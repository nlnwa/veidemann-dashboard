import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangelogComponent implements OnInit {

  @Input()
  activityList: any[];

  showChangelog = false;

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit() {
  }

  dateFormat(timestamp: string): string {
    if (timestamp) {
      return this.datePipe.transform(timestamp, 'medium', 'UTC');
    } else {
      return '';
    }
  }

  onToggleChangelog() {
    if (this.showChangelog) {
      this.showChangelog = false;
    } else {
      this.showChangelog = true;
    }
  }
}
