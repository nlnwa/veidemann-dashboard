import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../commons/validator';
import {Label, PolitenessConfig} from '../../../commons/models/config.model';
import {DateTime} from '../../../commons/datetime';
import {RoleService} from '../../../auth/role.service';


@Component({
  selector: 'app-politenessconfig-details',
  templateUrl: './politenessconfig-details.component.html',
  styleUrls: ['./politenessconfig-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PolitenessconfigDetailsComponent implements OnChanges {

  @Input()
  politenessConfig: PolitenessConfig;
  @Input()
  robotsPolicies: string[];

  @Output()
  save = new EventEmitter<PolitenessConfig>();
  @Output()
  update = new EventEmitter<PolitenessConfig>();
  @Output()
  delete = new EventEmitter<PolitenessConfig>();

  form: FormGroup;
  robotsPolicyList: any[];

  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm();
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
    return this.form.get('meta.name');
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.politenessConfig.currentValue) {
      if (!this.politenessConfig) {
        this.form.reset();
      }
    }
    if (changes.robotsPolicies && changes.robotsPolicies.currentValue) {
      this.robotsPolicyList = changes.robotsPolicies.currentValue;
    }
    if (this.politenessConfig && this.robotsPolicyList) {
      this.updateForm();
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

  private createForm() {

    this.form = this.fb.group({
      id: {value: '', disabled: true},
      robots_policy: ['', [Validators.required, CustomValidators.nonEmpty]],
      minimum_robots_validity_duration_s: ['', [Validators.required, CustomValidators.min(0)]],
      custom_robots: null,
      min_time_between_page_load_ms: ['', [Validators.required, CustomValidators.min(0)]],
      max_time_between_page_load_ms: ['', [Validators.required, CustomValidators.min(0)]],
      delay_factor: '',
      max_retries: '',
      retry_delay_seconds: '',
      crawl_host_group_selector: '',
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: '',
        created: {value: '', disabled: true},
        created_by: {value: '', disabled: true},
        last_modified: {value: '', disabled: true},
        last_modified_by: {value: '', disabled: true},
        label: [],
      }),
    });

    if (!this.canEdit) {
      this.form.disable();
    }
  }

  private updateForm() {
    this.form.patchValue({
      id: this.politenessConfig.id,
      robots_policy: this.politenessConfig.robots_policy || this.robotsPolicies[0],
      minimum_robots_validity_duration_s: this.politenessConfig.minimum_robots_validity_duration_s,
      custom_robots: this.politenessConfig.custom_robots,
      min_time_between_page_load_ms: this.politenessConfig.min_time_between_page_load_ms,
      max_time_between_page_load_ms: this.politenessConfig.max_time_between_page_load_ms,
      delay_factor: this.politenessConfig.delay_factor,
      max_retries: this.politenessConfig.max_retries,
      retry_delay_seconds: this.politenessConfig.retry_delay_seconds,
      crawl_host_group_selector: this.politenessConfig.crawl_host_group_selector
        ? this.politenessConfig.crawl_host_group_selector.map(selector => {
          const parts = selector.split(':');
          const label = new Label();
          label.key = parts[0];
          label.value = parts[1];
          return label;
        })
        : [],
      meta: {
        name: this.politenessConfig.meta.name,
        description: this.politenessConfig.meta.description,
        created: new Date(this.politenessConfig.meta.created),
        created_by: this.politenessConfig.meta.created_by,
        last_modified: new Date(this.politenessConfig.meta.last_modified),
        last_modified_by: this.politenessConfig.meta.last_modified_by,
        label: this.politenessConfig.meta.label || [],
      },
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  };

  private prepareSave(): PolitenessConfig {
    const formModel = this.form.value;
    // const crawlHostGroup_selectorDeepCopy: Selector = {label: formModel.crawl_host_group_selector.map(label => ({...label}))};
    return {
      id: this.politenessConfig.id,
      robots_policy: formModel.robots_policy,
      minimum_robots_validity_duration_s: parseInt(formModel.minimum_robots_validity_duration_s, 10),
      custom_robots: formModel.custom_robots,
      min_time_between_page_load_ms: formModel.min_time_between_page_load_ms,
      max_time_between_page_load_ms: formModel.max_time_between_page_load_ms,
      delay_factor: parseFloat(formModel.delay_factor) || 0,
      max_retries: parseInt(formModel.max_retries, 10) || 0,
      retry_delay_seconds: parseInt(formModel.retry_delay_seconds, 10) || 0,
      crawl_host_group_selector: formModel.crawl_host_group_selector.map(label => label.key + ':' + label.value),
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        // created: '',
        // created_by: '',
        // last_modified: null,
        // last_modified_by: '',
        label: formModel.meta.label.map(label => ({...label}))
      }
    };
  }
}
