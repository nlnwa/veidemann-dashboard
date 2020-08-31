import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ConfigOptions} from '../func';


@Injectable()
export class OptionsService {
  private options: BehaviorSubject<ConfigOptions>;
  options$: Observable<ConfigOptions>;

  constructor() {
    this.options = new BehaviorSubject<ConfigOptions>(null);
    this.options$ = this.options.asObservable();
  }

  next(options: ConfigOptions) {
    this.options.next(options);
  }
}
