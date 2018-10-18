import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Label, Meta, PolitenessConfig} from '../../../commons/models/config.model';
import {RoleService} from '../../../auth/role.service';
import {NUMBER_OR_EMPTY_STRING} from '../../../commons/validator/patterns';

@Component({
  selector: 'app-politenessconfig-details',
  templateUrl: './politenessconfig-details.component.html',
  styleUrls: ['./politenessconfig-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PolitenessconfigDetailsComponent implements OnChanges {

  @Input()
  set data(show) {
    this.shouldShow = show;
  }

  @Input()
  politenessConfig: PolitenessConfig;
  @Input()
  robotsPolicies: string[];
  @Input()
  equalRobotPolicy: boolean;

  @Output()
  save = new EventEmitter<PolitenessConfig>();
  @Output()
  update = new EventEmitter<PolitenessConfig>();
  @Output()
  delete = new EventEmitter<PolitenessConfig>();

  form: FormGroup;
  robotsPolicyList: any[];
  shouldShow = true;

  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm({
      id: {value: '', disabled: true},
      robots_policy: [''],
      minimum_robots_validity_duration_s: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      custom_robots: null,
      min_time_between_page_load_ms: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      max_time_between_page_load_ms: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      delay_factor: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      max_retries: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      retry_delay_seconds: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      crawl_host_group_selector: '',
      meta: new Meta(),
    });
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin();
  }

  get showSave(): boolean {
    return (this.politenessConfig && !this.politenessConfig.id);
  }

  get canSave() {
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

  get robotsPolicy() {
    return this.form.get('robots_policy');
  }

  get customRobots() {
    return this.form.get('custom_robots');
  }

  get minRobotsValidDurationSec() {
    return this.form.get('minimum_robots_validity_duration_s');
  }

  get minTimeBetweenPageloadMs() {
    return this.form.get('min_time_between_page_load_ms');
  }

  get maxTimeBetweenPageloadMs() {
    return this.form.get('max_time_between_page_load_ms');
  }

  get delayFactor() {
    return this.form.get('delay_factor');
  }

  get maxRetries() {
    return this.form.get('max_retries');
  }

  get retryDelaySeconds() {
    return this.form.get('retry_delay_seconds');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.politenessConfig && !changes.politenessConfig.currentValue) {
      this.form.reset();
      return;
    }
    if (changes.robotsPolicies && changes.robotsPolicies.currentValue) {
      this.robotsPolicyList = changes.robotsPolicies.currentValue;
    }
    if (this.politenessConfig && this.robotsPolicyList) {
      this.updateForm();
    }
  }

  shouldDisableRobotPolicy() {
    if (this.equalRobotPolicy !== undefined && !this.shouldShow) {
      if (!this.equalRobotPolicy) {
        this.robotsPolicy.disable();
      }
    }
  }

  onEnableRobotsPolicy() {
    if (this.robotsPolicy.disabled) {
      this.robotsPolicy.enable();
    }
  }

  onSave() {
    this.save.emit(this.prepareSave());
  }

  onUpdate(): void {
    this.update.emit(this.prepareSave());
  }

  onDelete() {
    this.delete.emit(this.politenessConfig);
  }

  onRevert() {
    this.updateForm();
  }

  private createForm(controlsConfig: object) {
    this.form = this.fb.group(controlsConfig);
  }

  updateForm() {
    this.form.patchValue({
      id: this.politenessConfig.id,
      robots_policy: this.politenessConfig.robots_policy || this.robotsPolicies[0],
      minimum_robots_validity_duration_s: this.politenessConfig.minimum_robots_validity_duration_s || '',
      custom_robots: this.politenessConfig.custom_robots,
      min_time_between_page_load_ms: this.politenessConfig.min_time_between_page_load_ms || '',
      max_time_between_page_load_ms: this.politenessConfig.max_time_between_page_load_ms || '',
      delay_factor: this.politenessConfig.delay_factor || '',
      max_retries: this.politenessConfig.max_retries || '',
      retry_delay_seconds: this.politenessConfig.retry_delay_seconds || '',
      crawl_host_group_selector: this.politenessConfig.crawl_host_group_selector
        ? this.politenessConfig.crawl_host_group_selector.map(selector => {
          const parts = selector.split(':');
          const key = parts.shift();
          const value = parts.join(':');
          const label = new Label();
          label.key = key;
          label.value = value;
          return label;
        })
        : [],
      meta: this.politenessConfig.meta,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.shouldDisableRobotPolicy();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  private prepareSave(): PolitenessConfig {
    const formModel = this.form.value;
    return {
      id: this.politenessConfig.id,
      robots_policy: formModel.robots_policy,
      minimum_robots_validity_duration_s: parseInt(formModel.minimum_robots_validity_duration_s, 10),
      custom_robots: formModel.custom_robots,
      min_time_between_page_load_ms: parseInt(formModel.min_time_between_page_load_ms, 10),
      max_time_between_page_load_ms: parseInt(formModel.max_time_between_page_load_ms, 10),
      delay_factor: parseFloat(formModel.delay_factor),
      max_retries: parseInt(formModel.max_retries, 10),
      retry_delay_seconds: parseInt(formModel.retry_delay_seconds, 10),
      crawl_host_group_selector: formModel.crawl_host_group_selector.map(label => label.key + ':' + label.value),
      meta: formModel.meta,
    };
  }
}
