import {distinctUntilChanged} from 'rxjs/operators';

export const distinctUntilArrayChanged = distinctUntilChanged<any[]>((as, bs) =>
  as.length === bs.length ? as.every(a => bs.some(b => a === b)) : false);
