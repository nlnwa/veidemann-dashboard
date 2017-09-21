import {Meta} from '../../commons/models/meta';
import {Label} from '../../commons/models/label';

export class BrowserConfigs {
  // value: Value[];
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
  script_id?: ScriptId[];
  script_selector?: ScriptSelector;
  headers?: Headers;
  sleep_after_pageload_ms?: string;
}

export class ScriptSelector {
  label: Label[];
}

export class ScriptId {}

export class Headers {}
