import {Component, Input, OnChanges} from '@angular/core';
import {CrawlHostGroupConfig, IpRange} from '../crawlhostgroupconfig.model';
import {CrawlHostGroupConfigService} from '../crawlhostgroupconfig.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdSnackBar} from '@angular/material';
import {Label} from '../../../commons/models/label.model';


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
        label: this.fb.array([]),
      }),
    });
  }

  updateData(crawlHostGroupConfig: CrawlHostGroupConfig) {
    this.crawlHostGroupConfigFG.controls['meta'].patchValue({
      name: this.crawlHostGroupConfig.meta.name as string,
      description: this.crawlHostGroupConfig.meta.description as string,
    });
  }

  ngOnChanges() {
    this.setLabel(this.crawlHostGroupConfig.meta.label);
    this.setIpRange((this.crawlHostGroupConfig.ip_range));
    setTimeout(() => {
      this.updateData(this.crawlHostGroupConfig);
    });
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
    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

    const iprangeDeepCopy: IpRange[] = formModel.ip_range.map(
      (ipRange: IpRange) => Object.assign({}, ipRange)
    );

    return {
      id: this.crawlHostGroupConfig.id,
      ip_range: iprangeDeepCopy,
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        label: labelsDeepCopy
      }
    };
  }

  setLabel(label) {
    const labelFGs = label.map(lbl => (this.fb.group(lbl)));
    const labelFormArray = this.fb.array(labelFGs);
    this.crawlHostGroupConfigFG.setControl('label', labelFormArray);
  }

  addLabel() {
    const control = <FormArray>this.crawlHostGroupConfigFG.controls['label'];
    control.push(this.initLabel());
  }

  removeLabel(i: number) {
    const control = <FormArray>this.crawlHostGroupConfigFG.controls['label'];
    control.removeAt(i);
  }

  get label(): FormArray {
    return this.crawlHostGroupConfigFG.get('label') as FormArray;
  };

  initLabel() {
    return this.fb.group({
      key: ['', [Validators.required, Validators.minLength(2)]],
      value: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  setIpRange(ip_ranges) {
    const ip_rangeFGs = ip_ranges.map(ip_range => (this.fb.group(ip_range)));
    const ip_rangeFormArray = this.fb.array(ip_rangeFGs);
    this.crawlHostGroupConfigFG.setControl('ip_range', ip_rangeFormArray);
  }

  addIpRange() {
    const control = <FormArray>this.crawlHostGroupConfigFG.controls['ip_range'];
    control.push(this.initIpRange());
  }

  removeIpRange(i: number) {
    const control = <FormArray>this.crawlHostGroupConfigFG.controls['ip_range'];
    control.removeAt(i);
  }

  get ip_range(): FormArray {
    return this.crawlHostGroupConfigFG.get('ip_range') as FormArray;
  };

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
