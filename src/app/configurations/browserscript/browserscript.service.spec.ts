import {inject, TestBed} from '@angular/core/testing';
import {BrowserScriptService} from './browserscript.service';

xdescribe('BrowserScriptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserScriptService]
    });
  });

  it('should ...', inject([BrowserScriptService], (service: BrowserScriptService) => {
    expect(service).toBeTruthy();
  }));
});
