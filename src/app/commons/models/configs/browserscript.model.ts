import {BrowserScriptProto} from '../../../../api';
import {ConfigObject} from '../configobject.model';


export class BrowserScript {
  script?: string;
  urlRegexp?: string; // Not implemented

  constructor({
                script = '',
                urlRegexp = ''
              } = {}) {
    this.script = script;
    this.urlRegexp = urlRegexp;
  }

  static fromProto(proto: BrowserScriptProto): BrowserScript {
    return new BrowserScript({
      script: proto.getScript(),
      urlRegexp: proto.getUrlRegexp()
    });
  }

  static mergeConfigs(configObjects: ConfigObject[]): BrowserScript {
    const browserScript = new BrowserScript();
    const compareObj: BrowserScript = configObjects[0].browserScript;

    const equalScript = configObjects.every(function (cfg: ConfigObject) {
      return cfg.browserScript.script === compareObj.script;
    });

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
    proto.setUrlRegexp(browserScript.urlRegexp);

    return proto as any as BrowserScriptProto;
  }


  static createUpdateRequest(updateTemplate: ConfigObject,
                             pathList: string[],
                             configUpdate: ConfigObject,
                             mergedConfig: ConfigObject,
                             formControl: any): void {
    const browserScript = new BrowserScript();
    updateTemplate.browserScript = browserScript;

    if (mergedConfig) {
      if (formControl.script.dirty) {
        if (configUpdate.browserScript.script !== mergedConfig.browserScript.script) {
          browserScript.script = configUpdate.browserScript.script;
          pathList.push('browserScript.script');
        }
      }
    } else {
      if (formControl.script.dirty) {
        browserScript.script = configUpdate.browserScript.script;
        pathList.push('browserScript.script');
      }

    }
  }
}


