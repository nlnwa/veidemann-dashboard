import {BrowserScriptProto} from '../../../../api';
import {ConfigObject} from '../configobject.model';


export class BrowserScript {
  script?: string;
  urlRegexp?: string;

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

  toProto(): BrowserScriptProto {
    const proto = new BrowserScriptProto() as any as BrowserScriptProto.AsObject;
    proto.script = this.script;
    proto.urlRegexp = this.urlRegexp;

    return proto as any as BrowserScriptProto;
  }



  createUpdateRequest(configUpdate: ConfigObject, formControl: any, mergedConfig?: ConfigObject) {
    const browserScript = new BrowserScript();
    const pathList = [];

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
    return {updateTemplate: browserScript, pathList: pathList};
  }
}


