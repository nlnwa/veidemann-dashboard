import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';
import {BrowserConfig, BrowserScript, Label} from '../../commons/models/config.model';
import {BrowserConfigService} from './browserconfig.service';
import {BrowserScriptService} from '../browserscript/browserscript.service';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {combineLatest, from, Subject} from 'rxjs';
import {catchError, map, mergeMap, startWith, switchMap} from 'rxjs/operators';

import {ActivatedRoute, Router} from '@angular/router';
import {DetailDirective} from '../shared/detail.directive';
import {RoleService} from '../../auth';
import {FormBuilder, Validators} from '@angular/forms';
import {BrowserConfigDetailsComponent} from './browserconfig-details/browserconfig-details.component';
import {of} from 'rxjs/internal/observable/of';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-browserconfig',
  template: `
    <app-search-config [term]="term"
                       (submit)="onSearch($event)"></app-search-config>
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span class="toolbar--title">Browserconfigs</span>
          <button mat-mini-fab (click)="onCreateBrowserConfig()">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-browserconfig-list (rowClick)="onSelectBrowserConfig($event)"
                                [data]="data$ | async"
                                (selectedChange)="onSelectedChange($event)"
                                (labelClicked)="onLabelClick($event)"
                                (page)="onPage($event)">
        </app-browserconfig-list>
      </div>
      <app-browserconfig-details [browserConfig]="browserConfig"
                                 [browserScripts]="browserScripts"
                                 *ngIf="browserConfig && browserScripts && singleMode"
                                 (update)="onUpdateBrowserConfig($event)"
                                 (save)="onSaveBrowserConfig($event)"
                                 (delete)="onDeleteBrowserConfig($event)">
      </app-browserconfig-details>
      <ng-template detail-host *ngIf="browserConfig"></ng-template>
    </div>
  `,
  styleUrls: [],
})

export class BrowserConfigPageComponent implements OnInit {

  selectedConfigs = [];
  term = '';
  componentRef = null;

  browserConfig: BrowserConfig;
  browserScripts: BrowserScript[];
  changes: Subject<void> = new Subject<void>();
  page: Subject<PageEvent> = new Subject<PageEvent>();
  data = new Subject<any>();
  data$ = this.data.asObservable();

  @ViewChild(DetailDirective) detailHost: DetailDirective;

  constructor(private browserConfigService: BrowserConfigService,
              private browserScriptService: BrowserScriptService,
              private snackBarService: SnackBarService,
              private route: ActivatedRoute,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver,
              private fb: FormBuilder,
              private roleService: RoleService,
              private dialog: MatDialog) {
  }

  get singleMode(): boolean {
    return this.selectedConfigs.length < 2;
  }

