import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import {CrawlerStatusDialogComponent} from './crawlerstatus-dialog.component';
import {createComponentFactory, Spectator} from '@ngneat/spectator';

describe('CrawlerStatusDialogComponent', () => {
  let spectator: Spectator<CrawlerStatusDialogComponent>;

  const createComponent = createComponentFactory(
    {
      component: CrawlerStatusDialogComponent,
      imports: [MatDialogModule],
      providers: [{provide: MAT_DIALOG_DATA, useValue: {}}]
    });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
