import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrawlHostGroupConfig, IpRange, Meta} from '../../../commons/models/config.model';
import {VALID_IP_PATTERN} from '../../../commons/validator';
import {RoleService} from '../../../auth';


@Component({
  selector: 'app-crawlhostgroupconfig-details',
  templateUrl: './crawlhostgroupconfig-details.component.html',
  styleUrls: ['./crawlhostgroupconfig-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlHostGroupConfigDetailsComponent implements OnChanges {

  @Input()
  crawlHostGroupConfig: CrawlHostGroupConfig;

  @Output()
  save = new EventEmitter<CrawlHostGroupConfig>();
  @Output()
  update = new EventEmitter<CrawlHostGroupConfig>();
  @Output()
  delete = new EventEmitter<CrawlHostGroupConfig>();

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm();
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  get showSave(): boolean {
    return this.crawlHostGroupConfig && !this.crawlHostGroupConfig.id
  }

  get canSave(): boolean {
    console.log(this.form.valid, this.form.get('meta').valid);
    return this.form.valid;
  }

  get canUpdate() {
    return (this.form.valid && this.form.dirty);
  }

  get canRevert() {
    return this.form.dirty;
  }

  get name() {
    return this.form.get('meta').value.name;
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
    if (changes.crawlHostGroupConfig && !changes.crawlHostGroupConfig.currentValue) {
      this.form.reset();
      return;
    }
    if (this.crawlHostGroupConfig) {
      this.updateForm();
    }
  }

  onSave() {
    this.save.emit(this.prepareSave());
  }

  onUpdate(): void {
    this.update.emit(this.prepareSave());
  }

  onDelete(): void {
    this.delete.emit(this.crawlHostGroupConfig);
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

  private createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      ip_range: this.fb.array([]),
      meta: new Meta(),
    });

    if (!this.canEdit) {
      this.form.disable();
    }
  }

  private updateForm() {
    const ipRangeFG: FormGroup[] = this.crawlHostGroupConfig.ip_range.map(ipRange => this.fb.group(ipRange));
    const ipRangeFGArray: FormArray = this.fb.array(ipRangeFG);
    if (this.form.disabled) {
      ipRangeFGArray.disable();
    }
    this.form.patchValue({
      id: this.crawlHostGroupConfig.id,
      meta: this.crawlHostGroupConfig.meta,
    });
    this.form.setControl('ip_range', ipRangeFGArray);
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private prepareSave(): CrawlHostGroupConfig {
    const formModel = this.form.value;
    const iprangeDeepCopy: IpRange[] = formModel.ip_range.map(ipRange => ({...ipRange}));
    return {
      id: this.crawlHostGroupConfig.id,
      ip_range: iprangeDeepCopy,
      meta: formModel.meta,
    };
  }

  private initIpRange() {
    return this.fb.group({
      ip_from: ['', [Validators.required, Validators.pattern(VALID_IP_PATTERN)]],
      ip_to: ['', [Validators.required, Validators.pattern(VALID_IP_PATTERN)]],
    });
  }

}
