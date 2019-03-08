import {BrowserConfigProto} from '../../../../api';
import {intersectSelector} from '../../group-update/labels/common-selector';
import {ConfigRef} from '../configref.model';
import {ConfigObject} from '../configobject.model';


export class BrowserConfig {
  userAgent?: string;
  windowWidth?: number;
  windowHeight?: number;
  pageLoadTimeoutMs?: number; // int64
  scriptSelectorList?: string [];
  scriptRefList?: ConfigRef[];
  // headers?: Map<string, string>;
  // script_parameters?: Map<string, string>; not implemented
  maxInactivityTimeMs?: number; // int64

  constructor({
                userAgent = '',
                windowWidth = 0,
                windowHeight = 0,
                pageLoadTimeoutMs = 0,
                maxInactivityTimeMs = 0,
                scriptRefList = [],
                scriptSelectorList = []
              } = {}) {
    this.userAgent = userAgent;
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    this.pageLoadTimeoutMs = pageLoadTimeoutMs;
    this.scriptSelectorList = scriptSelectorList;
    this.scriptRefList = scriptRefList;
    this.maxInactivityTimeMs = maxInactivityTimeMs;

  }

  static fromProto(proto: BrowserConfigProto): BrowserConfig {
    return new BrowserConfig({
      userAgent: proto.getUserAgent(),
      windowWidth: proto.getWindowWidth(),
      windowHeight: proto.getWindowHeight(),
      pageLoadTimeoutMs: proto.getPageLoadTimeoutMs(),
      scriptSelectorList: proto.getScriptSelectorList(),
      scriptRefList: proto.getScriptRefList().map(ref => ConfigRef.fromProto(ref)),
      // script_parameters?: Map<string, string>; not implemented
      // headers
      maxInactivityTimeMs: proto.getMaxInactivityTimeMs()
    });
  }

  static mergeConfigs(configObjects: ConfigObject[]): BrowserConfig {
    const browserConfig = new BrowserConfig();
    const compareObj: ConfigObject = configObjects[0];
    const commonScripts = this.commonScript(configObjects);

    const equalUserAgent = configObjects.every(function (cfg) {
      return cfg.browserConfig.userAgent === compareObj.browserConfig.userAgent;
    });

    const equalWindowWidth = configObjects.every(function (cfg) {
      return cfg.browserConfig.windowWidth === compareObj.browserConfig.windowWidth;
    });

    const equalWindowHeight = configObjects.every(function (cfg) {
      return cfg.browserConfig.windowHeight === compareObj.browserConfig.windowHeight;
    });

    const equalPageLoadTimeout = configObjects.every(function (cfg) {
      return cfg.browserConfig.pageLoadTimeoutMs === compareObj.browserConfig.pageLoadTimeoutMs;
    });

    const equalSleepAfterPageload = configObjects.every(function (cfg) {
      return cfg.browserConfig.maxInactivityTimeMs === compareObj.browserConfig.maxInactivityTimeMs;
    });

    if (equalUserAgent) {
      browserConfig.userAgent = compareObj.browserConfig.userAgent;
    } else {
      browserConfig.userAgent = null;
    }

    if (equalWindowWidth) {
      browserConfig.windowWidth = compareObj.browserConfig.windowWidth;
    } else {
      browserConfig.windowWidth = NaN;
    }

    if (equalWindowHeight) {
      browserConfig.windowHeight = compareObj.browserConfig.windowHeight;
    } else {
      browserConfig.windowHeight = NaN;
    }

    if (equalPageLoadTimeout) {
      browserConfig.pageLoadTimeoutMs = compareObj.browserConfig.pageLoadTimeoutMs;
    } else {
      browserConfig.pageLoadTimeoutMs = NaN;
    }

    if (equalSleepAfterPageload) {
      browserConfig.maxInactivityTimeMs = compareObj.browserConfig.maxInactivityTimeMs;
    } else {
      browserConfig.maxInactivityTimeMs = NaN;
    }

    for (const browserScript of commonScripts) {
      const gotScript = configObjects.every(function (cfg) {
        for (const script of cfg.browserConfig.scriptRefList) {
          if (script.id === browserScript.id) {
            return true;
          }
        }
        return false;
      });
      if (gotScript) {
        browserConfig.scriptRefList.push(browserScript);
      }
    }

    browserConfig.scriptSelectorList = configObjects.reduce((acc: any[], curr: ConfigObject) => {
      if (acc.length < 1) {
        acc = [...curr.browserConfig.scriptSelectorList];
      } else {
        acc = intersectSelector(acc, curr.browserConfig.scriptSelectorList || []);
      }
      return acc;
    }, []);

    return browserConfig;
  }

  static commonScript(configObjects: ConfigObject[]) {
    const scripts = [];
    for (const config of configObjects) {
      for (const script of config.browserConfig.scriptRefList) {
        if (script !== undefined) {
            scripts.push(script);
        }
      }
    }
     const unique = scripts.filter(function({id}) {
       return !this.has(id) && this.add(id);
     }, new Set);

    return unique;
  }

  static toProto(browserConfig: BrowserConfig): BrowserConfigProto {
    const proto = new BrowserConfigProto();
    proto.setUserAgent(browserConfig.userAgent);
    proto.setWindowWidth(browserConfig.windowWidth || 0);
    proto.setWindowHeight(browserConfig.windowHeight || 0);
    proto.setPageLoadTimeoutMs(browserConfig.pageLoadTimeoutMs || 0);
    proto.setMaxInactivityTimeMs(browserConfig.maxInactivityTimeMs || 0);
    proto.setScriptRefList(browserConfig.scriptRefList.map(ConfigRef.toProto));
    proto.setScriptSelectorList(browserConfig.scriptSelectorList);

    return proto;
  }

