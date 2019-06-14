import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import {ErrorDialogComponent} from '../error-dialog/error-dialog.component';
import {ErrorService} from '../../../core/services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dialog',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit, OnDestroy {

  private subscription = Subscription.EMPTY;
  private dialogRef: MatDialogRef<ErrorDialogComponent>;

  constructor(private dialog: MatDialog, private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.errorService.error$.subscribe((error) => {
      // TODO: show all errors explicitly (not just the first)

      if (this.dialog.openDialogs.length > 0) {
        console.error(error);
      } else {
        this.dialogRef = this.dialog.open(ErrorDialogComponent, {data: {error}});
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dialogRef.close();
  }
}
