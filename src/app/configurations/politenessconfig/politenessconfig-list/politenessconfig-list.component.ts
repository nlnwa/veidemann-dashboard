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

  constructor(private politenessConfigService: PolitenessConfigService) {}

  ngOnInit() {
    this.politenessConfigService.list()
      .map(reply => reply.value)
      .subscribe(politenessConfigs => this.politenessConfigs = politenessConfigs);
  }

  private getIndexOfPolitenessConfig = (politenessConfigId: String) => {
    return this.politenessConfigs.findIndex((politenessConfig) => {
      return politenessConfig.id === politenessConfigId;
    });
  };

  selectPolitenessConfig(politenessConfig: PolitenessConfig) {
    this.selectedPolitenessConfig = politenessConfig
  }

  deletePolitenessConfig = (politenessConfigId: String) => {
    const idx = this.getIndexOfPolitenessConfig(politenessConfigId);
    if (idx !== -1) {
      this.politenessConfigs.splice(idx, 1);
      this.selectPolitenessConfig(null);
    }
    return this.politenessConfigs
  };

  createNewPolitenessConfig() {
    const politenessConfig: PolitenessConfig = {
      robots_policy: 'OBEY_ROBOTS',
      minimum_robots_validity_duration_s: null,
      custom_robots: '',
      min_time_between_page_load_ms: null,
      meta: {
        name: '',
        description: '',
        label: [],
      }
    };
    // By default, a newly-created  will have the selected state.
    this.selectPolitenessConfig(politenessConfig);
  }

  addPolitenessConfig = (politenessConfig: PolitenessConfig) => {
    this.politenessConfigs.push(politenessConfig);
    this.selectPolitenessConfig(politenessConfig);
    return this.politenessConfigs;
  };

  updatePolitenessConfig = (politenessConfig: PolitenessConfig) => {
    const idx = this.getIndexOfPolitenessConfig(politenessConfig.id);
    if (idx !== -1) {
      this.politenessConfigs[idx] = politenessConfig;
      this.selectPolitenessConfig(politenessConfig);
    }
    return this.politenessConfigs;
  }
}
