import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {HealthCheck} from '../../../../core/services/api/health-api.service';

@Component({
  selector: 'app-health-check-status',
  templateUrl: './health-check-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HealthCheckStatusComponent {

  @Input() checks: HealthCheck[];

  isUp(check: HealthCheck) {
    if (check.status !== undefined) {
      if (check.status === 'up') {
        return true;
      } else {
        return false;
      }
    } else {
      if (check.componentType === 'harvester') {
        return check.observedValue;
      }
    }
  }
}
