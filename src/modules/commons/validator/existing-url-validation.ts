import {AbstractControl, ValidationErrors} from '@angular/forms';
import {from, Observable, of} from 'rxjs';
import {catchError, map, mergeMap, toArray} from 'rxjs/operators';
import {ConfigObject, Kind} from '../models';
import {BackendService} from '../../core/services';
import {FieldMask, ListRequest} from '../../../api';

function seedWithMatchingUrl(url: string): ListRequest {
  const request = new ListRequest();
  const template = new ConfigObject({kind: Kind.SEED});
  const mask = new FieldMask();

  mask.setPathsList(['meta.name']);
  template.meta.name = url;
  request.setKind(Kind.SEED.valueOf());
  request.setIdList([]);
  request.setQueryMask(mask);
  request.setQueryTemplate(ConfigObject.toProto(template));

  return request;
}

export class SeedUrlValidator {


  static createValidator(backendService: BackendService) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const urls: string = control.value.split(/\s+/).filter(u => !!u);
      return from(urls).pipe(
        mergeMap((url) => backendService.list(seedWithMatchingUrl(url))),
        map(configObject => ConfigObject.fromProto(configObject)),
        toArray(),
        map((seeds: ConfigObject[]) => seeds.length > 0 ? {seedExists: seeds} : null),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      );
    };
  }
}

