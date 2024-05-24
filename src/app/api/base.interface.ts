import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/* export interface RequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
} */

type HttpRequestObserve = 'body' | 'events' | 'response';
type HttpRequestResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';

export interface HttpRequestOptions<
  O extends HttpRequestObserve = HttpRequestObserve,
  R extends HttpRequestResponseType = HttpRequestResponseType
> {
  headers?: HttpHeaders | { [header: string]: string | string[] },
  context?: HttpContext,
  observe?: O,
  params?: HttpParams |
  { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> },
  reportProgress?: boolean,
  responseType?: R,
  withCredentials?: boolean,
}


export interface BaseInterface {
  getById<T>(url: string, options?: HttpRequestOptions<'body', 'json'>): Observable<T>;
  get<T>(url: string, options?: HttpRequestOptions<'body', 'json'>): Observable<T>;
  delete<T>(url: string, options?: HttpRequestOptions<'body', 'json'>): Observable<T>;
  post<T>(url: string, options?: HttpRequestOptions<'body', 'json'>): Observable<T>;
  put<T>(url: string, options?: HttpRequestOptions<'body', 'json'>): Observable<T>;
}