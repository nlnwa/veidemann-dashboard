import {BrowserScriptProto} from '../../../../api';
import {ConfigObject} from '../configobject.model';


export class BrowserScript {
  script?: string;
  urlRegexpList?: string[]; // Not implemented

  constructor({
                script = '',
                urlRegexpList = []
              }: Partial<BrowserScript> = {}) {
    this.script = script;
    this.urlRegexpList = urlRegexpList ? [...urlRegexpList] : [];
  }

  static fromProto(proto: BrowserScriptProto): BrowserScript {
    return new BrowserScript({
      script: proto.getScript(),
      urlRegexpList: proto.getUrlRegexpList()
    });
  }

  static mergeConfigs(configObjects: ConfigObject[]): BrowserScript {
    const browserScript = new BrowserScript();
    const compareObj: BrowserScript = configObjects[0].browserScript;

    const equalScript = configObjects.every((cfg: ConfigObject) => cfg.browserScript.script === compareObj.script);

    if (equalScript) {
      browserScript.script = compareObj.script;
    } else {
      browserScript.script = '';
    }
    return browserScript;
  }

  static toProto(browserScript: BrowserScript): BrowserScriptProto {
    const proto = new BrowserScriptProto();
    proto.setScript(browserScript.script);
    proto.setUrlRegexpList(browserScript.urlRegexpList);

    return proto as any as BrowserScriptProto;
  }
}


