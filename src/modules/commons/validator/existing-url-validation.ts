import {AbstractControl, ValidationErrors} from '@angular/forms';
import {from, Observable, of} from 'rxjs';
import {catchError, map, mergeMap, toArray} from 'rxjs/operators';
import {ConfigObject, Kind} from '../models';
import {BackendService} from '../../core/services';
import {ListRequest} from '../../../api';
import {createListRequest} from '../../configurations/services/data/data.service';
import {createSimilarDomainRegExpString} from './patterns';
import {SeedDataService} from '../../configurations/services/data';

function seedWithMatchingUrl(url: string): ListRequest {
  const request = createListRequest(Kind.SEED);

  request.setNameRegex(createSimilarDomainRegExpString(url));

  return request;
}

export class SeedUrlValidator {
  /**
   * @returns An async validator that checks with a backend service if any of
   * the url's from the control already exists
   */
  static createBackendValidator(backendService: BackendService) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const urls: string = control.value.split(/\s+/).filter(url => !!url);
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

  /**
   * @returns A validator that checks with the seedDataService (local) exists on same entity
   */
  static createValidator(seedDataService: SeedDataService) {
    return (control: AbstractControl): ValidationErrors | null => {
      const urlsWithinSameEntity = seedDataService.data.map(configObject => configObject.meta.name);
      const urls: string[] = control.value.split(/\s+/).filter(_ => !!_);

      const intersection = urls.filter(url => {
        const similarUrlPredicate = (u) => (new RegExp(createSimilarDomainRegExpString(url)).test(u));
        return urlsWithinSameEntity.find(similarUrlPredicate);
      });

      return intersection.length ? {seedExistsOnEntity: intersection} : null;
    };
  }
}

