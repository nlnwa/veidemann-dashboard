import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private authService: AuthService;

  // Would like to inject authService directly but it causes a cyclic dependency error
  // see https://github.com/angular/angular/issues/18224
  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.getAuthService().authorizationHeader) {
      request = request.clone({
        setHeaders: {
          Authorization: this.getAuthService().authorizationHeader
        }
      });
    }
    return next.handle(request);
  }

  getAuthService(): AuthService {
    if (typeof this.authService === 'undefined') {
      this.authService = this.injector.get(AuthService);
    }
    return this.authService;
  }
}
