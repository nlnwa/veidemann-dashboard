import {Component, Input} from "@angular/core";
import {CrawljobService} from "../../crawljob.service";
import {Browserconfig} from "../../../models/browserconfig";
import {MdlSnackbarService} from "angular2-mdl";

@Component({
  selector: 'browserconfig-details',
  templateUrl: './browserconfig-details.component.html',
  styleUrls: ['./browserconfig-details.component.css']
})
export class BrowserconfigDetailsComponent {

  @Input()
  browserconfig: Browserconfig;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private crawljobService: CrawljobService,
              private mdlSnackbarService: MdlSnackbarService) {
  }

  createBrowserconfig() {
    this.crawljobService.createBrowserconfig(this.browserconfig)
    .then((newBrowserconfig: Browserconfig) => {
     this.createHandler(newBrowserconfig);
     });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });

  };

  updateBrowserconfig(browserconfig: Browserconfig): void {
    this.crawljobService.updateBrowserconfig(this.browserconfig).then((updatedBrowserconfig: Browserconfig) => {
         this.updateHandler(updatedBrowserconfig);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
  }

  deleteBrowserconfig(browserconfigId: String): void {
    this.crawljobService.deleteBrowserconfig(browserconfigId).then((deletedBrowserconfigId: String) => {
       this.deleteHandler(deletedBrowserconfigId);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Slettet',
      });
  }
}
