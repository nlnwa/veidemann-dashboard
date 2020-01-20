import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {GetLabelKeysRequest, LabelKeysResponse} from '../../../api';
import {map} from 'rxjs/operators';
import {ConfigApiService} from '../../core/services';
import {Kind} from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  // tslint:disable-next-line:variable-name
  private _kind: Kind;

  constructor(private configService: ConfigApiService) {
  }

  get kind(): Kind {
    return this._kind;
  }

  set kind(kind: Kind) {
    this._kind = kind;
  }

  getLabelKeys(): Observable<string[]> {
    if (!this.kind) {
      return of([]);
    }
    const request = new GetLabelKeysRequest();
    request.setKind(this._kind.valueOf());
    return this.configService.getLabelKeys(request);
  }
}
