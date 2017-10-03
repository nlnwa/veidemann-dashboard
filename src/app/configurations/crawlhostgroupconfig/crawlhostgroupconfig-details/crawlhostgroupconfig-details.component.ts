import {Component, Input, OnChanges} from '@angular/core';
import {CrawlHostGroupConfigService} from '../crawlhostgroupconfig.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdSnackBar} from '@angular/material';
import {CrawlHostGroupConfig, IpRange, Label} from '../../../commons/models/config.model';


@Component({
  selector: 'app-crawlhostgroupconfig-details',
  templateUrl: './crawlhostgroupconfig-details.component.html',
  styleUrls: ['./crawlhostgroupconfig-details.component.css']
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

  constructor(private crawlHostGroupConfigService: CrawlHostGroupConfigService,
              private fb: FormBuilder,
              private mdSnackBar: MdSnackBar) {
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

    this.crawlHostGroupConfigFG.setControl('ip_range', ipRangeFGArray);
    this.crawlHostGroupConfigFG.controls['meta'].patchValue({
      name: this.crawlHostGroupConfig.meta.name as string,
      description: this.crawlHostGroupConfig.meta.description as string,
    });

    this.crawlHostGroupConfigFG.get('meta.label').setValue(crawlHostGroupConfig.meta.label);
  }


  createCrawlHostGroupConfig() {
    this.crawlHostGroupConfig = this.prepareSaveCrawlHostGroupConfig();
    this.crawlHostGroupConfigService.create(this.crawlHostGroupConfig)
      .subscribe(
        (crawlHostGroupConfig: CrawlHostGroupConfig) => {
          this.createHandler(crawlHostGroupConfig);
        });
    this.mdSnackBar.open('Lagret');
  };

  updateCrawlHostGroupConfig(crawlHostGroupConfigForm): void {
    this.crawlHostGroupConfig = this.prepareSaveCrawlHostGroupConfig();
    this.crawlHostGroupConfigService.update(this.crawlHostGroupConfig)
      .subscribe((updatedCrawlHostGroupConfig) => {
        this.updateHandler(updatedCrawlHostGroupConfig);
      });
    this.mdSnackBar.open('Lagret');
  };

  deleteCrawlHostGroupConfig(crawlHostGroupConfigId): void {
    this.crawlHostGroupConfigService.delete(crawlHostGroupConfigId)
      .subscribe((response) => {
        this.deleteHandler(response);
        if (response === 'not allowed') {
          this.mdSnackBar.open('Feil: Ikke slettet');
        } else {
          this.mdSnackBar.open('Slettet');
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
    const control = <FormArray>this.crawlHostGroupConfigFG.controls['ip_range'];
    control.push(this.initIpRange());
  }

  removeIpRange(i: number) {
    const control = <FormArray>this.crawlHostGroupConfigFG.controls['ip_range'];
    control.removeAt(i);
  }

  get ip_ranges(): FormArray {
    return this.crawlHostGroupConfigFG.get('ip_range') as FormArray;
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
    this.mdSnackBar.open('Tilbakestilt');
  }

}
