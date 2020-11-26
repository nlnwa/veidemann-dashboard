import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Health, HealthCheck} from '../../../core/services/api/health-api.service';

@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HealthCheckComponent {

  @Input()
  health: Health;

  constructor() {
  }

  get status(): string {
    return this.health.status;
  }

  get version(): string {
    return this.health.version;
  }

  get notes(): string[] {
    return this.health.notes;
  }

  get checks(): object {
    return this.health.checks;
  }

  get activityCheck(): HealthCheck[] {
    return this.health.checks['veidemann:activity'];
  }

  get crawlerStatusCheck(): HealthCheck[] {
    return this.health.checks['veidemann:crawlerStatus'];
  }

  get dashboardCheck(): HealthCheck[] {
    return this.health.checks['veidemann:dashboard'];
  }

  get harvestCheck(): HealthCheck[] {
    return this.health.checks['veidemann:harvest'];
  }

  get jobsCheck(): HealthCheck[] {
    return this.health.checks['veidemann:jobs'];
  }
}
