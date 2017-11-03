import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
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

  @Output()
  created = new EventEmitter<CrawlConfig>();
  @Output()
  updated = new EventEmitter<CrawlConfig>();
  @Output()
  deleted = new EventEmitter<CrawlConfig>();

  form: FormGroup;

  browserConfigList: any = [];
  selectedBrowserConfigItems = [];
  browserConfigDropdownSettings = {
    singleSelection: true,
    text: 'Velg browserConfig',
    enableSearchFilter: true
  };

  politenessConfigList: any = [];
  selectedPolitenessConfigItems = [];
  politenessConfigDropdownSettings = {
    singleSelection: true,
    text: 'Velg Politeness',
    enableSearchFilter: true
  };

  constructor(private crawlConfigService: CrawlConfigService,
              private politenessConfigService: PolitenessConfigService,
              private browserConfigService: BrowserConfigService,
              private fb: FormBuilder,
              private snackBarService: SnackBarService) {
    this.fillDropdown();
    this.createForm();
  }

  get name() {
    return this.form.get('meta.name');
  }

  get browserConfigId() {
    return this.form.get('browser_config_id');
  }

  get politenessId() {
    return this.form.get('politeness_id');
  }

  get minDnsTtlSeconds() {
    return this.form.get('minimum_dns_ttl_s');
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.crawlConfig.currentValue) {
      this.updateForm();
    }
  }

  onSave() {
    this.crawlConfig = this.prepareSave();
    this.crawlConfigService.create(this.crawlConfig)
      .subscribe(newCrawlConfig => {
        this.crawlConfig = newCrawlConfig;
        this.updateForm();
        this.created.emit(newCrawlConfig);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdate(): void {
    this.crawlConfig = this.prepareSave();
    this.crawlConfigService.update(this.crawlConfig)
      .subscribe(updatedCrawlConfig => {
        this.crawlConfig = updatedCrawlConfig;
        this.updateForm();
        this.updated.emit(updatedCrawlConfig);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onDelete(): void {
    this.crawlConfigService.delete(this.crawlConfig.id)
      .subscribe((response) => {
        this.deleted.emit(this.crawlConfig);
        this.crawlConfig = response;
        this.form.reset();
        this.snackBarService.openSnackBar('Slettet')
      });
  }

  onRevert() {
    this.updateForm();
    this.snackBarService.openSnackBar('Tilbakestilt');
  }

  private createForm() {
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

  private updateForm() {
    this.form.patchValue({
      id: this.crawlConfig.id,
      minimum_dns_ttl_s: this.crawlConfig.minimum_dns_ttl_s,
      depth_first: this.crawlConfig.depth_first,
      extra: {
        extract_text: this.crawlConfig.extra.extract_text,
        create_snapshot: this.crawlConfig.extra.create_snapshot,
      },
      meta: {
        name: this.crawlConfig.meta.name,
        description: this.crawlConfig.meta.description,
        label: [...this.crawlConfig.meta.label],
      },
    });
    this.setSelectedDropdown();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private prepareSave(): CrawlConfig {
    const formModel = this.form.value;
    const labelsDeepCopy = formModel.meta.label.map(label => ({...label}));
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

  private fillDropdown() {
    this.browserConfigService.list()
      .map(reply => reply.value)
      .subscribe(browserConfigs => {
        browserConfigs.forEach((browserConfig) =>
          this.browserConfigList.push({
            id: browserConfig.id,
            itemName: browserConfig.meta.name,
          }));
      });
    this.politenessConfigService.list()
      .map(reply => reply.value)
      .subscribe(politenessConfigs => {
        politenessConfigs.forEach((politenessConfig) => {
          this.politenessConfigList.push({
            id: politenessConfig.id,
            itemName: politenessConfig.meta.name,
          });
        });
      });
  }

  private setSelectedDropdown() {
    this.selectedBrowserConfigItems = [];
    this.selectedPolitenessConfigItems = [];
    if (this.crawlConfig.browser_config_id !== '') {
          this.browserConfigService.get(this.crawlConfig.browser_config_id)
        .subscribe(browserConfig => {
          this.selectedBrowserConfigItems.push({
            id: browserConfig.id,
            itemName: browserConfig.meta.name,
          });
          this.browserConfigId.setValue(this.selectedBrowserConfigItems);
        });
    }
    if (this.crawlConfig.politeness_id !== '') {
      this.politenessConfigService.get(this.crawlConfig.politeness_id)
        .subscribe((politenessConfig) => {
          this.selectedPolitenessConfigItems.push({
            id: politenessConfig.id,
            itemName: politenessConfig.meta.name,
          });
          this.politenessId.setValue(this.selectedPolitenessConfigItems);
        });
    }
  }
}
