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
  Output,
  ViewChild
} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material';
import {ConfigObject} from '../../models';
import {DataService} from '../../../configurations/services/data.service';
import {Subject} from 'rxjs';

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

  dataSource: DataSource<ConfigObject>;

  // selection
  selection = new SelectionModel<ConfigObject>(true, []);
  allSelected = false;
  selectedRow: ConfigObject;

  // paging
  @Input()
  pageLength = 0;
  pageSize = 5;
  pageIndex = 0;
  pageOptions = [5, 10, 25, 50, 100];

  @Input()
  embedded = false;

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

  private ngUnsubscribe = new Subject();

  constructor(public dataService: DataService,
              public cdr: ChangeDetectorRef) {
  }

  get isAllInPageSelected(): boolean {
    return this.selection.hasValue() ? this.selection.selected.length === this.dataService.data.length : false;
  }

  ngOnInit(): void {
    this.dataSource = this.dataService;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewInit(): void {
    this.dataService.paginator = this.paginator;
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

  onRowClick(item: ConfigObject) {
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
      this.dataService.data.forEach(row => this.selection.select(row));
    } else {
      this.selection.clear();
    }
    this.selectedChange.emit(this.selection.selected);
  }

  onCheckboxToggle(item: ConfigObject) {
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

  isChecked(item: ConfigObject): boolean {
    return this.selection.selected.find(selected => selected.id === item.id) !== undefined;
  }

  isSelected(item: ConfigObject): boolean {
    return this.selectedRow && this.selection.selected.length < 2 ? this.selectedRow.id === item.id : false;
  }
}
