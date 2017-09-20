/**
 * Created by kristiana on 11.07.17.
 */
import {Meta} from "../../commons/models/meta";

/**
 * Created by kristiana on 18.05.17.
 */

export class Browserscripts {
  //value: Value[];
  count: number;
  page_size: string;
  page: string;
}

export class Browserscript {
  id?: string;
  meta: Meta;
  script: string;

}
