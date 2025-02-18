import {Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OptionsService} from '../services/options.service';


@Pipe({
    name: 'getBrowserScriptName',
    standalone: false
})
export class BrowserScriptNamePipe implements PipeTransform {
  constructor(private route: ActivatedRoute, private optionsService: OptionsService) {
  }


  transform(id: string): Observable<string> {
    return this.optionsService.options$.pipe(
      map(options => {
        if (options.browserScripts) {
          const found = options.browserScripts.find(_ => _.id === id);
          return found ? found.meta.name : '';
        }
        if (options.scopeScripts) {
          const found = options.scopeScripts.find(_ => _.id === id);
          return found ? found.meta.name : '';
        }
      }));
  }
}
