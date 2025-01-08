import {Component, Input} from '@angular/core';
import {ConfigObject} from '../../../../../shared/models/config';
import {AuthService, SnackBarService} from '../../../../core/services';

@Component({
    selector: 'app-meta-preview',
    templateUrl: './meta-preview.component.html',
    styleUrls: ['./meta-preview.component.css'],
    standalone: false
})
export class MetaPreviewComponent {

  @Input()
  configObject: ConfigObject;

  constructor(private snackBarService: SnackBarService,
              private authService: AuthService) {
  }

  get canShowAnnotation() {
    return this.authService.isAdmin() || this.authService.isOperator() || this.authService.isCurator();
  }

  copyIdToClipboard() {
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = this.configObject.id;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    this.snackBarService.openSnackBar('Copied');
  }
}


