import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {DialogComponent} from './dialog.component';
import {CommonsModule} from '../../../modules/commons';


describe('DialogComponent', () => {
  let spectator: Spectator<DialogComponent>;

  const createComponent = createComponentFactory(
    {
      component: DialogComponent,
      imports: [CommonsModule, MatDialogModule],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

});
