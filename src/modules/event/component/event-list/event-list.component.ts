import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {ConfigObject, EventObject} from '../../../commons/models';
import {AuthService, SnackBarService} from '../../../core/services';
import {Severity, State} from '../../../commons/models/event/event.model';
import {EventService} from '../../services/event.service';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  readonly Severity = Severity;
  readonly State = State;

  displayedColumns = ['select', 'type', 'source', 'state', 'severity', 'assignee', 'actions'];

  @Input()
  dataSource: MatTableDataSource<EventObject>;

  // Selection
  selection = new SelectionModel<EventObject>(true, []);
  allSelected = false;
  selectedRow: EventObject;


  @Output()
  protected rowClick = new EventEmitter<EventObject>();

  @Output()
  selectedChange: EventEmitter<EventObject[]> = new EventEmitter();


  constructor(protected snackBarService: SnackBarService,
              private authService: AuthService,
              private eventService: EventService,
              public cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  reset() {
    this.selection.clear();
    this.selectedRow = null;
    this.cdr.markForCheck();
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(checked: boolean) {
    this.allSelected = false;
    this.selectedRow = null;
    if (checked) {
      this.dataSource.data.forEach(row => this.selection.select(row));
    } else {
      this.selection.clear();
    }
    this.selectedChange.emit(this.selection.selected);
  }

  checkboxToggle(item: EventObject) {
    this.allSelected = false;
    this.selection.toggle(item);
    this.selectedChange.emit(this.selection.selected);

    if (this.selection.selected.length < 2 && this.selectedRow) {
      this.rowClick.emit(this.selectedRow);
    }
  }

  onRowClick(item: EventObject) {
    if (this.selection.selected.length < 2) {
      if (!this.selectedRow) {
        this.selectedRow = item;
      } else {
        this.selectedRow = item.id === this.selectedRow.id ? null : item;
      }
      this.rowClick.emit(this.selectedRow);
    }
  }

  isSelected(item: ConfigObject): boolean {
    return this.selectedRow && this.selection.selected.length < 2 ? this.selectedRow.id === item.id : false;
  }

  isChecked(item: ConfigObject): boolean {
    return this.selection.selected.find(selected => selected.id === item.id) !== undefined;
  }


  OnAssignToMe(row: EventObject) {
    const id = [row.id];
    const updateTemplate = new EventObject({assignee: this.authService.email});
    const paths = ['assignee'];

    if (row.state === State.NEW.valueOf()) {
      updateTemplate.state = State.OPEN;
      paths.push('state');
    }
    this.eventService.update(updateTemplate, paths, id);

    this.snackBarService.openSnackBar('Hendelse tildelt bruker: ' + this.authService.email);
  }

}


