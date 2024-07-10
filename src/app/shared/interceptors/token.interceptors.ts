import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '@features/users/users.service';
import { catchError, switchMap, throwError } from 'rxjs';

let isRefreshing = false;

const userSvc = inject(UserService);

export const TokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandler,
) => {
  /*    if (this.authService.getAccessToken()) {
      request = this.addToken(request, this.authService.getAccessToken());
    } */
  return next.handle(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(req, next);
      } else {
        return throwError(() => error);
      }
    }),
  );
};

function addToken(request: HttpRequest<any>, token: string | null) {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  if (!isRefreshing) {
    /* isRefreshing = true;
      this.refreshTokenSubject.next(null); */

    return userSvc.refreshToken().pipe(
      switchMap((token: any) => {
        // isRefreshing = false;
        // this.refreshTokenSubject.next(token.accessToken);
        return next.handle(addToken(request, token.accessToken));
      }),
      catchError((error) => {
        // isRefreshing = false;
        // userSvc.logout();
        return throwError(() => error);
      }),
    );
  } /* else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(accessToken => {
          return next.handle(this.addToken(request, accessToken));
        })
      );
    } */
}
