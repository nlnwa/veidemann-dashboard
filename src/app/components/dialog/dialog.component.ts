import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {ErrorDialogComponent} from '../error-dialog/error-dialog.component';
import {ErrorService} from '../../../modules/core/services';


@Component({
    selector: 'app-dialog',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DialogComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void>;
  private dialogRef: MatDialogRef<ErrorDialogComponent>;

  constructor(private dialog: MatDialog, private errorService: ErrorService) {
    this.ngUnsubscribe = new Subject<void>();
  }

  ngOnInit(): void {
    this.errorService.error$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((error) => {
        // TODO: show all errors explicitly (not just the first)

        if (this.dialog.openDialogs.length > 0) {
          console.error(error);
        } else {
          this.dialogRef = this.dialog.open(ErrorDialogComponent, {data: {error}});
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
