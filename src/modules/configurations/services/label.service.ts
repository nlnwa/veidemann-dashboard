import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GetLabelKeysRequest, LabelKeysResponse} from '../../../api';
import {map} from 'rxjs/operators';
import {BackendService} from '../../core/services';
import {Kind} from '../../commons/models';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  // tslint:disable-next-line:variable-name
  private _kind: Kind;

  constructor(private backendService: BackendService) {
  }

  set kind(kind: Kind) {
    this._kind = kind;
  }

  getLabelKeys(): Observable<string[]> {
    const request = new GetLabelKeysRequest();
    request.setKind(this._kind.valueOf());
    return this.backendService.getLabelKeys(request)
      .pipe(map((response: LabelKeysResponse) => response.getKeyList()));
  }

}
