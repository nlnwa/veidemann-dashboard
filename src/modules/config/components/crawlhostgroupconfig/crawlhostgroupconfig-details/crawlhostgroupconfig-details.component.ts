import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {CrawlHostGroupConfigIpValidation} from './crawlhostgroupconfig-ipvalidation';
import {ConfigObject, CrawlHostGroupConfig, Kind, Meta} from '../../../../../shared/models';
import {IpRange} from '../../../../../shared/models/config/ip-range.model';
import {DECIMAL_NUMBER_OR_EMPTY_STRING, NUMBER_OR_EMPTY_STRING} from '../../../../../shared/validation/patterns';
import { UnitOfTime } from 'src/shared/models/duration/unit-time.model';

@Component({
  selector: 'app-crawlhostgroupconfig-details',
  templateUrl: './crawlhostgroupconfig-details.component.html',
  styleUrls: ['./crawlhostgroupconfig-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlHostGroupConfigDetailsComponent implements OnChanges {
  readonly UnitOfTime = UnitOfTime;

  @Input()
  configObject: ConfigObject;

  @Output()
  save = new EventEmitter<ConfigObject>();

  @Output()
  update = new EventEmitter<ConfigObject>();

  @Output()
  delete = new EventEmitter<ConfigObject>();

  form: FormGroup;

  constructor(protected fb: FormBuilder,
              protected authService: AuthService) {
    this.createForm();
  }

  get canEdit(): boolean {
    return this.authService.canUpdate(this.configObject.kind);
  }

  get canDelete(): boolean {
    return this.authService.canDelete(this.configObject.kind);
  }

  get showSave(): boolean {
    return this.configObject && !this.configObject.id;
  }

  get canSave(): boolean {
    return this.form.valid
      && (this.ipRangeControlArray.controls.length < 1 || CrawlHostGroupConfigIpValidation.allRangesValid());
  }

  get canUpdate(): boolean {
    return this.form.valid
      && this.form.dirty
      && (this.ipRangeControlArray.controls.length < 1 || CrawlHostGroupConfigIpValidation.allRangesValid());
  }

  get canRevert(): boolean {
    return this.form.dirty;
  }

  get name(): string {
    return this.form.get('meta').value.name;
  }

  get ipRangeControlArray(): FormArray {
    return this.form.get('ipRangeList') as FormArray;
  }

  get minTimeBetweenPageloadMs(): AbstractControl {
    return this.form.get('minTimeBetweenPageLoadMs');
  }

  get maxTimeBetweenPageloadMs(): AbstractControl {
    return this.form.get('maxTimeBetweenPageLoadMs');
  }

  get delayFactor(): AbstractControl {
    return this.form.get('delayFactor');
  }

  get maxRetries(): AbstractControl {
    return this.form.get('maxRetries');
  }

  get retryDelaySeconds(): AbstractControl {
    return this.form.get('retryDelaySeconds');
  }

  ipFromControl(index: number): AbstractControl {
    return this.form.get(['ipRangeList', index, 'ipFrom']);
  }

  ipToControl(index: number): AbstractControl {
    return this.form.get(['ipRangeList', index, 'ipTo']);

  }

  isValidIpRange(fromIp: string, toIp: string): boolean {
    return CrawlHostGroupConfigIpValidation.isValidRange(fromIp, toIp);
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.configObject) {
      if (!this.configObject) {
        this.form.reset();
      } else {
        this.updateForm();
      }
    }
  }

  onSave() {
    this.save.emit(this.prepareSave());
  }

  onUpdate(): void {
    this.update.emit(this.prepareSave());
  }

  onDelete(): void {
    this.delete.emit(this.configObject);
  }

  onRevert() {
    this.updateForm();
  }

  onAddIpRange() {
    this.ipRangeControlArray.push(this.initIpRange());
  }

  onRemoveIpRange(i: number) {
    this.ipRangeControlArray.removeAt(i);
    this.form.markAsDirty();
  }

  protected createForm() {
    this.form = this.fb.group({
      id: '',
      ipRangeList: this.fb.array([]),
      minTimeBetweenPageLoadMs: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      maxTimeBetweenPageLoadMs: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      delayFactor: ['', [Validators.pattern(DECIMAL_NUMBER_OR_EMPTY_STRING)]],
      maxRetries: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      retryDelaySeconds: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      meta: new Meta(),
    });
  }

  protected updateForm() {
    const ipRangeFG: FormGroup[] = this.configObject.crawlHostGroupConfig.ipRangeList
      .map(ipRangeList => this.fb.group(ipRangeList));

    const ipRangeFGArray: FormArray = this.fb.array(ipRangeFG);
    if (this.form.disabled) {
      ipRangeFGArray.disable();
    }
    this.form.patchValue({
      id: this.configObject.id,
      minTimeBetweenPageLoadMs: this.configObject.crawlHostGroupConfig.minTimeBetweenPageLoadMs || '',
      maxTimeBetweenPageLoadMs: this.configObject.crawlHostGroupConfig.maxTimeBetweenPageLoadMs || '',
      delayFactor: this.configObject.crawlHostGroupConfig.delayFactor || '',
      maxRetries: this.configObject.crawlHostGroupConfig.maxRetries || '',
      retryDelaySeconds: this.configObject.crawlHostGroupConfig.retryDelaySeconds || '',
      meta: this.configObject.meta,
    });
    this.form.setControl('ipRangeList', ipRangeFGArray);
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  protected prepareSave(): ConfigObject {
    const formModel = this.form.value;

    const configObject = new ConfigObject({kind: Kind.CRAWLHOSTGROUPCONFIG});
    if (this.configObject.id !== '') {
      configObject.id = this.configObject.id;
    }

    const crawlHostGroupConfig = new CrawlHostGroupConfig();
    crawlHostGroupConfig.ipRangeList = formModel.ipRangeList
      .map(ipRange => new IpRange({ipFrom: ipRange.ipFrom, ipTo: ipRange.ipTo}));
    crawlHostGroupConfig.minTimeBetweenPageLoadMs = parseInt(formModel.minTimeBetweenPageLoadMs, 10) || 0;
    crawlHostGroupConfig.maxTimeBetweenPageLoadMs = parseInt(formModel.maxTimeBetweenPageLoadMs, 10) || 0;
    crawlHostGroupConfig.delayFactor = parseFloat(formModel.delayFactor) || 0;
    crawlHostGroupConfig.maxRetries = parseInt(formModel.maxRetries, 10) || 0;
    crawlHostGroupConfig.retryDelaySeconds = parseInt(formModel.retryDelaySeconds, 10) || 0;

    configObject.meta = formModel.meta;
    configObject.crawlHostGroupConfig = crawlHostGroupConfig;

    return configObject;

  }

  private initIpRange() {
    return this.fb.group({
      ipFrom: ['', [CrawlHostGroupConfigIpValidation.ipAddressValidator]],
      ipTo: ['', [CrawlHostGroupConfigIpValidation.ipAddressValidator]],
    });
  }
}

