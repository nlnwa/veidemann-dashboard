import {Component, Input} from "@angular/core";
import {Politenessconfig} from "../../../models/politenessconfig";
import {CrawljobService} from "../../crawljob.service";
import {MdlSnackbarService} from "angular2-mdl";


@Component({
  selector: 'politenessconfig-details',
  templateUrl: './politenessconfig-details.component.html',
  styleUrls: ['./politenessconfig-details.component.css']
})

export class PolitenessconfigDetailsComponent {
  @Input()
  politenessconfig: Politenessconfig;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private crawljobService: CrawljobService,
              private mdlSnackbarService: MdlSnackbarService) {
  }

  createPolitenessconfig() {
    this.crawljobService.createPolitenessconfig(this.politenessconfig).then((newPolitenessconfig: Politenessconfig) => {
      this.createHandler(newPolitenessconfig);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret'
      });
  }


  updatePolitenessconfig(politenessconfig: Politenessconfig): void {
    this.crawljobService.updatePolitenessConfig(this.politenessconfig).then((updatedPolitenessconfig: Politenessconfig) => {
      this.updateHandler(updatedPolitenessconfig);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret'
      });
  }

  deletePolitenessconfig(politenessconfigId: String): void {
    this.crawljobService.deletePolitenessConfig(politenessconfigId).then((deletedPolitenessconfigId: String) => {
      this.deleteHandler(deletedPolitenessconfigId);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Slettet'
      });
  }
}
