import {Meta} from '../../commons/models/meta.model';
import {ScriptSelector} from '../../commons/models/script-selector.model';

export class BrowserConfig {
  id?: string;
  meta: Meta;
  user_agent?: string;
  window_width?: number;
  window_height?: number;
  page_load_timeout_ms?: string;
  script_selector?: ScriptSelector;
  script_id?: string[];
  headers?: Map<string, string>;
  sleep_after_pageload_ms?: string;
}
