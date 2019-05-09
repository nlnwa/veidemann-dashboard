import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewChild
} from '@angular/core';
import {MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import {Subject} from 'rxjs';
import {DataService} from '../../../configurations/services/data.service';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.html',
  styleUrls: [
    './base-list.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BaseListComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns: string[] = ['select', 'name', 'description'];

  @Input()
  dataSource: (DataSource<any> & { data: any[] }) | MatTableDataSource<any>;

  // selection
  selection = new SelectionModel<any>(true, []);
  allSelected = false;
  selectedRow: any;

  // paging
  @Input()
  pageLength = 0;
  pageSize = 10;
  pageIndex = 0;
  pageOptions = [5, 10, 25, 50, 100];

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

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  private ngUnsubscribe = new Subject();

  constructor(protected cdr: ChangeDetectorRef,
              @Optional() protected dataService: DataService = null) {
  }

  get isAllInPageSelected(): boolean {
    return this.selection.hasValue() && this.selection.selected.length === this.data.length;
  }

  get data(): any[] {
    if (this.dataService) {
      return this.dataSource.data;
    } else {
      return (this.dataSource as MatTableDataSource<any>).filteredData;
    }
  }

  ngOnInit(): void {
    if (this.dataService) {
      this.dataSource = this.dataService;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewInit(): void {
    if (this.dataService) {
      this.dataService.paginator = this.paginator;
    }
  }

  reset() {
    this.selection.clear();
    this.selectedRow = null;
    this.pageLength = 0;
    this.pageIndex = 0;
    this.cdr.markForCheck();
  }

  onPage(pageEvent: PageEvent) {
    this.page.emit(pageEvent);
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
