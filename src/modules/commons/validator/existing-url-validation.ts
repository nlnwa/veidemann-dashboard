import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {from, Observable, of} from 'rxjs';
import {catchError, map, mergeMap, tap, toArray} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ConfigObject, Kind} from '../models';
import {BackendService} from '../../core/services';
import {FieldMask, ListRequest} from '../../../api';

@Injectable()
export class SeedUrlValidator implements AsyncValidator {


  constructor(private backendService: BackendService) {
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>;
  validate(control: AbstractControl): ValidationErrors | null;
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> | ValidationErrors | null {

    const urls: string = control.value.split(/\s+/).filter(u => !!u);

    return from(urls).pipe(
      mergeMap((url) => this.seedExists(url)),
      toArray(),
      map((seeds: ConfigObject[]) => seeds.length > 0 ? {seedExists: seeds} : null),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }


  seedExists(seed: string): Observable<ConfigObject> {
    const request = new ListRequest();
    const template = new ConfigObject({kind: Kind.SEED});
    const mask = new FieldMask();

    mask.setPathsList(['meta.name']);
    template.meta.name = seed;
    request.setKind(Kind.SEED.valueOf());
    request.setIdList([]);
    request.setQueryMask(mask);
    request.setQueryTemplate(ConfigObject.toProto(template));

    return this.backendService.list(request)
      .pipe(
        map(configObject => ConfigObject.fromProto(configObject))
      );
  }

}

