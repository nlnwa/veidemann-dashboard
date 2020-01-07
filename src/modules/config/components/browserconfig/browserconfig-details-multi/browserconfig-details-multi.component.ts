import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {NUMBER_OR_EMPTY_STRING} from '../../../../commons/validator/patterns';
import {ConfigObject, ConfigRef, Kind, Label} from '../../../../commons/models';
import {BrowserConfigDetailsComponent} from '../browserconfig-details/browserconfig-details.component';


@Component({
  selector: 'app-browserconfig-details-multi',
  templateUrl: './browserconfig-details-multi.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowserConfigDetailsMultiComponent extends BrowserConfigDetailsComponent {
  readonly Kind = Kind;

  allSelected = false;

  shouldAddLabel = undefined;
  shouldAddBrowserScript = undefined;
  shouldAddSelector = undefined;

  constructor(protected fb: FormBuilder, protected authService: AuthService) {
    super(fb, authService);
  }

  get canUpdate(): boolean {
    return this.form.valid && (
      this.form.dirty
      || ((this.shouldAddBrowserScript !== undefined && this.scriptRefIdList.value.length)
        || (this.shouldAddSelector !== undefined && this.scriptSelectorList.value.length)
        || (this.shouldAddLabel !== undefined && this.labelList.value.length)
      ));
  }

  get canRevert(): boolean {
    return this.form.dirty
      || (this.shouldAddLabel !== undefined)
      || (this.shouldAddBrowserScript !== undefined)
      || (this.shouldAddSelector !== undefined);
  }

  get labelList(): AbstractControl {
    return this.form.get('labelList');
  }

  onToggleShouldAddLabels(value: boolean) {
    this.shouldAddLabel = value;
    if (value !== undefined) {
      this.labelList.enable();
    }
  }

  onToggleShouldAddSelector(value: boolean) {
    this.shouldAddSelector = value;
    if (value !== undefined) {
      this.scriptSelectorList.enable();
    }
  }

  onToggleBrowserScript(value: boolean) {
    this.shouldAddBrowserScript = value;
    if (value !== undefined) {
      this.scriptRefIdList.enable();
    }
  }

  onRevert() {
    super.onRevert();
    this.shouldAddLabel = undefined;
    this.shouldAddBrowserScript = undefined;
    this.shouldAddSelector = undefined;
  }

  protected createForm() {
    this.form = this.fb.group({
      labelList: {value: []},
      userAgent: '',
      windowWidth: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      windowHeight: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      pageLoadTimeoutMs: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      maxInactivityTimeMs: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      // headers: this.fb.group({''}),
      scriptRefIdList: {value: []},
      scriptSelectorList: '',
    });
  }

  protected updateForm() {
    this.form.setValue({
      labelList: this.configObject.meta.labelList,
      userAgent: this.configObject.browserConfig.userAgent || '',
      windowWidth: this.configObject.browserConfig.windowWidth || '',
      windowHeight: this.configObject.browserConfig.windowHeight || '',
      pageLoadTimeoutMs: this.configObject.browserConfig.pageLoadTimeoutMs || '',
      maxInactivityTimeMs: this.configObject.browserConfig.maxInactivityTimeMs || '',
      // headers: this.configObject.configObject.headers;
      scriptRefIdList: this.configObject.browserConfig.scriptRefList.map(ref => ref.id),
      scriptSelectorList: this.configObject.browserConfig.scriptSelectorList.map(selector => {
        const parts = selector.split(':', 2);
        const key = parts.shift();
        const value = parts.join(':');
        return new Label({key, value});
      }),
    });
    this.labelList.disable();
    this.scriptSelectorList.disable();
    this.scriptRefIdList.disable();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
    }
  }


  protected prepareSave(): any {
    const pathList: string[] = [];
    const formModel = this.form.value;

    const updateTemplate = new ConfigObject({kind: Kind.BROWSERCONFIG});
    const browserConfig = updateTemplate.browserConfig;


    if (this.userAgent.dirty && (this.allSelected || formModel.userAgent !== this.configObject.browserConfig.userAgent)) {
      browserConfig.userAgent = formModel.userAgent;
      pathList.push('browserConfig.userAgent');
    }

    if (this.windowWidth.dirty && (this.allSelected || this.configObject.browserConfig.windowWidth !== formModel.windowWidth)) {
      browserConfig.windowWidth = formModel.windowWidth;
      pathList.push('browserConfig.windowWidth');
    }

    if (this.windowHeight.dirty && (this.allSelected || this.configObject.browserConfig.windowHeight !== formModel.windowHeight)) {
      browserConfig.windowHeight = formModel.windowHeight;
      pathList.push('browserConfig.windowHeight');
    }

    if (this.pageLoadTimeoutMs.dirty
      && (this.allSelected || this.configObject.browserConfig.pageLoadTimeoutMs !== formModel.pageLoadTimeoutMs)) {
      browserConfig.pageLoadTimeoutMs = formModel.pageLoadTimeoutMs;
      pathList.push('browserConfig.pageLoadTimeoutMs');
    }

    if (this.maxInactivityTimeMs.dirty
      && (this.allSelected || this.configObject.browserConfig.maxInactivityTimeMs !== formModel.maxInactivityTimeMs)) {
      browserConfig.maxInactivityTimeMs = formModel.maxInactivityTimeMs;
      pathList.push('browserConfig.maxInactivityTimeMs');
    }

    if (this.labelList.value.length && this.shouldAddLabel !== undefined) {
      updateTemplate.meta.labelList = formModel.labelList;
      if (this.shouldAddLabel) {
        pathList.push('meta.label+');
      } else {
        pathList.push('meta.label-');
      }
    }

    if (this.shouldAddBrowserScript !== undefined) {
      browserConfig.scriptRefList = formModel.scriptRefIdList.map(id => new ConfigRef({id, kind: Kind.BROWSERSCRIPT}));
      if (this.shouldAddBrowserScript) {
        pathList.push('browserConfig.scriptRef+');
      } else {
        pathList.push('browserConfig.scriptRef-');
      }
    }

    if (this.scriptSelectorList.value.length && this.shouldAddSelector !== undefined) {
      browserConfig.scriptSelectorList = formModel.scriptSelectorList.map(label => label.key + ':' + label.value);
      if (this.shouldAddSelector) {
        pathList.push('browserConfig.scriptSelector+');
      } else {
        pathList.push('browserConfig.scriptSelector-');
      }
    }

    return {updateTemplate, pathList};
  }
}
