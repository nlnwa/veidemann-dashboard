import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Crawlhostgroupconfig, IpRange} from '../crawlhostgroupconfig';
import {CrawlhostgroupconfigService} from '../crawlhostgroupconfig.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdSnackBar} from '@angular/material';
import {CustomValidators} from '../../../commons/customvalidators';
import {Label} from '../../../commons/models/label';


@Component({
  selector: 'app-crawlhostgroupconfig-details',
  templateUrl: './crawlhostgroupconfig-details.component.html',
  styleUrls: ['./crawlhostgroupconfig-details.component.css']
})
export class CrawlhostgroupconfigDetailsComponent implements OnChanges {
  @Input()
  crawlhostgroupconfig: Crawlhostgroupconfig;
  crawlhostgroupconfigForm: FormGroup;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private crawlhostgroupconfigService: CrawlhostgroupconfigService,
              private fb: FormBuilder,
              private mdlSnackBarService: MdlSnackBarService, ) {
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

  ngOnChanges() {
    this.setLabel(this.crawlhostgroupconfig.meta.label);
    this.setIpRange((this.crawlhostgroupconfig.ip_range));
    this.crawlhostgroupconfigForm.controls['meta'].patchValue({
      name: this.crawlhostgroupconfig.meta.name as string,
      description: this.crawlhostgroupconfig.meta.description as string,
    });
    console.log(this.crawlhostgroupconfigForm.controls);
  }

  createCrawlhostgroupconfig() {
    this.crawlhostgroupconfig = this.prepareSaveCrawlhostgroupconfig();
    this.crawlhostgroupconfigService.createCrawlhostgroupconfig(this.crawlhostgroupconfig).then(
      (newCrawlhostgroupconfig: Crawlhostgroupconfig) => {
        this.createHandler(newCrawlhostgroupconfig);
      });
    this.mdSnackBarService.showSnackbar(
      {
        message: 'Lagret'
      });
  };

  updateCrawlhostgroupconfig(crawlhostgroupconfigForm): void {
    this.crawlhostgroupconfig = this.prepareSaveCrawlhostgroupconfig();
    this.crawlhostgroupconfigService.updateCrawlhostgroupconfig(this.crawlhostgroupconfig)
      .then((updatedCrawlhostgroupconfig) => {
        this.updateHandler(updatedCrawlhostgroupconfig);
      });
    this.mdSnackBarService.showSnackbar(
      {
        message: 'Lagret',
      });
  };

  deleteCrawlhostgroupconfig(crawlhostgroupconfigId): void {
    this.crawlhostgroupconfigService.deleteCrawlhostgroupconfig(crawlhostgroupconfigId)
      .then((deletedCrawlhostgroupconfig) => {
        this.deleteHandler(deletedCrawlhostgroupconfig);
        if (deletedCrawlhostgroupconfig === 'not allowed') {
          this.mdSnackBarService.showSnackbar(
            {
              message: 'Feil: Ikke slettet',
            });
        } else {
          this.mdSnackBarService.showSnackbar(
            {
              message: 'Slettet',
            });
        }
      });
  };

  prepareSaveCrawlhostgroupconfig(): Crawlhostgroupconfig {
    const formModel = this.crawlhostgroupconfigForm.value;

    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

    const iprangeDeepCopy: IpRange[] = formModel.iprange.map(
      (iprange: IpRange) => Object.assign({}, iprange)
    );

    const saveCrawlhostgroupconfig: Crawlhostgroupconfig = {
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
    const labelFGs = label.map(label => (this.fb.group(label)));
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
    const ip_rangeFGs = ip_range.map( ip_range => (this.fb.group(ip_range)));
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
    this.mdSnackBarService.showSnackbar(
      {
        message: 'Tilbakestilt',
      });
  }

}
