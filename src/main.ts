import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import 'hammerjs';

import {AppModule} from './modules/app/app.module';
import {environment} from './environments/environment';
import {AppConfig} from './modules/core/models/app-config.model';
import {AppConfigService} from './modules/core/services';

if (environment.production) {
  enableProdMode();
}

// load dynamic configuration pre bootstrap
fetch(environment.configUrl)
  .then(async config => {
    const versions = await fetch(environment.versionUrl)
    return {config, versions}
  })
  .then(async ({config, versions}) => {
    const dynamicConfig = await config.json();
    // development server uses versions from environment.json
    const deploymentVersions = await versions.json().catch(error => {
       return null;
     });
    const appConfig: AppConfig = Object.assign({}, environment, dynamicConfig);
     if (deploymentVersions) {
       /* tslint:disable:no-string-literal */
      appConfig.veidemannVersion = deploymentVersions['veidemann'];
       /* tslint:enable:no-string-literal */
     }
    Object.entries(environment).forEach(([key, value]) => {
      if (value !== null && typeof value === 'object') {
        // merge values of type object properly (because Object.assign does not assign recursively)
        appConfig[key] = Object.assign({}, environment[key], dynamicConfig[key]);
      }
    });
    return appConfig;
  })
  .then((appConfig: AppConfig) =>
    platformBrowserDynamic([{provide: AppConfigService, useValue: appConfig}])
      .bootstrapModule(AppModule)
      .catch(err => console.error(err))
  );
