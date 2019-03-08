import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import {ConfigObject} from '../../models';
import {DataService} from '../../../configurations/shared/data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.html',
  styleUrls: [
    './base-list.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BaseListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['select', 'name', 'description'];

  dataSource: DataSource<ConfigObject>;

  // selection
  selection = new SelectionModel<ConfigObject>(true, []);
  allSelected = false;
  selectedRow: ConfigObject;
  selectedRows: string[] = [];

  @Input()
  embedded = false;

  // paging
  @Input()
  pageLength = 0;
  pageSize = 5;
  pageIndex = 0;
  pageOptions = [5, 10, 25, 50, 100];

  @Input()

  @Output()
  page: EventEmitter<PageEvent> = new EventEmitter();

  @Output()
  rowClick = new EventEmitter<ConfigObject | ConfigObject[]>();

  @Output()
  selectedChange: EventEmitter<ConfigObject[]> = new EventEmitter();

  @Output()
  selectAll: EventEmitter<void> = new EventEmitter();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  private resetSubscription: Subscription = Subscription.EMPTY;

  constructor(protected dataService: DataService) {
  }

  private get data(): ConfigObject[] {
    if (this.dataService) {
      return this.dataService.data;
    } else {
      return (<MatTableDataSource<ConfigObject>>this.dataSource).data;
    }
  }

  ngOnInit(): void {
    if (this.dataService) {
      this.dataSource = this.dataService;
      this.resetSubscription = this.dataService.reset.subscribe(() => this.reset());
    } else {
      this.dataSource = new MatTableDataSource<ConfigObject>();
    }
  }

  ngAfterViewInit(): void {
    if (this.dataService) {
      this.dataService.paginator = this.paginator;
    } else {
      (<MatTableDataSource<ConfigObject>>this.dataSource).paginator = this.paginator;
    }
  }

  ngOnDestroy(): void {
    this.resetSubscription.unsubscribe();
  }

  reset() {
    this.rowClick.emit(null);
    this.selection.clear();
    this.selectedRows = [];
    this.selectedRow = null;
    this.pageLength = 0;
    this.pageIndex = 0;
  }

  onPage(pageEvent: PageEvent) {
    this.page.emit(pageEvent);
  }

  onRowClick(item: ConfigObject) {
    if (this.selectedRows.length > 1) {
      return;
    }
    this.selectedRow = item;
    this.rowClick.emit(item);
  }

  isAllInPageSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows && numSelected > 0;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(checked: boolean) {
    this.allSelected = false;
    this.selectedRow = null;
    if (checked) {
      this.data.forEach(row => this.selection.select(row));
    } else {
      this.selection.clear();
    }
    this.selectedChange.emit(this.selection.selected);
    this.highlightSelected(this.selection.selected);
  }

  checkboxToggle(item: ConfigObject) {
    this.allSelected = false;
    this.selection.toggle(item);
    this.onRowClick(item);
    // this.selectedRow = this.selection.isSelected(item) ? item : null;
    this.selectedChange.emit(this.selection.selected);
    this.highlightSelected(this.selection.selected);
  }

  onSelectAll() {
    this.allSelected = true;
    this.selectAll.emit();
  }

  onDeselectAll() {
    this.allSelected = false;
    this.masterToggle(false);
  }

  highlightSelected(rows) {
    this.selectedRows = rows.map(row => row.id);
  }
}
