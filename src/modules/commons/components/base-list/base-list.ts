import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {
  AfterViewInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {MatLegacyPaginator as MatPaginator, LegacyPageEvent as PageEvent} from '@angular/material/legacy-paginator';
import {MatSort, MatSortHeader, Sort, SortDirection} from '@angular/material/sort';
import {first, map, shareReplay} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {ActionDirective, ExtraDirective, FilterDirective, ShortcutDirective} from '../../directives';
import {Kind, ListItem} from '../../../../shared/models';
import {ShortcutEventOutput, ShortcutInput} from 'ng-keyboard-shortcuts';


@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseListComponent<T extends ListItem> implements OnChanges, AfterViewInit {
  readonly Kind = Kind;
  length$: BehaviorSubject<number>;

  @Input()
  set length(length: number) {
    this.length$.next(length);
  }

  @Input()
  pageSize = 25;

  @Input()
  pageIndex = 0;

  @Input()
  pageOptions = [5, 10, 25, 50, 100];

  @Input()
  sortDirection: SortDirection = '';

  @Input()
  sortActive = 'name';

  @Input()
  displayedColumns: string[] = ['select', 'name', 'description', 'extra', 'action'];

  @Input()
  multiSelect = true;

  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  private _dataSource: DataSource<T>;

  @Input()
  set dataSource(dataSource: DataSource<T>) {
    this._dataSource = dataSource;
    this.isAllInPageSelected$ = combineLatest([
      this.selection.changed.asObservable(),
      dataSource.connect(null),
    ]).pipe(
      map(([_, rows]) =>
        rows.length === this.selection.selected.length && rows.length > 0),
      shareReplay(1)
    );
  }

  get dataSource(): DataSource<T> {
    return this._dataSource;
  }

  @Output()
  rowClick: EventEmitter<T>;

  @Output()
  selectedChange: EventEmitter<T[]>;

  @Output()
  selectAll: EventEmitter<void>;

  @Output()
  sort: EventEmitter<Sort>;

  @Output()
  page: EventEmitter<PageEvent>;

  @ViewChild(MatSort, {static: true}) matSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ContentChildren(ActionDirective, {read: TemplateRef, descendants: true}) actionButtonTemplates;
  @ContentChildren(ExtraDirective, {read: TemplateRef, descendants: true}) extraTemplates;
  @ContentChildren(FilterDirective, {read: TemplateRef, descendants: true}) filterButtonTemplates;
  @ContentChildren(ShortcutDirective, {read: TemplateRef, descendants: true}) shortcutButtonTemplates;

  // selection of checked rows
  selection: SelectionModel<T>;
  allSelected: boolean;
  isAllInPageSelected$: Observable<boolean>;
  selectedRow: T;

  // Keyboard navigation
  selectedRowIndex: number = null;
  shortcuts: ShortcutInput[] = [];

  protected constructor(@Optional() protected cdr?: ChangeDetectorRef) {
    this.sort = new EventEmitter<Sort>();
    this.selectedChange = new EventEmitter<T[]>();
    this.selectAll = new EventEmitter<void>();
    this.page = new EventEmitter<PageEvent>();
    this.rowClick = new EventEmitter<T>();
    this.selection = new SelectionModel<T>(true, []);
    this.allSelected = false;
    this.length$ = new BehaviorSubject<number>(0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sortDirection && changes.sortActive) {
      // ugly hack see https://github.com/angular/components/issues/10242 and https://github.com/angular/components/issues/10524
      const sortHeader = (this.matSort.sortables.get(this.sortActive) as MatSortHeader);
      if (sortHeader) {
        sortHeader._setAnimationTransitionState({toState: 'active'});
      }
    }
  }

  ngAfterViewInit() {

    this.shortcuts.push(
      {
        key: 'shift + down',
        label: 'List navigation',
        description: 'Navigate to row below',
        preventDefault: true,
        command: (event: ShortcutEventOutput) => {
          const keyboardEvent = new KeyboardEvent('keydown', {key: 'ArrowDown'});
          this.onKeyboardEvent(keyboardEvent);
        }
      },
      {
        key: 'shift + up',
        label: 'List navigation',
        description: 'Navigate to row above',
        preventDefault: true,
        command: (event: ShortcutEventOutput) => {
          const keyboardEvent = new KeyboardEvent('keydown', {key: 'ArrowUp'});
          this.onKeyboardEvent(keyboardEvent);
        }
      },
      {
        key: 'shift + right',
        label: 'List navigation',
        description: 'Get next page',
        preventDefault: true,
        command: (event: ShortcutEventOutput) => {
          this.paginator.nextPage();
        }
      },
      {
        key: 'shift + left',
        label: 'List navigation',
        description: 'Get previous page',
        preventDefault: true,
        command: (event: ShortcutEventOutput) => {
          this.paginator.previousPage();
        }
      },
      {
        key: 'shift + enter',
        label: 'List navigation',
        description: 'Show preview for selected row',
        command: (event: ShortcutEventOutput) => {
          const keyboardEvent = new KeyboardEvent('keydown', {key: 'Enter'});
          this.onKeyboardEvent(keyboardEvent);
        }
      },
      {
        key: 'shift + s',
        label: 'List navigation',
        description: 'Toggle checkbox for selected row',
        command: (event: ShortcutEventOutput) => {
          const keyboardEvent = new KeyboardEvent('keydown', {key: 'S'});
          this.onKeyboardEvent(keyboardEvent);
        }
      },
      {
        key: 'shift + a',
        label: 'List navigation',
        description: 'Select all in page',
        command: (event: ShortcutEventOutput) => {
          const keyboardEvent = new KeyboardEvent('keydown', {key: 'A'});
          this.onKeyboardEvent(keyboardEvent);
        }
      },
      {
        key: 'shift + escape',
        label: 'List navigation',
        description: 'Stop keyboard list navigation',
        command: (event: ShortcutEventOutput) => {
          this.selectedRowIndex = null;
          this.cdr.markForCheck();
        }
      });
  }

  reset() {
    this.selection.clear();
    this.selectedRow = null;
    this.allSelected = false;
    this.selectedRowIndex = null;
  }

  onSortChange(sort: Sort) {
    this.reset();
    this.sort.emit(sort);
  }

  onRowClick(item: T) {
    this.allSelected = false;
    this.selectedRowIndex = null;
    this.selectedRow = this.selectedRow?.id === item.id ? null : item;
    this.rowClick.emit(this.selectedRow);
  }

  onMasterCheckboxToggle(checked: boolean) {
    this.selectedRow = null;
    this.allSelected = false;
    if (checked) {
      this.dataSource.connect(null)
        .pipe(first())
        .subscribe(rows => {
          this.selection.select(...rows);
          this.selectedChange.emit(this.selection.selected);
        });
    } else {
      this.selection.clear();
      this.selectedChange.emit(this.selection.selected);
    }
  }

  onCheckboxToggle(item: T) {
    this.selectedRow = null;
    this.allSelected = false;
    this.selection.toggle(item);
    this.selectedChange.emit(this.selection.selected);
  }

  onSelectAll() {
    this.allSelected = true;
    this.selectAll.emit();
  }

  onDeselectAll() {
    this.allSelected = false;
    this.onMasterCheckboxToggle(false);
  }

  onPage(pageEvent: PageEvent) {
    this.reset();
    this.page.emit(pageEvent);
  }

  onKeyboardEvent(event: KeyboardEvent) {
    let itemsInPage: number = null;
    this.dataSource.connect(null).pipe(first())
      .subscribe(rows => {
        itemsInPage = rows.length;
      });

    switch (event.key) {

      case 'ArrowDown':
        if (this.selectedRowIndex !== null) {
          if (this.selectedRowIndex + 1 <= itemsInPage - 1) {
            this.selectedRowIndex += 1;
            this.selectedRow = null; // collapse any open preview when navigating
            this.selectRowByIndex(this.selectedRowIndex);
          }
        } else {
          this.selectedRowIndex = 0;
          this.selectRowByIndex(0);
        }
        this.cdr.markForCheck();
        break;

      case 'ArrowUp':
        if (this.selectedRowIndex !== null) {
          if (this.selectedRowIndex - 1 >= 0) {
            this.selectedRowIndex -= 1;
            this.selectedRow = null; // collapse any open preview when navigating
            this.selectRowByIndex(this.selectedRowIndex);
          }
        }
        this.cdr.markForCheck();
        break;
      case 'S' :
        if (this.selectedRowIndex !== null) {
          this.dataSource.connect(null)
            .pipe(first())
            .subscribe(rows => {
              this.onCheckboxToggle(rows[this.selectedRowIndex]);
            });
        }
        break;

      case 'A':
        this.onMasterCheckboxToggle(true);
        break;

      case 'Enter' :
        this.selectRowByIndex(this.selectedRowIndex, true);
        this.cdr.markForCheck();
        break;
    }
  }


  selectRowByIndex(index: any, expand?: boolean): void {
    this.dataSource.connect(null)
      .pipe(first())
      .subscribe(rows => {
        this.selectedRowIndex = index;
        this.allSelected = false;
        const rowElement = document.getElementById('row' + index.toString());
        rowElement.scrollIntoView({behavior: 'smooth', block: 'end'});
        if (expand) {
          this.selectedRow = this.selectedRow?.id === rows[index].id ? null : rows[index];
          this.rowClick.emit(this.selectedRow);
          setTimeout(() => {
            const expandedRowElement = document.getElementById('expandedPreviewRow' + index.toString());
            if (expandedRowElement !== null) {
              expandedRowElement.scrollIntoView({behavior: 'smooth', block: 'center'});
            }
          }, 250);
        }
      });
  }

  isChecked(item: T): boolean {
    return this.selection.selected.find(selected => selected.id === item.id) !== undefined;
  }

  isSelected(item: T): boolean {
    return this.selectedRow ? this.selectedRow.id === item.id : false;
  }

  isDisabled(_: T): boolean {
    return false;
  }
}
