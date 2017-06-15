import {Component, OnInit, Input} from '@angular/core';
import {CrawljobService} from "../../crawljob.service";
import {BrowserConfig} from "../../../models/BrowserConfig";

@Component({
  selector: 'browserconfig-details',
  templateUrl: './browserconfig-details.component.html',
  styleUrls: ['./browserconfig-details.component.css']
})
export class BrowserconfigDetailsComponent implements OnInit {

  @Input()
  browserconfig: BrowserConfig;

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

  createBrowserConfig() {
    this.crawljobService.createBrowserConfig(this.browserconfig)/*.then((newBrowserconfig: BrowserConfig) => {
      this.createHandler(newBrowserconfig);
    });*/

  };


  updateBrowserConfig(browserconfig: BrowserConfig): void {
    this.crawljobService.updateBrowserConfig(this.browserconfig).then((updatedBrowserconfig: BrowserConfig) => {
      this.updateHandler(updatedBrowserconfig);
      //   this.ngOnChanges();
    });
  }

  deleteBrowserConfig(browserconfigId: String): void {
    this.crawljobService.deleteBrowserConfig(browserconfigId).then((deletedBrowserconfigId: String) => {
      this.deleteHandler(deletedBrowserconfigId);
    });
  }
}
