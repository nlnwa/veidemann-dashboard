import {AbstractControl, ValidationErrors} from '@angular/forms';
import {from, Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, toArray} from 'rxjs/operators';
import {ConfigObject, Kind} from '../models';
import {BackendService} from '../../core/services';
import {ListRequest} from '../../../api';
import {createListRequest} from '../../configurations/services/data/data.service';
import {createSimilarDomainRegExpString, VALID_URL} from './patterns';
import {SeedDataService} from '../../configurations/services/data';

function seedWithMatchingUrl(url: string): ListRequest | null {
  const request = createListRequest(Kind.SEED);
  const similarUrlRegexp = createSimilarDomainRegExpString(url);
  if (similarUrlRegexp) {
    request.setNameRegex(similarUrlRegexp);
    return request;
  } else {
    return null;
  }
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
        map(url => seedWithMatchingUrl(url)),
        filter(_ => !!_),
        mergeMap(request => backendService.list(request)),
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
    if (!seedDataService) {
      return () => null;
    }
    return (control: AbstractControl): ValidationErrors | null => {
      const urlsWithinSameEntity = seedDataService.data.map(configObject => configObject.meta.name);
      const urls: string[] = control.value.split(/\s+/).filter(_ => !!_);

      for (const url of urls) {
        const match = url.match(VALID_URL);
        if (!match) {
          return {pattern: url};
        }
      }
      const intersection = urls.filter(url => {
        const similarUrlRegexp = createSimilarDomainRegExpString(url);
        if (similarUrlRegexp === null) {
          return false;
        }
        const similarUrlPredicate = (u) => (new RegExp(similarUrlRegexp).test(u));
        return urlsWithinSameEntity.find(similarUrlPredicate);
      });

      return intersection.length ? {seedExistsOnEntity: intersection} : null;
    };
  }
}

