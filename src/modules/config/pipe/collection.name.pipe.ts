import {Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ConfigObject} from '../../../shared/models/config';
import {OptionsService} from '../services/options.service';


@Pipe({
    name: 'getCollectionName',
    standalone: false
})
export class CollectionNamePipe implements PipeTransform {

  constructor(private route: ActivatedRoute, private optionsService: OptionsService) {
  }

  transform(configObject: ConfigObject): Observable<string> {
    return this.optionsService.options$.pipe(
      map(options => {
        const found = options.collections.find(
          collection => collection.id === configObject.crawlConfig.collectionRef.id);
        return found ? found.meta.name : 'Collection';
      }));
  }
}
