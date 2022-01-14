import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {ErrorDialogComponent} from './error-dialog.component';

describe('ErrorDialogComponent', () => {
  let spectator: Spectator<ErrorDialogComponent>;

  const EXPECTED_DIALOG = {
    error: {
      name: 'My Error',
      message: 'My Errormessage',
      code: -3
    }
  };

  const createComponent = createComponentFactory(
    {
      component: ErrorDialogComponent,
      imports: [MatDialogModule],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: EXPECTED_DIALOG},
      ]
    });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have title set', () => {
    expect(spectator.component.title).toBe(EXPECTED_DIALOG.error.name);
  });

  it('should have content set', () => {
    expect(spectator.component.content).toBe(EXPECTED_DIALOG.error.message);
  });
});
