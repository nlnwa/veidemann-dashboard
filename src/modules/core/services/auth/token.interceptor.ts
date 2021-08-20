import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';
import {AppConfig} from '../../models/app-config.model';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private oAuthService: OAuthService,
              private appConfig: AppConfig) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.oAuthService.getIdToken();

    if (request.url.indexOf(this.appConfig.grpcWebUrl) !== -1 && token !== null) {
      const headers = request.headers.set('Authorization', 'Bearer ' + token);
      request = request.clone({headers});
    }

    return next.handle(request);
  }
}
