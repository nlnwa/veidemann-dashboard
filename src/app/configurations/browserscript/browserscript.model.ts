import {Meta} from '../../commons/models/meta.model';

export class BrowserScripts {
  value: BrowserScript[];
  count: number;
  page_size: string;
  page: string;
}

export class BrowserScript {
  id?: string;
  meta: Meta;
  script: string;

}
