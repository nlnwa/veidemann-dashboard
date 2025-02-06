import {inject, TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {OAuthService} from 'angular-oauth2-oidc';
import {CoreTestingModule} from '../../core.testing.module';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot()],
      providers: [AuthService,
        {provide: OAuthService, useValue: {}}
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
