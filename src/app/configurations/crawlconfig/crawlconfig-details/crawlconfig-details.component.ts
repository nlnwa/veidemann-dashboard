import {Component, Input, OnChanges} from '@angular/core';
import {PolitenessConfigService} from '../../politenessconfig/';
import {BrowserConfigService} from '../../browserconfig/';
import {CustomValidators} from '../../../commons/';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdSnackBar} from '@angular/material';
import {CrawlConfigService} from '../crawlconfig.service';
import {BrowserConfig, CrawlConfig, Label, PolitenessConfig} from '../../../commons/models/config.model';


@Component({
  selector: 'app-crawlconfig-details',
  templateUrl: './crawlconfig-details.component.html',
  styleUrls: ['./crawlconfig-details.component.css'],
  // encapsulation: ViewEncapsulation.None,

})
export class CrawlConfigDetailsComponent implements OnChanges {
  @Input()
  crawlConfig: CrawlConfig;
  crawlConfigFG: FormGroup;

  browserConfig: BrowserConfig;
  politenessConfig: PolitenessConfig;
  browserConfigList: any = [];
  politenessConfigList: any = [];

  selectedBrowserConfigItems = [];
  dropdownBrowserConfigSettings = {};
  dropdownPolitenessConfigSettings = {};
  selectedPolitenessConfigItems = [];

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private crawlConfigService: CrawlConfigService,
              private politenessConfigService: PolitenessConfigService,
              private browserConfigService: BrowserConfigService,
              private fb: FormBuilder,
              private mdSnackBar: MdSnackBar) {
    this.fillDropdown();
    this.createForm();
  }


  createForm() {
    this.crawlConfigFG = this.fb.group({
      id: {value: '', disabled: true},
      browser_config_id: ['', CustomValidators.nonEmpty],
      politeness_id: ['', CustomValidators.nonEmpty],
      extra: this.fb.group({
        extract_text: true,
        create_snapshot: '',
      }),
      minimum_dns_ttl_s: ['', [Validators.required, CustomValidators.min(0)]],
      depth_first: '',
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: '',
        created: this.fb.group({seconds: {value: '', disabled: true}}),
        created_by: {value: '', disabled: true},
        last_modified: this.fb.group({seconds: {value: '', disabled: true}}),
        last_modified_by: {value: '', disabled: true},
        label: [],
      }),
    });
  }

  updateData(crawlConfig: CrawlConfig) {
    this.crawlConfigFG.controls['id'].setValue(crawlConfig.id);
    this.crawlConfigFG.controls['extra'].setValue({
      extract_text: crawlConfig.extra.extract_text,
      create_snapshot: crawlConfig.extra.create_snapshot,
    });
    this.crawlConfigFG.controls['minimum_dns_ttl_s'].setValue(crawlConfig.minimum_dns_ttl_s);
    this.crawlConfigFG.controls['depth_first'].setValue(crawlConfig.depth_first);
    this.crawlConfigFG.controls['meta'].patchValue({
      name: crawlConfig.meta.name as string,
      description: crawlConfig.meta.description as string,
    });
    this.crawlConfigFG.get('meta.label').setValue(crawlConfig.meta.label);
    this.setSelectedDropdown();
  }

  ngOnChanges() {
    this.selectedPolitenessConfigItems = [];
    this.selectedBrowserConfigItems = [];

    // what the bug?! pre-filled radiobuttons aint working without this.
    setTimeout(() => {
      this.updateData(this.crawlConfig);
    });
  }


  createCrawlConfig() {
    this.crawlConfig = this.prepareSaveCrawlConfig();
    this.crawlConfigService.create(this.crawlConfig)
      .map((newCrawlConfig: CrawlConfig) => {
        this.createHandler(newCrawlConfig);
      });
    this.mdSnackBar.open('Lagret');
  }

  updateCrawlConfig(crawlConfigForm): void {
    this.crawlConfig = this.prepareSaveCrawlConfig();
    this.crawlConfigService.update(this.crawlConfig)
      .map((updatedCrawlConfig) => {
        this.updateHandler(updatedCrawlConfig);
      });
    this.mdSnackBar.open('Lagret');
  };

  deleteCrawlConfig(crawlConfigId): void {
    this.crawlConfigService.delete(crawlConfigId)
      .map((deletedCrawlConfig) => {
        this.deleteHandler(deletedCrawlConfig);
        if (deletedCrawlConfig === 'not_allowed') {
          this.mdSnackBar.open('Feil: Ikke slettet');
        } else {
          this.mdSnackBar.open('Slettet');
        }
      });
  }

  prepareSaveCrawlConfig(): CrawlConfig {
    const formModel = this.crawlConfigFG.value;
    const labelsDeepCopy = formModel.meta.label.map(label => ({...label}));

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    return {
      id: this.crawlConfig.id,
      browser_config_id: formModel.browser_config_id[0].id as string,
      politeness_id: formModel.politeness_id[0].id as string,
      extra: {
        extract_text: formModel.extra.extract_text as boolean,
        create_snapshot: formModel.extra.create_snapshot as boolean,
      },
      minimum_dns_ttl_s: formModel.minimum_dns_ttl_s as number,
      depth_first: formModel.depth_first as boolean,
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        label: labelsDeepCopy,

      }
    };
  }

  setSelectedDropdown() {
    if (this.crawlConfig.browser_config_id !== '') {
      this.browserConfigService
        .get(this.crawlConfig.browser_config_id)
        .subscribe(browserConfig => {
          this.selectedBrowserConfigItems.push({
            id: browserConfig.id,
            itemName: browserConfig.meta.name,
            description: browserConfig.meta.description
          })
        });
      this.crawlConfigFG.controls['browser_config_id'].setValue(this.selectedBrowserConfigItems);
    }

    if (this.crawlConfig.politeness_id !== '') {
      this.politenessConfigService.get(this.crawlConfig.politeness_id)
        .subscribe((politenessConfig) => {
          this.selectedPolitenessConfigItems.push({
            id: politenessConfig.id,
            itemName: politenessConfig.meta.name,
            description: politenessConfig.meta.description
          });
          this.crawlConfigFG.controls['politeness_id'].setValue(this.selectedPolitenessConfigItems);
        });
    }
  }

  fillDropdown() {
    this.browserConfigService.list()
      .map(reply => reply.value)
      .subscribe(browserConfigs => {
        browserConfigs.forEach((browserConfig) =>
          this.browserConfigList.push({
            id: browserConfig.id,
            itemName: browserConfig.meta.name,
            description: browserConfig.meta.description
          }));
      });

    this.politenessConfigService.list()
      .map(reply => reply.value)
      .subscribe(politenessConfigs => {
        politenessConfigs.forEach((politenessConfig) => {
          this.politenessConfigList.push({
            id: politenessConfig.id,
            itemName: politenessConfig.meta.name,
            description: politenessConfig.meta.description
          });
        });
      });

    this.dropdownPolitenessConfigSettings = {
      singleSelection: true,
      text: 'Velg Politeness',
      enableSearchFilter: true
    };

    this.dropdownBrowserConfigSettings = {
      singleSelection: true,
      text: 'Velg browserConfig',
      enableSearchFilter: true
    };
  }

  revert() {
    this.ngOnChanges();
    this.mdSnackBar.open('Tilbakestilt');
  }

}
