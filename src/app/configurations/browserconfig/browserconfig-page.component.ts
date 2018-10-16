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
import {FormBuilder} from '@angular/forms';
import {BrowserConfigDetailsComponent} from './browserconfig-details/browserconfig-details.component';
import {of} from 'rxjs/internal/observable/of';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';
import {findLabel, getInitialLabels, intersectLabel, updatedLabels} from '../../commons/group-update/labels/common-labels';
import {findSelector, getInitialSelectors, intersectSelector, updatedSelectors} from '../../commons/group-update/labels/common-selector';

@Component({
  selector: 'app-browserconfig',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span class="toolbar--title">Browserconfigs</span>
          <button mat-mini-fab (click)="onCreateBrowserConfig()"
                  [disabled]="!singleMode ? true : false"
                  [matTooltip]="!singleMode ? 'Kan ikke opprette en ny konfigurasjon når flere er valgt.':'Legg til en ny konfigurasjon.'">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-selection-base-list (rowClick)="onSelectBrowserConfig($event)"
                                 [data]="data$ | async"
                                 (selectedChange)="onSelectedChange($event)"
                                 (selectAll)="onSelectAll($event)"
                                 (page)="onPage($event)">
        </app-selection-base-list>
      </div>
      <app-browserconfig-details [browserConfig]="browserConfig"
                                 [browserScripts]="browserScripts"
                                 *ngIf="browserConfig && browserScripts && singleMode"
                                 (update)="onUpdateBrowserConfig($event)"
                                 (save)="onSaveBrowserConfig($event)"
                                 (delete)="onDeleteBrowserConfig($event)">
      </app-browserconfig-details>
      <ng-template detail-host></ng-template>
    </div>
  `,
  styleUrls: [],
})

export class BrowserConfigPageComponent implements OnInit {

  selectedConfigs = [];
  componentRef = null;
  allSelected = false;

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

  loadComponent(browserConfig: BrowserConfig, browserScripts: BrowserScript[], labels: Label[], selectors: string[]) {
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
    instance.data = false;
    instance.updateForm();

    if (!this.allSelected) {
      instance.update.subscribe(
        (browserConfigs) => this.onUpdateMultipleBrowserConfigs(browserConfigs, labels, selectors));
      instance.delete.subscribe(
        () => this.onDeleteMultipleBrowserConfigs(this.selectedConfigs));
    }

    if (this.allSelected) {
      instance.update.subscribe((browserConfigUpdate) => this.onUpdateAllBrowserConfigs(browserConfigUpdate));
      instance.delete.subscribe(() => this.onDeleteAllBrowserConfigs());
    }
  }

  onPage(page: PageEvent) {
    this.page.next(page);
  }

  onSelectedChange(browserConfigs: BrowserConfig[]) {
    this.selectedConfigs = browserConfigs;
    if (!this.singleMode) {
      if(!this.allSelected) {
        this.loadComponent(
          this.mergeBrowserConfigs(browserConfigs),
          this.browserScripts,
          getInitialLabels(browserConfigs, BrowserConfig),
          getInitialSelectors(browserConfigs, BrowserConfig));
      } else {
        const browserConfig = new BrowserConfig();
        browserConfig.id = '1234567';
        browserConfig.meta.name = 'update';
        this.loadComponent(browserConfig, this.browserScripts, [], []);
      }
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

  onSelectAll(allSelected: boolean) {
    this.allSelected = allSelected;
    if (allSelected) {
      this.onSelectedChange([new BrowserConfig(), new BrowserConfig()]);
    } else {
      this.onSelectedChange([]);
      this.componentRef.destroy();
    }
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

  onUpdateMultipleBrowserConfigs(browserConfigUpdate: BrowserConfig, initialLabels: Label[], initialSelectors: string[]) {
    const numOfConfigs = this.selectedConfigs.length.toString();
    from(this.selectedConfigs).pipe(
      mergeMap((browserConfig: BrowserConfig) => {
        if (browserConfig.meta.label === undefined) {
          browserConfig.meta.label = [];
        }
        browserConfig.meta.label = updatedLabels(browserConfigUpdate.meta.label.concat(browserConfig.meta.label));
        for (const label of initialLabels) {
          if (!findLabel(browserConfigUpdate.meta.label, label.key, label.value)) {
            browserConfig.meta.label.splice(
              browserConfig.meta.label.findIndex(
                removedLabel => removedLabel.key === label.key && removedLabel.value === label.value),
              1);
          }
        }
        if (browserConfig.script_selector === undefined) {
          browserConfig.script_selector = [];
        }
        browserConfig.script_selector = updatedSelectors(browserConfigUpdate.script_selector
          .concat(browserConfig.script_selector));

        for (const selector of initialSelectors) {
          if (!findSelector(browserConfigUpdate.script_selector, selector)) {
            browserConfig.script_selector.splice(
              browserConfig.script_selector.findIndex(
                removedSelector => removedSelector === selector), 1);
          }
        }

        if (browserConfigUpdate.user_agent !== '') {
          browserConfig.user_agent = browserConfigUpdate.user_agent;
        }
        if (!isNaN(browserConfigUpdate.window_width)) {
          browserConfig.window_width = browserConfigUpdate.window_width;
        }
        if (!isNaN(browserConfigUpdate.window_height)) {
          browserConfig.window_height = browserConfigUpdate.window_height;
        }
        if (!isNaN(browserConfigUpdate.page_load_timeout_ms)) {
          browserConfig.page_load_timeout_ms = browserConfigUpdate.page_load_timeout_ms;
        }
        if (!isNaN(browserConfigUpdate.sleep_after_pageload_ms)) {
          browserConfig.sleep_after_pageload_ms = browserConfigUpdate.sleep_after_pageload_ms;
        }

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

  mergeBrowserConfigs(browserConfigs: BrowserConfig[]): BrowserConfig {
    const config = new BrowserConfig();
    const compareObj = browserConfigs[0];
    const commonScripts = commonScript(browserConfigs);
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

    if (equalUserAgent) {
      config.user_agent = compareObj.user_agent;
    }

    if (equalWindowWidth) {
      config.window_width = compareObj.window_width;
    } else {
      config.window_width = null;
    }

    if (equalWindowHeight) {
      config.window_height = compareObj.window_height;
    } else {
      config.window_height = null;
    }

    if (equalPageLoadTimeout) {
      config.page_load_timeout_ms = compareObj.page_load_timeout_ms;
    } else {
      config.page_load_timeout_ms = null;
    }

    if (equalSleepAfterPageload) {
      config.sleep_after_pageload_ms = compareObj.sleep_after_pageload_ms;
    } else {
      config.sleep_after_pageload_ms = null;
    }

    for (const browserConfig of browserConfigs) {
      for (const script of commonScripts) {
        if (browserConfig.script_id.includes(script)) {
        } else {
          commonScripts.splice(commonScripts.indexOf(script), 1);
        }
      }
    }
    config.script_id = commonScripts;

    const label = browserConfigs.reduce((acc: BrowserConfig, curr: BrowserConfig) => {
      config.meta.label = intersectLabel(acc.meta.label, curr.meta.label);
      return config;
    });

    const selector = browserConfigs.reduce((acc: BrowserConfig, curr: BrowserConfig) => {
      if (acc.script_selector === undefined || curr.script_selector === undefined) {
        acc.script_selector = [];
        curr.script_selector = [];
      }
      config.script_selector = intersectSelector(acc.script_selector, curr.script_selector);
      return config;
    });
    return config;
  }

  // WIP
  onUpdateAllBrowserConfigs(browserConfigUpdate: BrowserConfig) {
    console.log('Alle browserconfigs markert, opdaterer alle med denne configen: ', browserConfigUpdate);
  }
  onDeleteAllBrowserConfigs() {
    console.log('skal slette alle browserconfigs');
  }

}

function commonScript(browserConfigs: BrowserConfig[]) {
  const allConfigs = [];
  for (const configs of browserConfigs) {
    if (configs.script_id !== undefined) {
      allConfigs.push(configs.script_id);
    }
  }
  const mergedScripts = [].concat.apply([], allConfigs);
  const uniqueScripts = mergedScripts.filter(function (elem, index, self) {
    return index === self.indexOf(elem);
  });
  return uniqueScripts;
}



