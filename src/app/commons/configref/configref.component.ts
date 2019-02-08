import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Kind} from '../models/kind.model';
import {ConfigRef} from '../models/configref.model';
import {Subscription} from 'rxjs';
import {ListRequest} from 'veidemann-api-grpc-web';
import {map} from 'rxjs/operators';
import {ConfigObject} from '../models/configobject.model';
import {RobotsPolicy} from '../models/configs/politenessconfig.model';
import {Role} from '../models/configs/rolemapping.model';
import {BackendService} from '../../configurations/shared/backend.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-configref',
  templateUrl: './configref.component.html',
  styleUrls: ['./configref.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: ConfigRefComponent, multi: true},
  ],
})
export class ConfigRefComponent implements AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {


  @Input()
  kind: Kind = Kind.UNDEFINED;

  @Input()
  multiple = true;

  // ControlValueAccessor callbacks
  onChange: (configRef: ConfigRef | ConfigRef[]) => void;
  onTouched: (configRef: ConfigRef | ConfigRef[]) => void;

  form: FormGroup;

  options: any[];

  private valueSubscription: Subscription;

  constructor(private fb: FormBuilder, private configService: BackendService,
              private cdr: ChangeDetectorRef) {
    this.createForm();
  }

  get placeholder(): string {
    switch (this.kind) {
      case Kind.UNDEFINED:
        break;
      case Kind.CRAWLENTITY:
        break;
      case Kind.SEED:
        break;
      case Kind.CRAWLJOB:
        return 'Velg crawljob';
        break;
      case Kind.CRAWLCONFIG:
        return 'Velg crawlconfig';
        break;
      case Kind.CRAWLSCHEDULECONFIG:
        return 'Velg schedule';
        break;
      case Kind.BROWSERCONFIG:
        return 'Velg browserconfig';
        break;
      case Kind.POLITENESSCONFIG:
        return 'Velg politenessconfig';
        break;
      case Kind.BROWSERSCRIPT:
        return 'Velg browserscript';
        break;
      case Kind.CRAWLHOSTGROUPCONFIG:
        break;
      case Kind.ROLEMAPPING:
        break;
      case Kind.COLLECTION:
        return 'Velg collection';
        break;
    }
    return this.kind.toString();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.kind) {
      if (this.kind) {
        this.loadOptions(this.kind);
      }
    }
  }

  ngAfterViewInit() {
    this.valueSubscription = this.form.valueChanges.subscribe(value => {
      if (value.id instanceof Array) {
        this.onChange(value.id.map(id => new ConfigRef({id, kind: this.kind})));
      } else {
        this.onChange(new ConfigRef({id: value.id, kind: this.kind}));
      }
    });
  }

  ngOnDestroy() {
    if (this.valueSubscription) {
      this.valueSubscription.unsubscribe();
    }
  }

  // implement ControlValueAccessor
  writeValue(configRef: ConfigRef | ConfigRef[]): void {
    if (configRef === null) {
      this.form.reset();
    } else {
      this.updateForm(configRef);
    }
  }

  // implement ControlValueAccessor
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // implement ControlValueAccessor
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // implement ControlValueAccessor
  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  private createForm(): void {
    this.form = this.fb.group({
      id: ''
    });
  }

  private updateForm(configRef: ConfigRef | ConfigRef[]): void {
    // setting the emitEvent option to false  prevents the valueChange subscription above to fire
    this.form.patchValue({
      id: configRef instanceof Array ? configRef.map(ref => ref.id) : configRef.id
    }, {emitEvent: false});
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.cdr.detectChanges();
  }

  private loadOptions(kind: Kind) {
    switch (kind) {
      case Kind.UNDEFINED:
        break;
      case Kind.CRAWLENTITY:
        break;
      case Kind.SEED:
        break;
      case Kind.CRAWLJOB:
        const crawlJobRequest = new ListRequest();
        crawlJobRequest.setKind(Kind.CRAWLJOB.valueOf());
        this.configService.list(crawlJobRequest).pipe(
          map(ConfigObjects => ConfigObjects.map(ConfigObject.fromProto))
        ).subscribe(options => this.options = options);
        break;
      case Kind.CRAWLCONFIG:
        const crawlConfigRequest = new ListRequest();
        crawlConfigRequest.setKind(Kind.CRAWLCONFIG.valueOf());
        this.configService.list(crawlConfigRequest).pipe(
          map(ConfigObjects => ConfigObjects.map(ConfigObject.fromProto))
        ).subscribe(options => this.options = options);
        break;
      case Kind.CRAWLSCHEDULECONFIG:
        const scheduleConfigRequest = new ListRequest();
        scheduleConfigRequest.setKind(Kind.CRAWLSCHEDULECONFIG.valueOf());
        this.configService.list(scheduleConfigRequest).pipe(
          map(ConfigObjects => ConfigObjects.map(ConfigObject.fromProto))
        ).subscribe(options => this.options = options);
        break;
      case Kind.POLITENESSCONFIG:
        const politenessRequest = new ListRequest();
        politenessRequest.setKind(Kind.POLITENESSCONFIG.valueOf());
        this.configService.list(politenessRequest).pipe(
          map(configObjects => configObjects.map(ConfigObject.fromProto))
        ).subscribe(options => this.options = options);
        break;
      case Kind.BROWSERSCRIPT:
        const browserScriptRequest = new ListRequest();
        browserScriptRequest.setKind(Kind.BROWSERSCRIPT.valueOf());
        this.configService.list(browserScriptRequest).pipe(
          map(ConfigObjects => ConfigObjects.map(ConfigObject.fromProto))
        ).subscribe(options => this.options = options);
        break;
      case Kind.CRAWLHOSTGROUPCONFIG:
        break;
      case Kind.ROLEMAPPING:
        break;
      case Kind.BROWSERCONFIG:
        const browserConfigRequest = new ListRequest();
        browserConfigRequest.setKind(Kind.BROWSERCONFIG.valueOf());
        this.configService.list(browserConfigRequest).pipe(
          map(ConfigObjects => ConfigObjects.map(ConfigObject.fromProto))
        ).subscribe(options => this.options = options);
        break;
      case Kind.COLLECTION:
        const collectionRequest = new ListRequest();
        collectionRequest.setKind(Kind.COLLECTION.valueOf());
        this.configService.list(collectionRequest).pipe(
          map(ConfigObjects => ConfigObjects.map(ConfigObject.fromProto))
        ).subscribe(options => this.options = options);
        break;
    }
  }

}
