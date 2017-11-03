import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CrawlHostGroupConfigService} from '../crawlhostgroupconfig.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrawlHostGroupConfig, IpRange} from '../../../commons/models/config.model';
import {SnackBarService} from '../../../snack-bar-service/snack-bar.service';
import {VALID_IP_PATTERN} from '../../../commons/util';


@Component({
  selector: 'app-crawlhostgroupconfig-details',
  templateUrl: './crawlhostgroupconfig-details.component.html',
  styleUrls: ['./crawlhostgroupconfig-details.component.css'],
})
export class CrawlHostGroupConfigDetailsComponent implements OnChanges {

  @Input()
  crawlHostGroupConfig: CrawlHostGroupConfig;

  @Output()
  created = new EventEmitter<CrawlHostGroupConfig>();
  @Output()
  updated = new EventEmitter<CrawlHostGroupConfig>();
  @Output()
  deleted = new EventEmitter<CrawlHostGroupConfig>();

  form: FormGroup;

  constructor(private crawlHostGroupConfigService: CrawlHostGroupConfigService,
              private fb: FormBuilder,
              private snackBarService: SnackBarService) {
    this.createForm();
  }

  get name() {
    return this.form.get('meta.name');
  }

  get ipFromControl() {
    return this.form.get('ip_range.ip_from');
  }

  get ipToControl() {
    return this.form.get('ip_range.ip_to');
  }

  get ipRangeControlArray() {
    return <FormArray>this.form.get('ip_range');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.crawlHostGroupConfig.currentValue) {
      this.updateForm();
    }
  }

  onSave() {
    this.crawlHostGroupConfig = this.prepareSave();
    this.crawlHostGroupConfigService.create(this.crawlHostGroupConfig)
      .subscribe((newCrawlHostGroupConfig) => {
        this.crawlHostGroupConfig = newCrawlHostGroupConfig;
        this.updateForm();
        this.created.emit(newCrawlHostGroupConfig);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdate(): void {
    this.crawlHostGroupConfig = this.prepareSave();
    this.crawlHostGroupConfigService.update(this.crawlHostGroupConfig)
      .subscribe((updatedCrawlHostGroupConfig) => {
        this.crawlHostGroupConfig = updatedCrawlHostGroupConfig;
        this.updateForm();
        this.updated.emit(updatedCrawlHostGroupConfig);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onDelete(): void {
    this.crawlHostGroupConfigService.delete(this.crawlHostGroupConfig.id)
      .subscribe((response) => {
        this.deleted.emit(this.crawlHostGroupConfig);
        this.crawlHostGroupConfig = response;
        this.form.reset();
        this.snackBarService.openSnackBar('Slettet');
      });
  }

  onRevert() {
    this.updateForm();
    this.snackBarService.openSnackBar('Tilbakestilt');
  }

  onAddIpRange() {
    this.ipRangeControlArray.push(this.initIpRange());
  }

  onRemoveIpRange(i: number) {
    this.ipRangeControlArray.removeAt(i);
  }

  private createForm() {
    this.form = this.fb.group({
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

  private updateForm() {
    const ipRangeFG: FormGroup[] = this.crawlHostGroupConfig.ip_range.map(ipRange => this.fb.group(ipRange));
    const ipRangeFGArray: FormArray = this.fb.array(ipRangeFG);

    this.form.patchValue({
      id: this.crawlHostGroupConfig.id,
      meta: {
        name: this.crawlHostGroupConfig.meta.name,
        description: this.crawlHostGroupConfig.meta.description,
        label: [...this.crawlHostGroupConfig.meta.label],
      }
    });
    this.form.setControl('ip_range', ipRangeFGArray);
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private prepareSave(): CrawlHostGroupConfig {
    const formModel = this.form.value;

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

  private initIpRange() {
    return this.fb.group({
      ip_from: ['', [Validators.required, Validators.pattern(VALID_IP_PATTERN)]],
      ip_to: ['', [Validators.required, Validators.pattern(VALID_IP_PATTERN)]],
    });
  }

}
