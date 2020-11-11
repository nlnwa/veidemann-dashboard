import {Injectable} from '@angular/core';
import {Kind} from '../../../shared/models/config';
import {BehaviorSubject, Observable} from 'rxjs';
import {LabelService} from './label.service';
import {distinctUntilChanged, tap} from 'rxjs/operators';

@Injectable()
export class KindService {
  private kind: BehaviorSubject<Kind>;
  kind$: Observable<Kind>;

  constructor(private labelService: LabelService) {
    this.kind = new BehaviorSubject<Kind>(Kind.UNDEFINED);
    this.kind$ = this.kind.asObservable();
  }

  next(kind: Kind) {
    this.labelService.kind = kind;
    this.kind.next(kind);
  }
}
