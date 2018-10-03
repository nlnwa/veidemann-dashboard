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

  @Input()
  set data(data: any) {
    if (data === null) {
      return;
    }
    this.selection.clear();
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
  deleteSelected = new EventEmitter<T[]>();

  @Output()
  labelClicked = new EventEmitter();

  @Output()
  getAllConfigs = new EventEmitter();

  displayedColumns: string[] = ['select', 'name', 'description', 'label'];
  selection = new SelectionModel<T>(true, []);
  dataSource: T[] = [];

  // MatPaginator settings
  pageLength = 0;
  pageSize = 5;
  pageIndex = 0;
  pageOptions = [5, 10];


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
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
    this.selectedChange.emit(this.selection.selected);
  }

  checkboxToggle(item: T) {
    this.selection.toggle(item);
    this.selectedChange.emit(this.selection.selected);
  }

  onClickLabel(key: string, value: string) {
    this.labelClicked.emit(key + ':' + value);
  }

  selectAllConfigs() {
    this.selection.select();
    this.getAllConfigs.emit();
  }
}
