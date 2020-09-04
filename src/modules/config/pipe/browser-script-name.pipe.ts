import {Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';


@Pipe({
  name: 'getBrowserScriptName'
})
export class BrowserScriptNamePipe implements PipeTransform {
  constructor(private route: ActivatedRoute) {
  }


  transform(id: string): Observable<string> {
    return this.route.data.pipe(
      first(),
      map(data => {
        const found = data.options.browserScripts.find(
          browserScript => browserScript.id === id);
        return found ? found.meta.name : 'browserScript';
      }));
  }
}
