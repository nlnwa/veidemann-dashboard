import {Meta} from "../../commons/models/meta";
/**
 * Created by kristiana on 08.06.17.
 */
export class BrowserConfigs {
  //value: Value[];
  count: number;
  page_size: string;
  page: string;
}

export class Browserconfig {
  id?: string;
  meta: Meta;
  user_agent?: string;
  window_width?: number;
  window_height?: number;
  page_load_timeout_ms?: string;
  script_id?: Script_Id[];
  headers?: Headers;
  sleep_after_pageload_ms?: string;
}

export class Script_Id {
}

export class Headers {

}
