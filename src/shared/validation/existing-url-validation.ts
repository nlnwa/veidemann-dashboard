import {AbstractControl, ValidationErrors} from '@angular/forms';
import {from, Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, toArray} from 'rxjs/operators';
import {ConfigObject, ConfigRef, Kind} from '../models';
import {ConfigApiService} from '../../modules/core/services';
import {ListRequest} from '../../api';
import {createSimilarDomainRegExpString} from './patterns';
import {createListRequest} from '../../modules/config/func/query';


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
  static createBackendValidator(configService: ConfigApiService) {
    return (entityRef: ConfigRef) => (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!entityRef) {
        return of({missingEntityRef: true});
      }
      // split input urls by whitespace
      const urls: string = control.value.split(/\s+/).filter(url => !!url);
      return from(urls).pipe(
        map(url => seedWithMatchingUrl(url)),
        filter(_ => !!_),
        mergeMap(request => configService.list(request)),
        toArray(),
        map((seeds: ConfigObject[]) => {
          if (seeds.length === 0) {
            return null;
          }
          const seedsOnSameDomain = seeds.filter(seed => seed.seed.entityRef.id === entityRef.id);
          const seedsOnOtherDomain = seeds.filter(seed => seed.seed.entityRef.id !== entityRef.id);
          const validationErrors = Object.assign({},
            seedsOnOtherDomain.length ? {seedExists: seedsOnOtherDomain} : {},
            seedsOnSameDomain.length ? {seedExistsOnEntity: seedsOnSameDomain} : {});
          return validationErrors;
        }),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      );
    };
  }
}

