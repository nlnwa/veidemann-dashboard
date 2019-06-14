import {Injectable, OnDestroy} from '@angular/core';
import {combineLatest, EMPTY, Observable, of, Subject} from 'rxjs';
import {DataService} from './data';
import {catchError, count, debounceTime, filter, map, mergeMap, share, shareReplay, switchMap, tap} from 'rxjs/operators';
import {pathToKind} from '../func/kind';
import {ConfigObject, Kind} from '../../commons/models';
import {ActivatedRoute} from '@angular/router';
import {ReferrerError} from '../../commons/error';
import {ErrorService} from '../../core/services';

@Injectable()
export class ConfigurationsService implements OnDestroy {

  kind$: Observable<Kind>;
  configObject$: Observable<ConfigObject>;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(protected dataService: DataService,
              protected route: ActivatedRoute,
              protected errorService: ErrorService) {

    // stream of kind (when path changes)
    this.kind$ = route.paramMap.pipe(
      map(params => params.get('kind')),
      map(kind => pathToKind(kind)),
      filter((kind: Kind) => kind !== Kind.UNDEFINED),
      tap(kind => this.dataService.kind = kind),
      shareReplay(1)
    );

    // stream of id (when query parameter id changes)
    const queryParam$ = route.queryParamMap.pipe(
      map(queryParamMap => queryParamMap.get('id')),
    );

    this.configObject$ = combineLatest([this.kind$, queryParam$]).pipe(
      debounceTime(0), // synchronize
      mergeMap(([kind, id]: [Kind, string]) => id ? this.dataService.get({id, kind}) : of(null)),
      share()
    );
  }

  get loading$(): Observable<boolean> {
    return this.dataService.loading$;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  reload() {
    this.dataService.reset();
    this.dataService.resetPaginator();
  }

  move(configObject: ConfigObject): Observable<number> {
    return this.dataService.move(configObject)
      .pipe(
        switchMap(updated => {
          if (updated > 0) {
            return this.dataService.seedsOfEntity(configObject).pipe(
              switchMap(nrOfSeeds => {
                if (nrOfSeeds === 0) {
                  const config = new ConfigObject({kind: Kind.CRAWLENTITY, id: configObject.seed.entityRef.id});

                  // TODO
                  // should not delete entity but label seed and entity or something
                  return of(null);
                }
              }),
              map(() => updated));
          } else {
            return of(updated);
          }
        })
      );
  }

  save(configObject: ConfigObject) {
    return this.dataService.save(configObject);
  }

  saveMultiple(configObjects: ConfigObject[]) {
    return this.dataService.saveMultiple(configObjects);
  }

  update(configObject: ConfigObject) {
    return this.dataService.update(configObject);
  }

  updateWithTemplate(updateTemplate: ConfigObject, paths: string[], ids?: string[]): Observable<number> {
    return this.dataService.updateWithTemplate(updateTemplate, paths, ids);
  }

  delete(configObject: ConfigObject) {
    return this.dataService.delete(configObject)
      .pipe(
        catchError((error) => {
          if (error.message) {
            const errorString = error.message.split(':')[1];
            const deleteError = /(?=.*delete)(?=.*there are)/gm;
            if (deleteError.test(errorString)) {
              this.errorService.dispatch(new ReferrerError({errorString, configObject}));
            } else {
              this.errorService.dispatch(error);
            }
          } else {
            this.errorService.dispatch(error);
          }
          return EMPTY;
        })
      );
  }

  deleteMultiple(configObjects: ConfigObject[]): Observable<number> {
    return this.dataService.deleteMultiple(configObjects)
      .pipe(
        catchError((err) => {
          this.errorService.dispatch(err);
          return of(false);
        }),
        count(deleted => deleted)
      );
  }
}
