import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export interface Item {
  id: string;
}

export abstract class Database {
  dataChange: BehaviorSubject<Item[]>;
  items: Item[];

  abstract clear(): void;

  abstract isEmpty(): boolean;

  abstract add(Item): void;

  abstract remove(Item): void;

  abstract update(Item): void;
}
