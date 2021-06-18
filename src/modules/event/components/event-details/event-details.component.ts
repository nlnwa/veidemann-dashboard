import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ConfigObject, ConfigRef, EventObject, EventType, Kind, Label} from '../../../../shared/models';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthService, ErrorService, SnackBarService} from '../../../core';
import {DetailDirective} from '../../../report/directives';
import {Observable, Subject} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../services/event.service';
import {Severities, Severity, State, States} from 'src/shared/models/event/event.model';
import {MatDialog} from '@angular/material/dialog';
import {ConfigService} from '../../../commons/services';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent extends DetailDirective<EventObject> implements OnInit, OnDestroy, OnChanges {

  readonly State = State;
  readonly States = States;
  readonly Severity = Severity;
  readonly Severities = Severities;
  readonly EventType = EventType;

  private ngUnsubscribe = new Subject();

  private selectedLabelIndex = -1;

  @Input()
  eventObject: EventObject;

  @Output()
  update = new EventEmitter<EventObject>();

  @Output()
  delete = new EventEmitter<EventObject>();

  form: FormGroup;

  labelForm: FormGroup;
  labelControl = new FormControl();
  removable = true;
  labelInputSeparators: number[] = [ENTER, COMMA];

  seed: ConfigObject;

  constructor(protected fb: FormBuilder,
              protected authService: AuthService,
              protected eventService: EventService,
              protected configService: ConfigService,
              protected route: ActivatedRoute,
              protected errorService: ErrorService,
              protected router: Router,
              protected dialog: MatDialog,
              protected snackBarService: SnackBarService) {
    super(route, eventService);
    this.createForm();
  }

  get labelList(): string[] {
    return this.form.get('labelList').value;
  }

  get canEdit(): boolean {
    return this.authService.canUpdate('event');
  }

  get canDelete(): boolean {
    return this.authService.canDelete('event');
  }

  get showSave(): boolean {
    return (this.eventObject && !this.eventObject.id);
  }

  get canUpdate(): boolean {
    return (this.form.valid && this.form.dirty);
  }

  get canRevert(): boolean {
    return this.form.dirty;
  }

  get canUpdateLabel(): boolean {
    return this.labelForm.get('label').valid && this.labelForm.get('label').dirty;
  }

  ngOnInit(): void {
    super.ngOnInit();

    const item$: Observable<EventObject> = this.query$.pipe(
      map(({id}) => ({id, watch: false})),
      mergeMap(query => this.service.get(query)),
    );
    this.item$ = item$;

    this.item$.subscribe(event => {
      this.eventObject = event;
      this.updateForm();
      if (this.eventObject.type === EventType.altSeed) {
        const seedId = this.eventObject.dataList.find(eventData => eventData.key === 'SeedId').value;
        this.configService.get(new ConfigRef({kind: Kind.SEED, id: seedId}))
          .subscribe(seedObj => {
            this.seed = seedObj;
          });
      }
    });

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.eventObject) {
      if (this.eventObject) {
        this.updateForm();
      } else {
        this.form.reset();
      }
    }
  }

  protected createForm() {
    this.form = this.fb.group({
      id: '',
      type: '',
      source: '',
      state: '',
      assignee: '',
      severity: '',
      labelList: [''],
    });
    this.labelForm = this.fb.group({
      label: '',
    });
    this.labelForm.disable();
  }

  protected updateForm() {
    this.form.setValue({
      id: this.eventObject.id,
      type: this.eventObject.type,
      source: this.eventObject.source,
      state: this.eventObject.state,
      assignee: this.eventObject.assignee,
      severity: this.eventObject.severity,
      labelList: this.eventObject.labelList || [''],
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  protected prepareSave(): EventObject {
    const formModel = this.form.value;

    const eventObject = new EventObject();
    if (this.eventObject.id !== '') {
      eventObject.id = this.eventObject.id;
    }

    eventObject.type = formModel.type;
    eventObject.source = formModel.source;
    eventObject.state = formModel.state;
    eventObject.severity = formModel.severity;
    eventObject.assignee = formModel.assignee;
    eventObject.dataList = this.eventObject.dataList;
    eventObject.labelList = formModel.labelList;
    return eventObject;
  }

  onRemoveLabel(label: string): void {
    const index = this.labelList.indexOf(label);

    if (index >= 0) {
      this.labelList.splice(index, 1);
      this.form.markAsDirty();
    }
  }

  onUpdate(): void {
    this.update.emit(this.prepareSave());
  }

  onDelete(): void {
    this.delete.emit(this.eventObject);
  }

  onRevert() {
    this.updateForm();
  }

  onAddLabel(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();

    if (value === '') {
      return;
    }
    if (this.findLabelIndex(value) > -1) {
      input.value = '';
      return;
    }
    this.labelList.push(value);
    this.form.markAsDirty();

    if (input) {
      input.value = '';
    }
  }

  onUpdateLabel(label: string): void {
    label = label.trim();
    this.labelList.splice(this.selectedLabelIndex, 1);
    this.labelList.push(label);
    this.labelForm.disable();
    this.form.markAsDirty();
  }

  onClickLabel(label: string) {
    this.selectedLabelIndex = this.findLabelIndex(label);
    this.labelForm.enable();
    this.labelForm.reset({label});
  }

  onAbortLabelEdit(): void {
    this.labelForm.disable();
  }

  private findLabelIndex(label: string): number {
    return this.labelList.findIndex((l) => {
      return l === label;
    });
  }
}
