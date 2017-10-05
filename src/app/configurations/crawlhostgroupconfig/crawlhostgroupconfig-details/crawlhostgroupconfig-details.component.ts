import {Component, Input, OnChanges} from '@angular/core';
import {CrawlHostGroupConfigService} from '../crawlhostgroupconfig.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrawlHostGroupConfig, IpRange, Label} from '../../../commons/models/config.model';
import {SnackBarService} from '../../../snack-bar-service/snack-bar.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-crawlhostgroupconfig-details',
  templateUrl: './crawlhostgroupconfig-details.component.html',
  styleUrls: ['./crawlhostgroupconfig-details.component.css'],
  providers: [SnackBarService],
})
export class CrawlHostGroupConfigDetailsComponent implements OnChanges {
  @Input()
  crawlHostGroupConfig: CrawlHostGroupConfig;
  crawlHostGroupConfigFG: FormGroup;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  get name() {
    return this.crawlHostGroupConfigFG.get('meta.name');
  }

  get ipFromControl () {
    return this.crawlHostGroupConfigFG.get('ip_range.ip_from');
  }

  get ipToControl () {
    return this.crawlHostGroupConfigFG.get('ip_range.ip_to');
  }

  get ipRangeControlArray() {
    return <FormArray>this.crawlHostGroupConfigFG.get('ip_range');
  }

  constructor(private crawlHostGroupConfigService: CrawlHostGroupConfigService,
              private fb: FormBuilder,
              private snackBarService: SnackBarService) {
    this.createForm();
  }

  ngOnChanges() {
    setTimeout(() => {
      this.updateData(this.crawlHostGroupConfig);
    });
  }

  createForm() {
    this.crawlHostGroupConfigFG = this.fb.group({
      id: {value: '', disabled: true},
      ip_range: this.fb.array([]),
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

  updateData(crawlHostGroupConfig: CrawlHostGroupConfig) {
    const ipRangeFG: FormGroup[] = crawlHostGroupConfig.ip_range.map(ipRange => this.fb.group(ipRange));
    const ipRangeFGArray: FormArray = this.fb.array(ipRangeFG);

    this.crawlHostGroupConfigFG.patchValue({
      id: crawlHostGroupConfig.id,
      meta: {
        name: this.crawlHostGroupConfig.meta.name,
        description: this.crawlHostGroupConfig.meta.description,
        label: crawlHostGroupConfig.meta.label,
      }
    });
    this.crawlHostGroupConfigFG.setControl('ip_range', ipRangeFGArray);
  }

  createCrawlHostGroupConfig() {
    this.crawlHostGroupConfig = this.prepareSaveCrawlHostGroupConfig();
    this.crawlHostGroupConfigService.create(this.crawlHostGroupConfig)
      .subscribe(
        (crawlHostGroupConfig: CrawlHostGroupConfig) => {
          this.createHandler(crawlHostGroupConfig);
        });
    this.snackBarService.openSnackBar('Lagret');
  };

  updateCrawlHostGroupConfig(crawlHostGroupConfigForm): void {
    this.crawlHostGroupConfig = this.prepareSaveCrawlHostGroupConfig();
    this.crawlHostGroupConfigService.update(this.crawlHostGroupConfig)
      .subscribe((updatedCrawlHostGroupConfig) => {
        this.updateHandler(updatedCrawlHostGroupConfig);
      });
    this.snackBarService.openSnackBar('Lagret');
  };

  deleteCrawlHostGroupConfig(crawlHostGroupConfigId): void {
    this.crawlHostGroupConfigService.delete(crawlHostGroupConfigId)
      .subscribe((response) => {
        this.deleteHandler(crawlHostGroupConfigId);
        if (response instanceof Object) {
          this.snackBarService.openSnackBar('Feil: Ikke slettet');
        } else {
          this.snackBarService.openSnackBar('Slettet');
        }
      });
  };

  prepareSaveCrawlHostGroupConfig(): CrawlHostGroupConfig {
    const formModel = this.crawlHostGroupConfigFG.value;

    const iprangeDeepCopy: IpRange[] = formModel.ip_range.map(ipRange => ({...ipRange}));
    const labelsDeepCopy = formModel.meta.label.map(label => ({...label}));
    return {
      id: this.crawlHostGroupConfig.id,
      ip_range: iprangeDeepCopy,
      meta: {
        name: formModel.meta.name,
        description: formModel.meta.description,
        label: labelsDeepCopy,
      }
    };
  }

  addIpRange() {
    this.ipRangeControlArray.push(this.initIpRange());
  }

  removeIpRange(i: number) {
    const control = <FormArray>this.crawlHostGroupConfigFG.controls['ip_range'];
    this.ipRangeControlArray.removeAt(i);
  }

  initIpRange() {
    return this.fb.group({
      ip_from: ['', [Validators.required, Validators.pattern(
        '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')]],
      ip_to: ['', [Validators.required, Validators.pattern(
        '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')]],
    });
  }

  revert() {
    this.ngOnChanges();
    this.snackBarService.openSnackBar('Tilbakestilt');
  }

}
