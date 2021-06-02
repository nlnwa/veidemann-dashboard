import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ConfigObject, ConfigRef, EventObject, EventType, Kind} from '../../../../shared/models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService, ErrorService, SnackBarService} from '../../../core';
import {DetailDirective} from '../../../report/directives';
import {Observable, Subject} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../services/event.service';
import {Severities, Severity, State, States} from 'src/shared/models/event/event.model';
import {MatDialog} from '@angular/material/dialog';
import {ConfigService} from '../../../commons/services';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent extends DetailDirective<EventObject> implements OnInit, OnDestroy {
  readonly State = State;
  readonly States = States;
  readonly Severity = Severity;
  readonly Severities = Severities;
  readonly EventType = EventType;

  private ngUnsubscribe = new Subject();

  @Input()
  eventObject: EventObject;

  @Output()
  update = new EventEmitter<EventObject>();

  @Output()
  delete = new EventEmitter<EventObject>();

  form: FormGroup;

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

  protected createForm() {
    this.form = this.fb.group({
      id: '',
      type: '',
      source: '',
      state: '',
      assignee: '',
      severity: '',
      // labelList: [],
    });
  }

  protected updateForm() {
    this.form.setValue({
      id: this.eventObject.id,
      type: this.eventObject.type,
      source: this.eventObject.source,
      state: this.eventObject.state,
      assignee: this.eventObject.assignee,
      severity: this.eventObject.severity,
      // labelList: this.eventObject.labelList || [],
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
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
    eventObject.labelList = this.eventObject.labelList;
    return eventObject;
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
}
