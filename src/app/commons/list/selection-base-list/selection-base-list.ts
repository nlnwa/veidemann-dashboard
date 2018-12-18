import {SelectionModel} from '@angular/cdk/collections';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-selection-base-list',
  templateUrl: './selection-base-list.html',
  styleUrls: [
    './selection-base-list.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SelectionBaseListComponent<T> implements AfterViewInit {

  displayedColumns: string[] = ['select', 'name', 'description', 'label'];
  selection = new SelectionModel<T>(true, []);
  dataSource: T[] = [];
  allSelected = false;

  // MatPaginator settings
  pageLength = 0;
  pageSize = 5;
  pageIndex = 0;
  pageOptions = [5, 10];

  // highlight
  selectedRow ;
  selectedRows = [];


  @Input()
  set data(data: any) {
    if (data === null) {
      return;
    }
    this.selection.clear();
    this.selectedRows = [];
    this.selectedRow = -1;
    this.dataSource = data.value || [];
    this.pageLength = data.pageLength;
    this.pageIndex = data.pageIndex;
  }

  @Output()
  protected rowClick = new EventEmitter<T | T[]>();

  @Output()
  selectedChange = new EventEmitter();

  @Output()
  page: EventEmitter<PageEvent> = new EventEmitter();

  @Output()
  selectAll = new EventEmitter();


  ngAfterViewInit(): void {
    this.page.emit({
      length: this.pageLength,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    });
  }

  constructor() {
  }

  onRowClick(item: T) {
    this.rowClick.emit(item);
    this.selectedRow = (item as any).id;
  }

  private isAllInPageSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  isEverythingSelected(): boolean {
    return this.selection.selected.length === this.pageLength;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(checked: boolean) {
    this.selectedRow = -1;
    this.allSelected = false;
    if (checked) {
      this.dataSource.forEach(row => this.selection.select(row));
    } else {
      this.selection.clear();
    }
    this.selectAll.emit(this.allSelected);
    this.selectedChange.emit(this.selection.selected);
    this.highlightSelected(this.selection.selected);
  }

  checkboxToggle(item: T) {
    this.allSelected = false;
    this.selection.toggle(item);
    if (this.selection.isSelected(item)) {
      this.selectedRow = (item as any).id;
    } else {
      this.selectedRow = -1;
    }
    this.selectAll.emit(this.allSelected);
    this.selectedChange.emit(this.selection.selected);
    this.highlightSelected(this.selection.selected);
  }

  onSelectAll() {
    this.allSelected = true;
    this.selectAll.emit(this.allSelected);
  }

  onDeselectAll() {
    this.masterToggle(false);
  }

  highlightSelected(rows) {
    this.selectedRows = rows.map(row => row.id);
  }
}




