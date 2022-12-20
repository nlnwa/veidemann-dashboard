import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-crawlerstatus-dialog',
  templateUrl: './crawlerstatus-dialog.component.html',
  styleUrls: ['./crawlerstatus-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlerStatusDialogComponent {
  shouldPause: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.shouldPause = data.shouldPause;
  }

}
