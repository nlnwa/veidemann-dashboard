import {Meta} from '../../commons/models/meta';

export class Browserscripts {
  // value: Value[];
  count: number;
  page_size: string;
  page: string;
}

export class Browserscript {
  id?: string;
  meta: Meta;
  script: string;

}
