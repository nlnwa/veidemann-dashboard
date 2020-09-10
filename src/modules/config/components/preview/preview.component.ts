import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ConfigObject, Kind} from '../../../../shared/models/config';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorService} from '../../../core/services';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent {
  readonly Kind = Kind;

  @Input()
  configObject: ConfigObject;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private errorService: ErrorService) {
  }

  onEditConfig(configObject: ConfigObject) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {id: configObject.id},
    }).catch(error => this.errorService.dispatch(error));
  }
}