  ngOnInit() {
    // Load prerequisites for app-browserconfig-detail
    this.browserScriptService.list().pipe(map(reply => reply.value))
      .subscribe(browserScripts => {
        this.browserScripts = browserScripts;
      });

    combineLatest(this.page, this.changes.pipe(startWith(null))).pipe(
      switchMap(([pageEvent]) => {
        return this.browserConfigService.search({
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
      this.browserConfigService.get(id)
        .subscribe(browserConfig => {
          this.browserConfig = browserConfig;
        });
    }
  }

  loadComponent(browserConfig: BrowserConfig, browserScripts: BrowserScript[]) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BrowserConfigDetailsComponent);
    const viewContainerRef = this.detailHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = this.componentRef.instance as BrowserConfigDetailsComponent;
    instance.browserConfig = browserConfig;
    instance.browserScriptList = browserScripts.map((browserScript) => ({
      id: browserScript.id,
      itemName: browserScript.meta.name,
    }));
    // instance.form.get('user_agent').setValidators(Validators.minLength(1));
    // instance.form.get('window_width').setValidators(Validators.min(1));
    // instance.form.get('window_height').setValidators(Validators.min(1));
    // instance.form.get('page_load_timeout_ms').setValidators(Validators.min(0));
    // instance.form.get('sleep_after_pageload_ms').setValidators(Validators.min(0));
    instance.form.get('user_agent').clearValidators();
    instance.form.get('window_width').clearValidators();
    instance.form.get('window_height').clearValidators();
    instance.form.get('page_load_timeout_ms').clearValidators();
    instance.form.get('sleep_after_pageload_ms').clearValidators();
    instance.data = false;
    instance.updateForm();
    instance.update.subscribe(
      (browserConfigs) => this.onUpdateMultipleBrowserConfigs(browserConfigs));
    instance.delete.subscribe(
      () => this.onDeleteMultipleBrowserConfigs(this.selectedConfigs));
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
    console.log('in pagecomp ', labelQuery);
  }

  onSelectedChange(browserConfigs: BrowserConfig[]) {
    this.selectedConfigs = browserConfigs;
    if (!this.singleMode) {
      this.loadComponent(this.mergeBrowserConfigs(browserConfigs), this.browserScripts);
    } else {
      this.browserConfig = browserConfigs[0];
      if (this.componentRef !== null) {
        this.componentRef.destroy();
      }
      if (this.browserConfig === undefined) {
        this.browserConfig = null;
      }
    }
  }

  onCreateBrowserConfig(): void {
    this.browserConfig = new BrowserConfig();
  }

  onSelectBrowserConfig(browserConfig: BrowserConfig) {
    this.router.navigate(['browserconfig', browserConfig.id]);
    this.browserConfig = browserConfig;
  }

  onSaveBrowserConfig(browserConfig: BrowserConfig) {
    this.browserConfigService.create(browserConfig)
      .subscribe(newBrowserConfig => {
        this.browserConfig = newBrowserConfig;
        this.changes.next();
        this.snackBarService.openSnackBar('Lagret');
      });
    this.changes.next();
  }

  onUpdateBrowserConfig(browserConfig: BrowserConfig) {
    this.browserConfigService.update(browserConfig)
      .subscribe(updatedBrowserConfig => {
        this.browserConfig = updatedBrowserConfig;
        this.changes.next();
        this.snackBarService.openSnackBar('Oppdatert');
      });
  }

  onUpdateMultipleBrowserConfigs(browserConfigUpdate: BrowserConfig) {
    const numOfConfigs = this.selectedConfigs.length.toString();
    from(this.selectedConfigs).pipe(
      mergeMap((browserConfig: BrowserConfig) => {
        if (browserConfig.meta.label === undefined) {
          browserConfig.meta.label = [];
        }
        browserConfig.meta.label = updatedLabels(browserConfigUpdate.meta.label.concat(browserConfig.meta.label));
        if (browserConfigUpdate.user_agent !== '') {
          browserConfig.user_agent = browserConfigUpdate.user_agent;
        }
        if (browserConfigUpdate.window_width !== 0 ) {
          browserConfig.window_width = browserConfigUpdate.window_width;
        }
        if (browserConfigUpdate.window_height !== 0 ) {
          browserConfig.window_height = browserConfigUpdate.window_height;
        }
        if (browserConfigUpdate.page_load_timeout_ms !== '') {
          browserConfig.page_load_timeout_ms = browserConfigUpdate.page_load_timeout_ms;
        }
        if (browserConfigUpdate.sleep_after_pageload_ms !== '') {
          browserConfig.sleep_after_pageload_ms = browserConfigUpdate.sleep_after_pageload_ms;
        }

        //TODO sjekke hele arrayet
        if (browserConfigUpdate.script_id !== ['']) {
          browserConfig.script_id = browserConfigUpdate.script_id;
        }
        return this.browserConfigService.update(browserConfig);
      }),
      catchError((err) => {
        console.log(err);
        return of('true');
      }),
    ).subscribe(() => {
      this.selectedConfigs = [];
      this.componentRef.destroy();
      this.browserConfig = null;
      this.changes.next();
      this.snackBarService.openSnackBar(numOfConfigs, 'konfigurasjoner er oppdatert');
    });
  }

  onDeleteBrowserConfig(browserConfig: BrowserConfig) {
    this.browserConfigService.delete(browserConfig.id)
      .subscribe(() => {
        this.browserConfig = null;
        this.changes.next();
        this.snackBarService.openSnackBar('Slettet');
      });
  }

  onDeleteMultipleBrowserConfigs(browserConfigs: BrowserConfig[]) {
    const numOfConfigs = browserConfigs.length.toString();
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
          from(browserConfigs).pipe(
            mergeMap((config) => this.browserConfigService.delete(config.id)),
            catchError((err) => {
              console.log(err);
              return of('true');
            }),
          ).subscribe(() => {
            this.selectedConfigs = [];
            this.componentRef.destroy();
            this.browserConfig = null;
            this.changes.next();
            this.snackBarService.openSnackBar(numOfConfigs, ' konfigurasjoner slettet');
          });
        } else {
          this.snackBarService.openSnackBar('Sletter ikke konfigurasjonene');
        }
      });
  }

  mergeBrowserConfigs(browserConfigs: BrowserConfig[]) {
    const config = new BrowserConfig();
    const compareObj = browserConfigs[0];
    config.id = '1234567';
    config.meta.name = 'Multi';

    const equalUserAgent = browserConfigs.every(function (cfg) {
      return cfg.user_agent === compareObj.user_agent;
    });

    const equalWindowWidth = browserConfigs.every(function (cfg) {
      return cfg.window_width === compareObj.window_width;
    });

    const equalWindowHeight = browserConfigs.every(function (cfg) {
      return cfg.window_height === compareObj.window_height;
    });

    const equalPageLoadTimeout = browserConfigs.every(function (cfg) {
      return cfg.page_load_timeout_ms === compareObj.page_load_timeout_ms;
    });

    const equalSleepAfterPageload = browserConfigs.every(function (cfg) {
      return cfg.sleep_after_pageload_ms === compareObj.sleep_after_pageload_ms;
    });

    const equalBrowserScript = browserConfigs.every(function (cfg) {
      return cfg.script_id === compareObj.script_id;
    });

    if (equalUserAgent) {
      config.user_agent = compareObj.user_agent;
    }

    if (equalWindowWidth) {
      config.window_width = compareObj.window_width;
    }

    if (equalWindowHeight) {
      config.window_height = compareObj.window_height;
    }

    if (equalPageLoadTimeout) {
      config.page_load_timeout_ms = compareObj.page_load_timeout_ms;
    }

    if (equalSleepAfterPageload) {
      config.sleep_after_pageload_ms = compareObj.sleep_after_pageload_ms;
    }

    if (equalBrowserScript) {
      config.script_id = compareObj.script_id;
    } else {
      config.script_id = [];
    }

    const label = browserConfigs.reduce((acc: BrowserConfig, curr: BrowserConfig) => {
      config.meta.label = intersectLabel(acc.meta.label, curr.meta.label);
      return config;
    });
    console.log('browserConfigUpdate: ', config);
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


//TODO add intersectBrowserScript concat
