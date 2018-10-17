import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';
import {BrowserScript, Label} from '../../commons/models/config.model';
import {BrowserScriptService} from './browserscript.service';
import {SnackBarService} from 'app/commons/snack-bar/snack-bar.service';
import {combineLatest, from, Subject} from 'rxjs';
import {catchError, mergeMap, startWith, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {DetailDirective} from '../shared/detail.directive';
import {RoleService} from '../../auth';
import {FormBuilder} from '@angular/forms';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';
import {BrowserScriptDetailsComponent} from './browserscript-details/browserscript-details.component';
import {ActivatedRoute} from '@angular/router';
import {getInitialLabels, updatedLabels, findLabel, intersectLabel} from '../../commons/group-update/labels/common-labels';

@Component({
  selector: 'app-browserscript',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span class="toolbar--title">Browserscript</span>
          <button mat-mini-fab (click)="onCreateBrowserScript()"
                  [disabled]="!singleMode ? true : false"
                  [matTooltip]="!singleMode ? 'Kan ikke opprette en ny konfigurasjon når flere er valgt.':'Legg til en ny konfigurasjon.'">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-selection-base-list (rowClick)="onSelectBrowserScript($event)"
                                 [data]="data$ | async"
                                 (selectedChange)="onSelectedChange($event)"
                                 (selectAll)="onSelectAll($event)"
                                 (page)="onPage($event)">
        </app-selection-base-list>
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

  selectedConfigs = [];
  componentRef = null;
  allSelected = false;

  browserScript: BrowserScript;
  changes: Subject<void> = new Subject<void>();
  page: Subject<PageEvent> = new Subject<PageEvent>();
  data = new Subject<any>();
  data$ = this.data.asObservable();

  @ViewChild(DetailDirective) detailHost: DetailDirective;

  constructor(private browserScriptService: BrowserScriptService,
              private snackBarService: SnackBarService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private fb: FormBuilder,
              private roleService: RoleService,
              private dialog: MatDialog,
              private route: ActivatedRoute) {
  }

  get singleMode(): boolean {
    return this.selectedConfigs.length < 2;
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

  loadComponent(browserScript: BrowserScript, labels: Label[]) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BrowserScriptDetailsComponent);
    const viewContainerRef = this.detailHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = this.componentRef.instance as BrowserScriptDetailsComponent;
    instance.browserScript = browserScript;
    instance.data = false;
    instance.updateForm();

    if (!this.allSelected) {
      instance.update.subscribe((browserScripts) => this.onUpdateMultipleBrowserScripts(browserScripts, labels));
      instance.delete.subscribe(() => this.onDeleteMultipleBrowserScripts(this.selectedConfigs));
    }

    if (this.allSelected) {
      instance.update.subscribe((browserScriptUpdate) => this.onUpdateAllBrowserScripts(browserScriptUpdate));
      instance.delete.subscribe(() => this.onDeleteAllBrowserScripts());
    }

  }

  onPage(page: PageEvent) {
    this.page.next(page);
  }

  onSelectedChange(browserScripts: BrowserScript[]) {
    this.selectedConfigs = browserScripts;
    if (!this.singleMode) {
      if (!this.allSelected) {
        this.loadComponent(this.mergeBrowserScripts(browserScripts), getInitialLabels(browserScripts, BrowserScript));
      } else {
        const browserScript = new BrowserScript();
        browserScript.id = '1234567';
        browserScript.meta.name = 'update';
        this.loadComponent(browserScript, []);
      }
    } else {
      this.browserScript = browserScripts[0];
      if (this.componentRef !== null) {
        this.componentRef.destroy();
      }
      if (this.browserScript === undefined) {
        this.browserScript = null;
      }
    }
  }

  onCreateBrowserScript(): void {
    this.browserScript = new BrowserScript();
  }

  onSelectBrowserScript(browserScript: BrowserScript) {
    this.browserScript = browserScript;
  }

  onSelectAll(allSelected: boolean) {
    this.allSelected = allSelected;
    if (allSelected) {
      this.onSelectedChange([new BrowserScript(), new BrowserScript()]);
    } else {
      this.onSelectedChange([]);
      this.componentRef.destroy();
    }
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
      .subscribe(() => {
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
          ).subscribe(() => {
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

  onUpdateMultipleBrowserScripts(browserScriptUpdate: BrowserScript, initialLabels: Label[]) {
    const numOfConfigs = this.selectedConfigs.length.toString();
    from(this.selectedConfigs).pipe(
      mergeMap((browserScript) => {
        if (browserScript.meta.label === undefined) {
          browserScript.meta.label = [];
        }
        browserScript.meta.label = updatedLabels(browserScriptUpdate.meta.label.concat(browserScript.meta.label));
        for (const label of initialLabels) {
          if (!findLabel(browserScriptUpdate.meta.label, label.key, label.value)) {
            browserScript.meta.label.splice(
              browserScript.meta.label.findIndex(
                removedLabel => removedLabel.key === label.key && removedLabel.value === label.value),
              1);
          }
        }
        if (browserScriptUpdate.script.length > 0) {
          browserScript.script = browserScriptUpdate.script;
        }
        return this.browserScriptService.update(browserScript);
      }),
      catchError((err) => {
        console.log(err);
        return of('true');
      }),
    ).subscribe(() => {
      this.selectedConfigs = [];
      this.componentRef.destroy();
      this.browserScript = null;
      this.changes.next();
      this.snackBarService.openSnackBar(numOfConfigs, ' konfigurasjoner er oppdatert');
    });
  }

  onUpdateAllBrowserScripts(browserScriptUpdate: BrowserScript) {
    console.log('Alle browserscripts i database skal oppdateres med denne configen', browserScriptUpdate);
  }

  onDeleteAllBrowserScripts() {
    console.log('Skal slette alle browserscripts i database');
  }

  mergeBrowserScripts(browserScripts: BrowserScript[]) {
    const config = new BrowserScript();
    config.id = '1234567';
    config.meta.name = 'Multi';
    const compareObj = browserScripts[0];
    const label = browserScripts.reduce((acc: BrowserScript, curr: BrowserScript) => {
      config.meta.label = intersectLabel(acc.meta.label, curr.meta.label);
      return config;
    });
    const script = browserScripts.every(function (cfg) {
      return cfg.script === compareObj.script;
    });

    if (script) {
      config.script = compareObj.script;
    } else {
      config.script = '';
    }
    return config;
  }
}

