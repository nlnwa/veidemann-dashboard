import {Component, OnInit} from "@angular/core";
import {Politenessconfig} from "../../../models/politenessconfig";
import {CrawljobService} from "../../crawljob.service";

@Component({
  selector: 'app-politenessconfig-list',
  templateUrl: './politenessconfig-list.component.html',
  styleUrls: ['./politenessconfig-list.component.css']
})
export class PolitenessconfigListComponent implements OnInit {

  politenessconfigs: Politenessconfig[];
  selectedPolitenessconfig: Politenessconfig;

  constructor(private crawljobService: CrawljobService) {
  }

  ngOnInit() {
    this.crawljobService.getAllPolitenessconfigs().subscribe(politenessconfigs => {
      this.politenessconfigs = politenessconfigs.value
    })
  }

  private getIndexOfPolitenessconfig = (politenessconfigId: String) => {
    return this.politenessconfigs.findIndex((politenessconfig) => {
      return politenessconfig.id === politenessconfigId;
    });
  };

  selectPolitenessconfig(politenessconfig: Politenessconfig) {
    this.selectedPolitenessconfig = politenessconfig
  }

  deletePolitenessconfig = (politenessconfigId: String) => {
    const idx = this.getIndexOfPolitenessconfig(politenessconfigId);
    if (idx !== -1) {
      this.politenessconfigs.splice(idx, 1);
      this.selectPolitenessconfig(null);
    }
    return this.politenessconfigs
  };

  createNewPolitenessconfig() {
    const politenessconfig: Politenessconfig = {
      robots_policy: '',
      minimum_robots_validity_duration_s: 0,
      custom_robots: '',
      min_time_between_page_load_ms: '',
      meta: {
        name: '',
        description: '',
      }
    };
    // By default, a newly-created  will have the selected state.
    this.selectPolitenessconfig(politenessconfig);
  }

  addPolitenessconfig = (politenessconfig: Politenessconfig) => {
    this.politenessconfigs.push(politenessconfig);
    this.selectPolitenessconfig(politenessconfig);
    return this.politenessconfigs;
  };

  updatePolitenessconfig = (politenessconfig: Politenessconfig) => {
    const idx = this.getIndexOfPolitenessconfig(politenessconfig.id);
    if (idx !== -1) {
      this.politenessconfigs[idx] = politenessconfig;
      this.selectPolitenessconfig(politenessconfig);
    }
    return this.politenessconfigs;
  }
}
