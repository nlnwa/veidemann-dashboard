import {TestBed} from '@angular/core/testing';
import {LogService} from './log.service';
import {CoreTestingModule} from '../../core/core.testing.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {OAuthService} from 'angular-oauth2-oidc';

describe('LogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreTestingModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        LogService
      ]
    });
  });

  it('should be created', () => {
    const service: LogService = TestBed.inject(LogService);
    expect(service).toBeTruthy();
  });
});
