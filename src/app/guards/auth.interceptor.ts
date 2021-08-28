import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

import { Token } from '../models/models';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.show();
    if (localStorage.getItem(environment.tokenKey) != null) {
      const token: Token = JSON.parse(
        localStorage.getItem(environment.tokenKey) || '{}'
      );
      const cloneRequest = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${token.access_token}`
        ),
      });

      return next.handle(cloneRequest).pipe(
        tap(
          (success) => {},
          (error) => {
            if (error.status == 401) {
              localStorage.removeItem(environment.tokenKey);
              this.router.navigate(['/login']);
            } else if (error.status == 403) {
              this.authService.logout();
              this.router.navigate(['/login']);
            }
          }
        ),
        finalize(() => {
          this.spinner.hide();
        })
      );
    } else {
      return next.handle(req.clone()).pipe(
        tap(
          (success) => {},
          (error) => {
            if (error.status == 401) {
              this.router.navigate(['/login']);
            }
          }
        ),
        finalize(() => {
          this.spinner.hide();
        })
      );
    }
  }
}
