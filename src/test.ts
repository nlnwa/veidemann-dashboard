import 'zone.js/testing';
import {getTestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import 'hammerjs';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    <T>(id: string): T;
    keys(): string[];
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(), {
    teardown: {destroyAfterEach: false}
  }
);
/** When all tests are updated use:
 * // Then we find all the tests.
 * const context = require.context('./', true, /\.spec\.ts$/);
 */

// including directories with tests that has been updated
const shared = require.context('./shared', true, /\.spec\.ts$/);
const config = require.context('./modules/config', true, /\.spec\.ts$/);
const pipes = require.context('./modules/commons/pipes', true, /\.spec\.ts$/);

// And load the modules.
shared.keys().forEach(shared);
config.keys().forEach(config);
pipes.keys().forEach(pipes);
