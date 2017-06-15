import {Component, OnInit, Input, OnChanges, ViewEncapsulation} from '@angular/core';
import {Crawlconfig} from "../../../models/crawlconfig";
import {CrawljobService} from "../../crawljob.service";
import {FormGroup, FormBuilder} from "@angular/forms";
import {MdlSnackbarService} from "angular2-mdl";
import {BrowserConfig} from "../../../models/BrowserConfig";
import {PolitenessConfig} from "../../../models/Politenessconfig";

@Component({
  selector: 'crawlconfig-details',
  templateUrl: './crawlconfig-details.component.html',
  styleUrls: ['./crawlconfig-details.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class CrawlconfigDetailsComponent implements OnChanges {

  crawlconfigForm: FormGroup;



  @Input()
  crawlconfig: Crawlconfig;

  browserconfig: BrowserConfig;
  politenessconfig: PolitenessConfig;
  browserconfigList: any = [];
  politenessconfigList: any = [];

  selectedBrowserconfigItems = [];
  dropdownBrowserconfigSettings = {};
  dropdownPolitenessconfigSettings = {};
  selectedPolitenessconfigItems = [];

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private crawljobService: CrawljobService,
              private fb: FormBuilder,
              private mdlSnackbarService: MdlSnackbarService,

  ) {
    this.filldropdown();
    this.createForm();
  }

  createForm() {
    this.crawlconfigForm = this.fb.group({
      id: {value: '', disabled: true},
      browser_config_id: '',
      politeness_id: '',
      extra: this.fb.group ({
        extract_text: true,
        create_snapshot: true,
      }),
      minimum_dns_ttl_s: '',
      depth_first: '',
      meta: this.fb.group ({
        name: '',
        description: '',
        created: this.fb.group({seconds: {value: '', disabled: true, }}),
        created_by: {value: '', disabled: true},
        last_modified: this.fb.group({seconds: {value: '', disabled: true}}),
        last_modified_by: {value: '', disabled: true},
      }),
    });
  }

  ngOnChanges() {
    this.createForm();
    this.crawlconfigForm.reset({
      id: this.crawlconfig.id,
      extra: this.fb.group({
        extract_text: this.crawlconfig.extra.extract_text,
        create_snapshot: this.crawlconfig.extra.create_snapshot,
      }),
      minimum_dns_ttl_s: this.crawlconfig.minimum_dns_ttl_s,
      depth_first: this.crawlconfig.depth_first,
      meta: this.fb.group ({
        name: this.crawlconfig.meta.name,
        description: this.crawlconfig.meta.description,
        created: this.crawlconfig.meta.created,
        created_by: this.crawlconfig.meta.created_by,
        last_modified: this.crawlconfig.meta.last_modified,
        last_modified_by: this.crawlconfig.meta.last_modified_by,
      }),
    });
    this.setDropdown();

  }

  updateCrawlconfig(crawlconfigForm): void {
    this.crawlconfig  = this.prepareSaveCrawlconfig();
    this.crawljobService.updateCrawlConfig(this.crawlconfig)/*.then((updatedCrawlconfig) => {
     this.updateHandler(updatedCrawlconfig);
     this.ngOnChanges();
     });*/
    this.mdlSnackbarService.showSnackbar(
      {
        message:'Lagret',
      });
  };


  prepareSaveCrawlconfig(): Crawlconfig {
    const formModel = this.crawlconfigForm.value;

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveCrawlconfig: Crawlconfig = {
      id: this.crawlconfig.id,
      browser_config_id: formModel.browser_config_id[0].id as string ,
      politeness_id: formModel.politeness_id[0].id as string ,
      extra: {
        extract_text: formModel.extra.extract_text as boolean,
        create_snapshot: formModel.extra.create_snapshot as boolean,
      },
      minimum_dns_ttl_s: formModel.minimum_dns_ttl_s as number,
      depth_first: formModel.depth_first as boolean,
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
      }
    };
    return saveCrawlconfig;
  }


  onItemSelect(item){
    console.log('Selected Item:');
    console.log(item);
  }
  OnItemDeSelect(item){
    console.log('De-Selected Item:');
    console.log(item);
  }

  setDropdown() {
    this.selectedPolitenessconfigItems=[];
    this.selectedBrowserconfigItems=[];

    if (this.crawlconfig.browser_config_id !== "") {
      this.crawljobService.getBrowserconfigs(this.crawlconfig.browser_config_id).map(browser_config => browser_config).forEach((value) => {
        value.forEach((key) => {
          this.selectedBrowserconfigItems.push({id: key.id, itemName: key.meta.name})
        })
      });
    }
    if (this.crawlconfig.politeness_id !== "") {
    this.crawljobService.getPolitenessconfig(this.crawlconfig.politeness_id).map(politeness => politeness).forEach((value) => {
      value.forEach((key) => {
        this.selectedPolitenessconfigItems.push({id: key.id, itemName: key.meta.name})
      })
    });
    }
  }

  filldropdown() {
    //  this.setLabel(this.seed.meta.label);
    this.crawljobService.getAllBrowserconfigs().map(browserconfigs => browserconfigs.value).forEach((value) => {
      value.forEach((key) => {
        this.browserconfigList.push({id: key.id, itemName: key.meta.name})
      })
    });

    this.crawljobService.getAllPolitenessconfigs().map(politenessconfigs => politenessconfigs.value).forEach((value) => {
      value.forEach((key) => {
        this.politenessconfigList.push({id: key.id, itemName: key.meta.name})
      })
    });

    this.selectedPolitenessconfigItems = [];
    this.selectedBrowserconfigItems = [];

    this.dropdownPolitenessconfigSettings = {
      singleSelection: true,
      text:"Velg Politeness",
      enableSearchFilter: true
    };

    this.dropdownBrowserconfigSettings = {
      singleSelection: true,
      text:"Velg browserconfig",
      enableSearchFilter: true
    };
  }

}
