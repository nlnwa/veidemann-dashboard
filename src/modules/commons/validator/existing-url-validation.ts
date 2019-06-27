import {AbstractControl, ValidationErrors} from '@angular/forms';
import {from, Observable, of} from 'rxjs';
import {catchError, map, mergeMap, toArray} from 'rxjs/operators';
import {ConfigObject, Kind} from '../models';
import {BackendService} from '../../core/services';
import {ListRequest} from '../../../api';
import {createListRequest} from '../../configurations/services/data/data.service';

function seedWithMatchingUrl(url: string): ListRequest {
  const urlRegex = url;

  const request = createListRequest(Kind.SEED);
  request.setNameRegex(urlRegex);

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

