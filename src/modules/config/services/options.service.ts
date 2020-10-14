import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ConfigOptions} from '../func';


@Injectable()
export class OptionsService {
  // tslint:disable-next-line:variable-name
  private _options: BehaviorSubject<ConfigOptions>;
  options$: Observable<ConfigOptions>;

  get options() {
    return this._options.value;
  }

  constructor() {
    this._options = new BehaviorSubject<ConfigOptions>(null);
    this.options$ = this._options.asObservable();
  }

  next(options: ConfigOptions) {
    this._options.next({...this._options.value, ...options});
  }
}
