import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import 'hammerjs';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {AppConfig} from './modules/core/models';

if (environment.production) {
  enableProdMode();
}

// load dynamic configuration pre bootstrap
fetch('assets/config.json')
  .then(async response => {
    const appConfig = await response.json();

    return platformBrowserDynamic([{provide: AppConfig, useValue: appConfig}])
      .bootstrapModule(AppModule)
      .catch(err => console.error(err));
  });
