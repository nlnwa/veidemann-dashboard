import {Component, OnInit} from '@angular/core';
import {PolitenessConfigService} from '../politenessconfig.service';
import {PolitenessConfig} from '../../../commons/models/config.model';

@Component({
  selector: 'app-politenessconfig-list',
  templateUrl: './politenessconfig-list.component.html',
  styleUrls: ['./politenessconfig-list.component.css']
})
export class PolitenessConfigListComponent implements OnInit {

  politenessConfigs: PolitenessConfig[];
  selectedPolitenessConfig: PolitenessConfig;

  constructor(private politenessConfigService: PolitenessConfigService) {
  }

  ngOnInit() {
    this.politenessConfigService.list()
      .map(reply => reply.value)
      .subscribe(politenessConfigs =>
        this.politenessConfigs = politenessConfigs
      );
  }

  onSelectPolitenessConfig(politenessConfig: PolitenessConfig) {
    this.selectedPolitenessConfig = politenessConfig
  }

  onCreateNewPolitenessConfig() {
    /*const politenessConfig: PolitenessConfig = {
      robots_policy: 'OBEY_ROBOTS',
      minimum_robots_validity_duration_s: null,
      custom_robots: '',
      min_time_between_page_load_ms: null,
      max_time_between_page_load_ms: null,
      delay_factor: null,
      max_retries: null,
      retry_delay_seconds: null,
      crawl_host_group_selector: {
        label: []
      },
      meta: {
        name: '',
        description: '',
        label: [],
      }
    };*/
    // By default, a newly-created  will have the selected state.
    this.onSelectPolitenessConfig(new PolitenessConfig('OBEY_ROBOTS'));
  }

  onPolitenessConfigCreated(politenessConfig: PolitenessConfig) {
    this.politenessConfigs.push(politenessConfig);
    this.onSelectPolitenessConfig(politenessConfig);
    return this.politenessConfigs;
  };

  onPolitenessConfigUpdated(politenessConfig: PolitenessConfig) {
    const idx = this.getIndexOfPolitenessConfig(politenessConfig.id);
    if (idx !== -1) {
      this.politenessConfigs[idx] = politenessConfig;
    }
    return this.politenessConfigs;
  }

  onPolitenessConfigDeleted(politenessConfig: PolitenessConfig) {
    const idx = this.getIndexOfPolitenessConfig(politenessConfig.id);
    if (idx !== -1) {
      this.politenessConfigs.splice(idx, 1);
      this.onSelectPolitenessConfig(null);
    }
    return this.politenessConfigs
  };

  private getIndexOfPolitenessConfig(politenessConfigId: String) {
    return this.politenessConfigs.findIndex((politenessConfig) => {
      return politenessConfig.id === politenessConfigId;
    });
  };
}
