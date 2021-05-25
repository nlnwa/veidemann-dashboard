import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Annotation, ConfigObject, ConfigRef, EventObject, Kind} from '../../../../shared/models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService, ErrorService, SnackBarService} from '../../../core';
import {DetailDirective} from '../../../report/directives';
import {Observable, Subject} from 'rxjs';
import {filter, map, mergeMap, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../services/event.service';
import {Severities, Severity, State, States} from 'src/shared/models/event/event.model';
import {EventAlternativeSeedDialogComponent} from '../event-types/event-alternative-seed/event-alternative-seed-dialog/event-alternative-seed-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfigService} from '../../../commons/services';
import {EventDialogData} from '../event-dialog/event-dialog.component';

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

  private ngUnsubscribe = new Subject();

  @Input()
  eventObject: EventObject;

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
      console.log('eventObject oninit details: ', this.eventObject);
      this.updateForm();
      if (this.eventObject.type === 'Alternative seed') {
        const seedId = this.eventObject.dataList.find(eventData => eventData.key === 'SeedId').value;
        this.configService.get(new ConfigRef({kind: Kind.SEED, id: seedId}))
          .subscribe(seedObj => {
            console.log('funnet seed i details: ', seedObj);
            this.seed = seedObj;
            console.log('this.seed: ', this.seed);
          });
      }
    });

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onUpdate(): void {
    this.eventService.save(this.prepareSave())
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(update => {
        this.eventObject = update;
        this.updateForm();
        this.snackBarService.openSnackBar($localize`:@snackBarMessage.updated:Updated`);
      });
  }

  onDelete(eventObject: EventObject): void {
    this.eventService.delete(eventObject).subscribe(() => {
      this.router.navigate(['../'], {
        relativeTo: this.route,
      }).catch(error => this.errorService.dispatch(error));
      this.snackBarService.openSnackBar($localize`:@snackBarMessage.deleted:Deleted`);
    });
  }

  onRevert() {
    this.updateForm();
  }

    //   }
    //     this.configService.updateWithTemplate(updateTemplate, pathList, [this.seedId])
    //       .pipe(takeUntil(this.ngUnsubscribe))
    //       .subscribe(added => {
    //         alert('Annotations added');
    //       });
    //  }
    // }
 // }

  // onCreateDialogByEventType(eventObject: EventObject) {
  //   const data: EventDialogData = {eventObject};
  //   const eventType = this.getDialogByEventType(eventObject);
  //   const dialogRef = this.dialog.open(eventType, {data});
  //
  //   dialogRef.afterClosed()
  //   .subscribe((eventObj: EventObject) => {
  //     console.log(eventObj);
  //   });
  // }

  // getDialogByEventType(event: EventObject) {
  //   switch (event.type) {
  //     case 'Alternative seed':
  //       return EventAlternativeSeedDialogComponent;
  //   }
  // }



  protected createForm() {
    this.form = this.fb.group({
      id: '',
      type: '',
      source: '',
      state: '',
      assignee: '',
      severity: '',
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
}
