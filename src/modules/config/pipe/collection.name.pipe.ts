import {Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {ConfigObject} from '../../../shared/models/config';


@Pipe({
  name: 'getCollectionName'
})
export class CollectionNamePipe implements PipeTransform {

  constructor(private route: ActivatedRoute) {
  }

  transform(configObject: ConfigObject): Observable<string> {
    return this.route.data.pipe(
      first(),
      map(data => {
        const found = data.options.collections.find(
          collection => collection.id === configObject.crawlConfig.collectionRef.id);
        return found ? found.meta.name : 'Collection';
      }));
  }
}
