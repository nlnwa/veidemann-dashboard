import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';
import {BrowserScript, Label} from '../../commons/models/config.model';
import {BrowserScriptService} from './browserscript.service';
import {SnackBarService} from 'app/commons/snack-bar/snack-bar.service';
import {combineLatest, from, Subject} from 'rxjs';
import {catchError, mergeMap, startWith, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {DetailDirective} from '../crawlhostgroupconfig/detail.directive';
import {RoleService} from '../../auth';
import {FormBuilder} from '@angular/forms';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';
import {BrowserScriptDetailsComponent} from './browserscript-details/browserscript-details.component';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-browserscript',
  template: `
    <app-search-config [term]="term"
                       (submit)="onSearch($event)"></app-search-config>
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span class="toolbar--title">Browserscript</span>
          <button mat-mini-fab (click)="onCreateBrowserScript()">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-browserscript-list (rowClick)="onSelectBrowserScript($event)"
                                [data]="data$ | async"
                                (selectedChange)="onSelectedChange($event)"
                                (labelClicked)="onLabelClick($event)"
                                (page)="onPage($event)">
        </app-browserscript-list>
        <!--<mat-paginator [length]="pageLength"-->
        <!--[pageIndex]="pageIndex"-->
        <!--[pageSize]="pageSize"-->
        <!--[pageSizeOptions]="pageOptions">-->
        <!--</mat-paginator>-->
      </div>
      <app-browserscript-details [browserScript]="browserScript"
                                 *ngIf="browserScript && singleMode"
                                 (update)="onUpdateBrowserScript($event)"
                                 (save)="onSaveBrowserScript($event)"
                                 (delete)="onDeleteBrowserScript($event)">
      </app-browserscript-details>
      <ng-template detail-host></ng-template>
    </div>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BrowserScriptPageComponent implements OnInit {
  // pageLength = 0;
  // pageSize = 5;
  // pageIndex = 0;
  // pageOptions = [5, 10];

  selectedConfigs = [];
  term = '';
  componentRef = null;

  browserScript: BrowserScript;
  changes: Subject<void> = new Subject<void>();
  page: Subject<PageEvent> = new Subject<PageEvent>();
  data = new Subject<any>();
  data$ = this.data.asObservable();


  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(BrowserScriptListComponent) list: BrowserScriptListComponent;

  @ViewChild(DetailDirective) detailHost: DetailDirective;


  // constructor(private browserScriptService: BrowserScriptService,
  //             private snackBarService: SnackBarService,
  //             private database: ListDatabase,
  //             private route: ActivatedRoute) {
  // }
  constructor(private browserScriptService: BrowserScriptService,
              private snackBarService: SnackBarService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private fb: FormBuilder,
              private roleService: RoleService,
              private dialog: MatDialog,
              private route: ActivatedRoute) {

  }

  //
  // ngAfterViewInit() {
  //   // When paginator has changes or on save/update/delete
  //   // we reload data for the list
  //   merge(this.paginator.page, this.changes).pipe(
  //     startWith(null),
  //     switchMap(() => {
  //       return this.browserScriptService.search({
  //         page_size: this.paginator.pageSize,
  //         page: this.paginator.pageIndex
  //       });
  //     }),
  //     map((reply) => {
  //       this.pageLength = parseInt(reply.count, 10);
  //       this.pageSize = reply.page_size;
  //       this.pageIndex = reply.page;
  //       return reply.value;
  //     })
  //   )
  //     .subscribe((items) => {
  //       this.database.items = items;
  //     });
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id != null) {
  //     this.browserScriptService.get(id)
  //       .subscribe(response => {
  //         this.browserScript = response;
  //       });
  //   }
  // }


  get singleMode(): boolean {
    return this.selectedConfigs.length < 2;
  }

  loadComponent(browserScript: BrowserScript) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BrowserScriptDetailsComponent);
    const viewContainerRef = this.detailHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = this.componentRef.instance as BrowserScriptDetailsComponent;
    instance.browserScript = browserScript;
    instance.data = false;
    instance.updateForm();
    instance.update.subscribe((config) => this.onUpdateMultipleBrowserScripts(config));
    instance.delete.subscribe((config) => this.onDeleteMultipleBrowserScripts(this.selectedConfigs));

  }

  ngOnInit() {
    combineLatest(this.page, this.changes.pipe(startWith(null))).pipe(
      switchMap(([pageEvent]) => {
        return this.browserScriptService.search({
          page_size: pageEvent.pageSize,
          page: pageEvent.pageIndex
        });
      }),
    ).subscribe((reply) => {
      this.data.next({
        value: reply.value,
        pageLength: parseInt(reply.count, 10),
        pageSize: reply.page_size || 0,
        pageIndex: reply.page || 0,
      });
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.browserScriptService.get(id)
        .subscribe(response => {
          this.browserScript = response;
        });
    }
  }

  onPage(page: PageEvent) {
    this.page.next(page);
  }

  onLabelClick(label) {
    if (this.term.length > 0) {
      this.term = ',' + label;
    } else {
      this.term = label;
    }
  }

  onSearch(labelQuery: string[]) {
    console.log('in pageComp: ', labelQuery);
  }

  onSelectedChange(browserScripts: BrowserScript[]) {
    this.loadComponent(this.mergeBrowserScripts(browserScripts));
    this.selectedConfigs = browserScripts;
  }

  onCreateBrowserScript(): void {
    this.browserScript = new BrowserScript();
  }

  onSelectBrowserScript(browserScript: BrowserScript) {
    this.browserScript = browserScript;
  }

  onSaveBrowserScript(browserScript: BrowserScript) {
    this.browserScriptService.create(browserScript)
      .subscribe(newBrowserScript => {
        this.browserScript = newBrowserScript;
        this.changes.next();
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdateBrowserScript(browserScript: BrowserScript) {
    this.browserScriptService.update(browserScript)
      .subscribe(updatedBrowserScript => {
        this.browserScript = updatedBrowserScript;
        this.changes.next();
        this.snackBarService.openSnackBar('Oppdatert');
      });
  }

  onDeleteBrowserScript(browserScript: BrowserScript) {
    this.browserScriptService.delete(browserScript.id)
      .subscribe(response => {
        this.browserScript = null;
        this.changes.next();
        this.snackBarService.openSnackBar('Slettet');
      });
  }

  onDeleteMultipleBrowserScripts(browserScripts: BrowserScript[]) {
    const numOfConfigs = browserScripts.length.toString();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      numberOfConfigs: numOfConfigs
    };
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          from(browserScripts).pipe(
            mergeMap((browserScript) => this.browserScriptService.delete(browserScript.id)),
            catchError((err) => {
              console.log(err);
              return of('true');
            }),
          ).subscribe((response) => {
            this.selectedConfigs = [];
            this.componentRef.destroy();
            this.browserScript = null;
            this.changes.next();
            this.snackBarService.openSnackBar(numOfConfigs, ' konfigurasjoner slettet');
          });
        } else {
          this.snackBarService.openSnackBar('Sletter ikke konfigurasjonene');
        }
      });
  }

  onUpdateMultipleBrowserScripts(browserScriptUpdate: BrowserScript) {
    const numOfConfigs = this.selectedConfigs.length.toString();
    from(this.selectedConfigs).pipe(
      mergeMap((browserScript) => {
        browserScript.meta.label = updatedLabels(
          browserScriptUpdate.meta.label.concat(browserScript.meta.label));
        if (browserScriptUpdate.script.length > 0) {
          browserScript.script = browserScriptUpdate.script;
        }
          return this.browserScriptService.update(browserScript);
      }),
      catchError((err) => {
        console.log(err);
        return of('true');
      }),
    ).subscribe((response) => {
      this.selectedConfigs = [];
      this.componentRef.destroy();
      this.browserScript = null;
      this.changes.next();
      this.snackBarService.openSnackBar(numOfConfigs, ' konfigurasjoner er oppdatert');
    });
  }

  mergeBrowserScripts(browserScripts: BrowserScript[]) {
    const config = new BrowserScript();
    config.id = '1234567';
    config.meta.name = 'Multi';

    const label = browserScripts.reduce((acc: BrowserScript, curr: BrowserScript) => {
      config.meta.label = intersectLabel(acc.meta.label, curr.meta.label);
      return config;
    });
    return config;
  }
}

function intersectLabel(a, b) {
  const setA = Array.from(new Set(a));
  const setB = Array.from(new Set(b));
  const intersection = new Set(setA.filter((x: Label) =>
    setB.find((label: Label) => x.key === label.key && x.value === label.value) === undefined
      ? false
      : true
  ));
  return Array.from(intersection);
}

function updatedLabels(labels) {
  const result = labels.reduce((unique, o) => {
    if (!unique.find(obj => obj.key === o.key && obj.value === o.value)) {
      unique.push(o);
    }
    return unique;
  }, []);
  return result;
}

