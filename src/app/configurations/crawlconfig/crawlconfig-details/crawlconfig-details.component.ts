import {Component, Input, OnChanges} from '@angular/core';
import {PolitenessConfigService} from '../../politenessconfig/';
import {BrowserConfigService} from '../../browserconfig/';
import {CustomValidators} from '../../../commons/';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrawlConfigService} from '../crawlconfig.service';
import {CrawlConfig} from '../../../commons/models/config.model';
import {SnackBarService} from '../../../snack-bar-service/snack-bar.service';


@Component({
  selector: 'app-crawlconfig-details',
  templateUrl: './crawlconfig-details.component.html',
  styleUrls: ['./crawlconfig-details.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class CrawlConfigDetailsComponent implements OnChanges {
  @Input()
  crawlConfig: CrawlConfig;
  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  form: FormGroup;

  browserConfigList: any = [];
  politenessConfigList: any = [];
  selectedBrowserConfigItems = [];
  dropdownBrowserConfigSettings = {};
  dropdownPolitenessConfigSettings = {};
  selectedPolitenessConfigItems = [];

  constructor(private crawlConfigService: CrawlConfigService,
              private politenessConfigService: PolitenessConfigService,
              private browserConfigService: BrowserConfigService,
              private fb: FormBuilder,
              private snackBarService: SnackBarService) {
    this.fillDropdown();
    this.createForm();
  }


  createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      browser_config_id: ['', CustomValidators.nonEmpty],
      politeness_id: ['', CustomValidators.nonEmpty],
      extra: this.fb.group({
        extract_text: '',
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
    this.form.controls['id'].setValue(crawlConfig.id);
    this.form.controls['extra'].setValue({
      extract_text: crawlConfig.extra.extract_text as boolean,
      create_snapshot: crawlConfig.extra.create_snapshot as boolean,
    });
    this.form.controls['minimum_dns_ttl_s'].setValue(crawlConfig.minimum_dns_ttl_s);
    this.form.controls['depth_first'].setValue(crawlConfig.depth_first as boolean);
    this.form.controls['meta'].patchValue({
      name: crawlConfig.meta.name as string,
      description: crawlConfig.meta.description as string,
      label: [...crawlConfig.meta.label],
    });
    this.setSelectedDropdown();
    this.form.markAsPristine();
  }

  ngOnChanges() {
    this.selectedPolitenessConfigItems = [];
    this.selectedBrowserConfigItems = [];
    this.updateData(this.crawlConfig);
  }


  createCrawlConfig() {
    this.crawlConfig = this.prepareSaveCrawlConfig();
    this.crawlConfigService.create(this.crawlConfig)
      .subscribe((newCrawlConfig: CrawlConfig) => {
        this.createHandler(newCrawlConfig);
      });
    this.snackBarService.openSnackBar('Lagret');
  }

  updateCrawlConfig(crawlConfigForm): void {
    this.crawlConfig = this.prepareSaveCrawlConfig();
    this.crawlConfigService.update(this.crawlConfig)
      .subscribe((updatedCrawlConfig) => {
        this.updateHandler(updatedCrawlConfig);
      });
    this.snackBarService.openSnackBar('Lagret');
  };

  deleteCrawlConfig(crawlConfigId): void {
    this.crawlConfigService.delete(crawlConfigId)
      .subscribe((response) => {
        this.deleteHandler(crawlConfigId);
        if (response instanceof Object) {
          this.snackBarService.openSnackBar('Feil: Ikke slettet');
        } else {
          this.snackBarService.openSnackBar('Slettet');
        }
      });
  }

  prepareSaveCrawlConfig(): CrawlConfig {
    const formModel = this.form.value;
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
      minimum_dns_ttl_s: parseInt(formModel.minimum_dns_ttl_s, 10),
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
          });
          this.form.controls['browser_config_id'].setValue(this.selectedBrowserConfigItems);
        });
    }

    if (this.crawlConfig.politeness_id !== '') {
      this.politenessConfigService.get(this.crawlConfig.politeness_id)
        .subscribe((politenessConfig) => {
          this.selectedPolitenessConfigItems.push({
            id: politenessConfig.id,
            itemName: politenessConfig.meta.name,
            description: politenessConfig.meta.description
          });
          this.form.controls['politeness_id'].setValue(this.selectedPolitenessConfigItems);
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
    this.snackBarService.openSnackBar('Tilbakestilt');
  }

}
