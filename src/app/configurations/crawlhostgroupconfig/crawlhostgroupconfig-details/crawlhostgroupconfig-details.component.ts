import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CrawlHostGroupConfig, IpRange} from '../crawlhostgroupconfig.model';
import {CrawlhostgroupconfigService} from '../crawlhostgroupconfig.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdSnackBar} from '@angular/material';
import {Label} from '../../../commons/models/label.model';


@Component({
  selector: 'app-crawlhostgroupconfig-details',
  templateUrl: './crawlhostgroupconfig-details.component.html',
  styleUrls: ['./crawlhostgroupconfig-details.component.css']
})
export class CrawlhostgroupconfigDetailsComponent implements OnChanges {
  @Input()
  crawlhostgroupconfig: CrawlHostGroupConfig;
  crawlhostgroupconfigForm: FormGroup;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private crawlhostgroupconfigService: CrawlhostgroupconfigService,
              private fb: FormBuilder,
              private mdSnackBar: MdSnackBar) {
    this.createForm();
  }

  createForm() {
    this.crawlhostgroupconfigForm = this.fb.group({
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

  updateData(crawlhostgroupconfig: CrawlHostGroupConfig) {
    this.crawlhostgroupconfigForm.controls['meta'].patchValue({
      name: this.crawlhostgroupconfig.meta.name as string,
      description: this.crawlhostgroupconfig.meta.description as string,
    });
    console.log(this.crawlhostgroupconfigForm.controls);
  }

  ngOnChanges() {
    this.setLabel(this.crawlhostgroupconfig.meta.label);
    this.setIpRange((this.crawlhostgroupconfig.ip_range));
    setTimeout(() => {
      this.updateData(this.crawlhostgroupconfig);
    });
  }

  createCrawlhostgroupconfig() {
    this.crawlhostgroupconfig = this.prepareSaveCrawlhostgroupconfig();
    this.crawlhostgroupconfigService.createCrawlhostgroupconfig(this.crawlhostgroupconfig)
      .map(
        (newCrawlhostgroupconfig: CrawlHostGroupConfig) => {
          this.createHandler(newCrawlhostgroupconfig);
        });
    this.mdSnackBar.open('Lagret');
  };

  updateCrawlhostgroupconfig(crawlhostgroupconfigForm): void {
    this.crawlhostgroupconfig = this.prepareSaveCrawlhostgroupconfig();
    this.crawlhostgroupconfigService.updateCrawlhostgroupconfig(this.crawlhostgroupconfig)
      .map((updatedCrawlhostgroupconfig) => {
        this.updateHandler(updatedCrawlhostgroupconfig);
      });
    this.mdSnackBar.open('Lagret');
  };

  deleteCrawlhostgroupconfig(crawlhostgroupconfigId): void {
    this.crawlhostgroupconfigService.deleteCrawlhostgroupconfig(crawlhostgroupconfigId)
      .map((deletedCrawlhostgroupconfig) => {
        this.deleteHandler(deletedCrawlhostgroupconfig);
        if (deletedCrawlhostgroupconfig === 'not allowed') {
          this.mdSnackBar.open('Feil: Ikke slettet');
        } else {
          this.mdSnackBar.open('Slettet');
        }
      });
  };

  prepareSaveCrawlhostgroupconfig(): CrawlHostGroupConfig {
    const formModel = this.crawlhostgroupconfigForm.value;

    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

    const iprangeDeepCopy: IpRange[] = formModel.iprange.map(
      (iprange: IpRange) => Object.assign({}, iprange)
    );

    const saveCrawlhostgroupconfig: CrawlHostGroupConfig = {
      id: this.crawlhostgroupconfig.id,
      ip_range: iprangeDeepCopy,
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        label: labelsDeepCopy
      }
    };
    return saveCrawlhostgroupconfig;
  }

  setLabel(label) {
    const labelFGs = label.map(lbl => (this.fb.group(lbl)));
    const labelFormArray = this.fb.array(labelFGs);
    this.crawlhostgroupconfigForm.setControl('label', labelFormArray);
  }

  addLabel() {
    const control = <FormArray>this.crawlhostgroupconfigForm.controls['label'];
    control.push(this.initLabel());
  }

  removeLabel(i: number) {
    const control = <FormArray>this.crawlhostgroupconfigForm.controls['label'];
    control.removeAt(i);
  }

  get label(): FormArray {
    return this.crawlhostgroupconfigForm.get('label') as FormArray;
  };

  initLabel() {
    return this.fb.group({
      key: ['', [Validators.required, Validators.minLength(2)]],
      value: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  setIpRange(ip_range) {
    const ip_rangeFGs = ip_range.map(ip_range => (this.fb.group(ip_range)));
    const ip_rangeFormArray = this.fb.array(ip_rangeFGs);
    this.crawlhostgroupconfigForm.setControl('ip_range', ip_rangeFormArray);
  }

  addIpRange() {
    const control = <FormArray>this.crawlhostgroupconfigForm.controls['ip_range'];
    control.push(this.initIpRange());
  }

  removeIpRange(i: number) {
    const control = <FormArray>this.crawlhostgroupconfigForm.controls['ip_range'];
    control.removeAt(i);
  }

  get ip_range(): FormArray {
    return this.crawlhostgroupconfigForm.get('ip_range') as FormArray;
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
