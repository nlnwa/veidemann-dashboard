import {inject, TestBed} from '@angular/core/testing';
import {LogService} from './log.service';

xdescribe('LogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogService]
    });
  });

  it('should ...', inject([LogService], (service: LogService) => {
    expect(service).toBeTruthy();
  }));
});
