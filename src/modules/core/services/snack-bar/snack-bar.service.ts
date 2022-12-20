import {Injectable} from '@angular/core';
import {MatLegacySnackBar as MatSnackBar} from '@angular/material/legacy-snack-bar';


@Injectable({providedIn: 'root'})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  public openSnackBar(message: string, action?: string, duration?: number) {
    this.snackBar.open(message, action, {
      duration: duration ? duration : 8000,
    });
  }
}
