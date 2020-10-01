import {Component, Input} from '@angular/core';
import {ConfigObject} from '../../../../../shared/models/config';
import {AuthService, SnackBarService} from '../../../../core/services';

@Component({
  selector: 'app-seed-meta-preview',
  templateUrl: './seed-meta-preview.component.html',
  styleUrls: ['./seed-meta-preview.component.css']
})
export class SeedMetaPreviewComponent {

  @Input()
  configObject: ConfigObject;

  constructor(private snackBarService: SnackBarService, private authService: AuthService) { }

  get canShowAnnotation(): boolean {
    return this.authService.isAdmin() || this.authService.isOperator() || this.authService.isCurator();
  }

  copyIdToClipboard(id: string) {
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = this.configObject.id;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    this.snackBarService.openSnackBar('Copied');
  }
}
