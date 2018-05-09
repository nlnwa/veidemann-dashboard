import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private oauthService: OAuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.oauthService.getIdToken();

    if (request.url.indexOf('/api/') !== -1 && token !== null) {
      const headers = request.headers.set('Authorization', 'Bearer ' + token);
      request = request.clone({headers});
    }

    return next.handle(request);
  }
}