  static createUpdateRequest(updateTemplate: ConfigObject,
                             pathList: string[],
                             updateConfig: ConfigObject,
                             mergedConfig: ConfigObject,
                             formControl: any,
                             options: any): void {


    const browserConfig = new BrowserConfig();
    updateTemplate.browserConfig = browserConfig;

    const {addBrowserScript, addSelector} = options;

    if (mergedConfig) {
      if (formControl.userAgent.dirty) {
        if (updateConfig.browserConfig.userAgent !== mergedConfig.browserConfig.userAgent) {
          browserConfig.userAgent = updateConfig.browserConfig.userAgent;
          pathList.push('browserConfig.userAgent');
        }
      }
      if (formControl.windowWidth.dirty) {
        if (mergedConfig.browserConfig.windowWidth !== updateConfig.browserConfig.windowWidth) {
          browserConfig.windowWidth = updateConfig.browserConfig.windowWidth;
          pathList.push('browserConfig.windowWidth');
        }
      }
      if (formControl.windowHeight.dirty) {
        if (mergedConfig.browserConfig.windowHeight !== updateConfig.browserConfig.windowHeight) {
          browserConfig.windowHeight = updateConfig.browserConfig.windowHeight;
          pathList.push('browserConfig.windowHeight');
        }
      }
      if (formControl.pageLoadTimeoutMs.dirty) {
        if (mergedConfig.browserConfig.pageLoadTimeoutMs !== updateConfig.browserConfig.pageLoadTimeoutMs) {
          browserConfig.pageLoadTimeoutMs = updateConfig.browserConfig.pageLoadTimeoutMs;
          pathList.push('browserConfig.pageLoadTimeoutMs');
        }
      }
      if (formControl.maxInactivityTimeMs.dirty) {
        if (mergedConfig.browserConfig.maxInactivityTimeMs !== updateConfig.browserConfig.maxInactivityTimeMs) {
          browserConfig.maxInactivityTimeMs = updateConfig.browserConfig.maxInactivityTimeMs;
          pathList.push('browserConfig.maxInactivityTimeMs');
        }
      }

      if (addBrowserScript !== undefined) {
        if (addBrowserScript) {
          if (mergedConfig.browserConfig.scriptRefList !== updateConfig.browserConfig.scriptRefList) {
            browserConfig.scriptRefList = updateConfig.browserConfig.scriptRefList;
            pathList.push('browserConfig.scriptRef+');
          }
        } else {
          browserConfig.scriptRefList = updateConfig.browserConfig.scriptRefList;
          pathList.push('browserConfig.scriptRef-');
        }
      }

      if (addSelector !== undefined) {
        if (addSelector) {
          if (mergedConfig.browserConfig.scriptSelectorList !== updateConfig.browserConfig.scriptSelectorList) {
            browserConfig.scriptSelectorList = updateConfig.browserConfig.scriptSelectorList;
            pathList.push('browserConfig.scriptSelector+');
          }
        } else {
          browserConfig.scriptSelectorList = updateConfig.browserConfig.scriptSelectorList;
          pathList.push('browserConfig.scriptSelector-');
        }
      }
    } else {

      if (formControl.userAgent.dirty) {
        pathList.push('browserConfig.userAgent');
        browserConfig.userAgent = updateConfig.browserConfig.userAgent;
      }
      if (formControl.windowWidth.dirty) {
        pathList.push('browserConfig.windowWidth');
        browserConfig.windowWidth = updateConfig.browserConfig.windowWidth;
      }
      if (formControl.windowHeight.dirty) {
        pathList.push('browserConfig.windowHeight');
        browserConfig.windowHeight = updateConfig.browserConfig.windowHeight;
      }
      if (formControl.pageLoadTimeoutMs.dirty) {
        pathList.push('browserConfig.pageLoadTimeoutMs');
        browserConfig.pageLoadTimeoutMs = updateConfig.browserConfig.pageLoadTimeoutMs;
      }
      if (formControl.maxInactivityTimeMs.dirty) {
        pathList.push('browserConfig.maxInactivityTimeMs');
        browserConfig.maxInactivityTimeMs = updateConfig.browserConfig.maxInactivityTimeMs;
      }

      if (formControl.scriptRefList.dirty) {
        if (addBrowserScript !== undefined) {
          if (addBrowserScript) {
            pathList.push('browserConfig.scriptRef+');
            browserConfig.scriptRefList = updateConfig.browserConfig.scriptRefList;
          } else {
            pathList.push('browserConfig.scriptRef-');
            browserConfig.scriptRefList = updateConfig.browserConfig.scriptRefList;
          }
        }
      }

      if (formControl.scriptSelectorList.dirty) {
        if (addSelector !== undefined) {
          if (addSelector) {
            pathList.push('browserConfig.scriptSelector+');
            browserConfig.scriptSelectorList = updateConfig.browserConfig.scriptSelectorList;
          } else {
            pathList.push('browserConfig.scriptSelector-');
            browserConfig.scriptSelectorList = updateConfig.browserConfig.scriptSelectorList;
          }
        }
      }
    }
  }
}
