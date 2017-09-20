import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Crawlhostgroupconfig, IpRange} from '../crawlhostgroupconfig';
import {CrawlhostgroupconfigService} from '../crawlhostgroupconfig.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdlSnackbarService} from 'angular2-mdl';
import {CustomValidators} from '../../../commons/components/customvalidators';
import {Label} from '../../../commons/models/label';


@Component({
  selector: 'crawlhostgroupconfig-details',
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
              private mdlSnackbarService: MdlSnackbarService, ) {
    this.createForm();
  }

  createForm() {
    this.crawlhostgroupconfigForm = this.fb.group({
      id: {value: '', disabled: true},
      iprange: this.fb.array([]),
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
    this.setIpRange((this.crawlhostgroupconfig.iprange));
  }

  createCrawlhostgroupconfig() {
    this.crawlhostgroupconfig = this.prepareSaveCrawlhostgroupconfig();
    this.crawlhostgroupconfigService.createCrawlhostgroupconfig(this.crawlhostgroupconfig).then(
      (newCrawlhostgroupconfig: Crawlhostgroupconfig) => {
        this.createHandler(newCrawlhostgroupconfig);
      });
    this.mdlSnackbarService.showSnackbar(
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
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
  };

  deleteCrawlhostgroupconfig(crawlhostgroupconfigId): void {
    this.crawlhostgroupconfigService.deleteCrawlhostgroupconfig(crawlhostgroupconfigId)
      .then((deletedCrawlhostgroupconfig) => {
        this.deleteHandler(deletedCrawlhostgroupconfig);
        if (deletedCrawlhostgroupconfig === 'not allowed') {
          this.mdlSnackbarService.showSnackbar(
            {
              message: 'Feil: Ikke slettet',
            });
        } else {
          this.mdlSnackbarService.showSnackbar(
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
      iprange: iprangeDeepCopy,
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

  setIpRange(iprange) {
    const iprangeFGs = iprange.map( iprange => (this.fb.group(iprange)));
    const iprangeFormArray = this.fb.array(iprangeFGs);
    this.crawlhostgroupconfigForm.setControl('iprange', iprangeFormArray);
  }
  addIpRange() {
    const control = <FormArray>this.crawlhostgroupconfigForm.controls['iprange'];
    control.push(this.initIpRange());
  }

  removeIpRange(i: number) {
    const control = <FormArray>this.crawlhostgroupconfigForm.controls['iprange'];
    control.removeAt(i);
  }

  get ipRange(): FormArray {
    return this.crawlhostgroupconfigForm.get('iprange') as FormArray;
  };

  initIpRange() {
    return this.fb.group({
      from_ip: ['10.0.0.1', [Validators.required, Validators.pattern(
        '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')]],
      to_ip: ['10.0.0.2', [Validators.required, Validators.pattern(
        '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')]],
    });
  }

  revert() {
    this.ngOnChanges();
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Tilbakestilt',
      });
  }

}
