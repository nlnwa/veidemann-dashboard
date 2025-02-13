import {inject, TestBed, waitForAsync} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {OAuthService} from 'angular-oauth2-oidc';
import {CoreTestingModule} from '../../core.testing.module';

describe('AuthService', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot()],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isAdmin: () => true,
            canUpdate: () => true,
          }
        },
        {provide: OAuthService, useValue: {}}
      ]
    });
  }));

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
