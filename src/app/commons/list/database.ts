import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export interface Item {
  id: string;
}

export abstract class Database {
  dataChange: BehaviorSubject<Item[]>;
  items: Item[];

  abstract clear(): void;

  abstract isEmpty(): boolean;

  abstract add(item: Item): void;

  abstract remove(item: Item): void;

  abstract update(item: Item): void;
}
