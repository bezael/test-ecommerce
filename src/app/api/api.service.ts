import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseInterface, HttpRequestOptions } from '@api/base.interface';
import { Observable } from 'rxjs';

/**
 * A service that extends from Angular HttpClient
 */
@Injectable({ providedIn: 'root' })
export class APIService implements BaseInterface {
  public readonly _http = inject(HttpClient);

  /**
   * GET request
   * @param {string} endPoint end point for the get by Id
   * @param {HttpRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  /*  public getById<T>(endPoint: string, options?: HttpRequestOptions): Observable<T> {
     return this._http.get<T>(`${endPoint}`, options);
   } */

  public getById<T>(url: string, options?: HttpRequestOptions<'body', 'json'>): Observable<T> {
    return this._http.get<T>(url, options);
  }

  /**
   * GET request
   * @param {string} endPoint end point for the get
   * @param {HttpRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  /*   public get<T>(endPoint: string, options?: HttpRequestOptions): Observable<T> {
      return this._http.get<T>(`${endPoint}`, options);
    } */
  public get<T>(url: string, options?: HttpRequestOptions<'body', 'json'>): Observable<T> {
    return this._http.get<T>(url, options);
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {HttpRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  /*   public post<T>(endPoint: string, options?: HttpRequestOptions): Observable<T> {
      return this._http.post<T>(`${endPoint}`, options);
    } */
  
  // public post<T>(url: string, body: any, options?: { headers?: HttpHeaders, params?: HttpParams }): Observable<T> {

  public post<T>(url: string, body?:unknown, options?: HttpRequestOptions<'body', 'json'>): Observable<T> {
    return this._http.post<T>(url, body, options);
  }
  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {HttpRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  /*   public put<T>(endPoint: string, options?: HttpRequestOptions): Observable<T> {
      return this._http.put<T>(`${endPoint}`, options);
    } */
  public put<T>(url: string, body?:unknown, options?: HttpRequestOptions<'body', 'json'>): Observable<T> {
    return this._http.put<T>(url, body, options);
  }
  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {HttpRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  /*   public delete<T>(endPoint: string, options?: HttpRequestOptions): Observable<T> {
      return this._http.delete<T>(`${endPoint}`, options);
    } */

  public delete<T>(url: string, options?: HttpRequestOptions<'body', 'json'>): Observable<T> {
    return this._http.delete<T>(url, options);
  }
}
