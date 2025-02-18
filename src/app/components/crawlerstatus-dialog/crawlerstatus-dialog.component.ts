import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-crawlerstatus-dialog',
    templateUrl: './crawlerstatus-dialog.component.html',
    styleUrls: ['./crawlerstatus-dialog.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CrawlerStatusDialogComponent {
  shouldPause: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.shouldPause = data.shouldPause;
  }

}
