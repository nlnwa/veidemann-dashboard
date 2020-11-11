import {TestBed} from '@angular/core/testing';
import {LogService} from './log.service';
import {CoreTestingModule} from '../../core/core.testing.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreTestingModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        LogService
      ]
    });
  });

  it('should be created', () => {
    const service: LogService = TestBed.get(LogService);
    expect(service).toBeTruthy();
  });
});
