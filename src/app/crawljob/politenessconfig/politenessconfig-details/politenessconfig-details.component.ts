import {Component, OnInit, Input} from "@angular/core";
import {PolitenessConfig} from "../../../models/Politenessconfig";
import {CrawljobService} from "../../crawljob.service";

@Component({
  selector: 'politenessconfig-details',
  templateUrl: './politenessconfig-details.component.html',
  styleUrls: ['./politenessconfig-details.component.css']
})
export class PolitenessconfigDetailsComponent implements OnInit {

  @Input()
  politenessconfig: PolitenessConfig;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private crawljobService: CrawljobService) {
  }

  ngOnInit() {
    //  console.log(this.crawljob);
  }

  createPolitenessConfig() {
    this.crawljobService.createPolitenessConfig(this.politenessconfig).then((newPolitenessconfig: PolitenessConfig) => {
      //this.createHandler(newPolitenessconfig);
    });

  }


  updatePolitenessConfig(politenessconfig: PolitenessConfig): void {
    this.crawljobService.updatePolitenessConfig(this.politenessconfig);
    /*.then((updatedPolitenessconfig: PolitenessConfig) => {
     this.updateHandler(updatedPolitenessconfig);
     });*/
  }

  deletePolitenessConfig(politenessconfigId: String): void {
    //console.log(scheduleId);
    this.crawljobService.deletePolitenessConfig(politenessconfigId).then((deletedPolitenessconfigId: String) => {
      //this.deleteHandler(deletedPolitenessconfigId);
    });
  }
}
