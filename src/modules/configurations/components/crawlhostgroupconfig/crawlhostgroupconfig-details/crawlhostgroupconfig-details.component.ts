import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {RoleService} from '../../../../core/services/auth';
import {CrawlHostGroupConfigIpValidation} from './crawlhostgroupconfig-ipvalidation';
import {ConfigObject, CrawlHostGroupConfig, Kind, Meta} from '../../../../commons/models';
import {IpRange} from '../../../../commons/models/configs/ip-range.model';

@Component({
  selector: 'app-crawlhostgroupconfig-details',
  templateUrl: './crawlhostgroupconfig-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlHostGroupConfigDetailsComponent implements OnChanges {

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
              protected roleService: RoleService) {
    this.createForm();
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
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
    return <FormArray>this.form.get('ipRangeList');
  }

  ipFromControl(index: number): AbstractControl {
    return this.form.get(['ipRangeList', index, 'ipFrom']);
  }

  ipToControl(index: number): AbstractControl {
    return this.form.get(['ipRangeList', index, 'ipTo']);

  }

  isValidIpRange(from_ip, to_ip): boolean {
    return CrawlHostGroupConfigIpValidation.isValidRange(from_ip, to_ip);
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
      id: {value: ''},
      ipRangeList: this.fb.array([]),
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

