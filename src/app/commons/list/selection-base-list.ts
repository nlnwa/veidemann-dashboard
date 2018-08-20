import {SelectionModel} from '@angular/cdk/collections';
import {AfterViewInit, EventEmitter, Injectable, Input, Output} from '@angular/core';
import {PageEvent} from '@angular/material';

@Injectable()
export abstract class SelectionBaseListComponent<T> implements AfterViewInit {

  @Input()
  set data(data: any) {
    if (data === null) {
      return;
    }
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

  displayedColumns: string[];
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

  protected constructor() {
  }

  onUpdateAll(config) {
    this.selection.clear();
    this.dataSource = config;
    this.dataSource.forEach(row => this.selection.select(row));
    this.selectedChange.emit(this.selection.selected);
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
    this.selection.select()
    this.getAllConfigs.emit();
  }
}
