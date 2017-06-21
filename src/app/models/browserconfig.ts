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
  script_selector?: Script_Selector;
  script_id?: Script_Id[];
  headers?: {};
  sleep_after_pageload_ms?: string;
}

export class Script_Id {

}


export class Meta {
  name: string;
  description: string;
  created?: string;
  created_by?: string;
  last_modified?: string;
  last_modified_by?: string;
  label?: Label[];
}
export class Script_Selector {
  label: Label[];
}

export class Label {
  key: string;
  value: string;
}
