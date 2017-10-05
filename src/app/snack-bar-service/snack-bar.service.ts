import { Injectable } from '@angular/core';
import {MdSnackBar} from '@angular/material';


@Injectable()
export class SnackBarService {

  constructor(private snackBar: MdSnackBar) { }

  public openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }
}
