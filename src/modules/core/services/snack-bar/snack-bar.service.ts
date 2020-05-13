import {Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  public openSnackBar(message: string, action?: string, duration?: number) {
    this.snackBar.open(message, action, {
      duration: duration ? duration : 8000,
    });
  }
}
