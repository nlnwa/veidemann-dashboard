import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
  ViewChild
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {DataService} from '../../../configurations/services/data/data.service';

export enum Action {
  Clone = 'Clone'
}

export interface ActionView {
  icon: string;
  type: Action;
}

export interface ActionEvent {
  item: any;
  action: Action;
}

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.html',
  styleUrls: [
    './base-list.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseListComponent implements AfterViewInit {

  displayedColumns: string[] = ['select', 'name', 'description', 'action'];

  actions: ActionView[] = [
    {icon: 'file_copy', type: Action.Clone}
  ];

  // selection
  selection = new SelectionModel<any>(true, []);
  allSelected = false;
  selectedRow: any;

  pageLength = 0;

  pageSize = 10;

  pageIndex = 0;

  pageOptions = [5, 10, 25, 50, 100];

  @Input()
  dataSource: (DataSource<any> & { data: any[], paginator?: MatPaginator, filteredData?: any[] }) | MatTableDataSource<any>;

  @Input()
  embedded = false;

  @Output()
  page: EventEmitter<PageEvent> = new EventEmitter();

  @Output()
  rowClick = new EventEmitter<any | any[]>();

  @Output()
  selectedChange: EventEmitter<any[]> = new EventEmitter();

  @Output()
  selectAll: EventEmitter<void> = new EventEmitter();

  @Output()
  action: EventEmitter<ActionEvent> = new EventEmitter();

  @ViewChild(MatPaginator, {static: false}) paginator;

  constructor(protected cdr: ChangeDetectorRef,
              @Optional() dataSource: DataService) {
    this.dataSource = dataSource;
  }

  get isAllInPageSelected(): boolean {
    return this.selection.hasValue() && this.selection.selected.length === this.data.length;
  }

  get data(): any[] {
    return this.dataSource.filteredData || this.dataSource.data;
  }

  get selectionCount(): number {
    return this.selection.selected.length;
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  reset() {
    this.selection.clear();
    this.selectedRow = null;
    this.pageIndex = 0;
    this.cdr.markForCheck();
  }

  onPage(pageEvent: PageEvent) {
    this.page.emit(pageEvent);
  }

  onAction(item: any, action: Action) {
    this.action.emit({item, action});
  }

  onRowClick(item: any) {
    if (this.selection.selected.length < 2) {
      if (!this.selectedRow) {
        this.selectedRow = item;
      } else {
        this.selectedRow = item.id === this.selectedRow.id ? null : item;
      }
      this.rowClick.emit(this.selectedRow);
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  onMasterCheckboxToggle(checked: boolean) {
    this.allSelected = false;
    this.selectedRow = null;
    if (checked) {
      this.data.forEach(row => this.selection.select(row));
    } else {
      this.selection.clear();
    }
    this.selectedChange.emit(this.selection.selected);
  }

  onCheckboxToggle(item: any) {
    this.allSelected = false;
    this.selection.toggle(item);
    this.selectedChange.emit(this.selection.selected);

    if (this.selection.selected.length < 2 && this.selectedRow) {
      this.rowClick.emit(this.selectedRow);
    }
  }

  onSelectAll() {
    this.allSelected = true;
    this.selectAll.emit();
  }

  onDeselectAll() {
    this.allSelected = false;
    this.onMasterCheckboxToggle(true);
  }

  isChecked(item: any): boolean {
    return this.selection.selected.find(selected => selected.id === item.id) !== undefined;
  }

  isSelected(item: any): boolean {
    return this.selectedRow && this.selection.selected.length < 2 ? this.selectedRow.id === item.id : false;
  }
}
