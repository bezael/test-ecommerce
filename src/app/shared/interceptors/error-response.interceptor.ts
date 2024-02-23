import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const ErrorResponseInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(catchError(handleErrorResponse));

function handleErrorResponse(
  error: HttpErrorResponse,
): ReturnType<typeof throwError> {
  const errorResponse = `Error code: ${error.status}, message: ${error.message}`;
  return throwError(() => errorResponse);
}
