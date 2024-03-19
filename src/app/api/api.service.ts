import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseInterface, RequestOptions } from '@api/base.interface';
import { environment } from '@envs/environment';
import { Observable } from 'rxjs';

/**
 * A service that extends from Angular HttpClient
 */
@Injectable({ providedIn: 'root' })
export class APIService implements BaseInterface {
  public readonly _http = inject(HttpClient);
  private readonly API = environment.API_URL_FAKE_STORE;

  /**
   * GET request
   * @param {string} endPoint end point for the get by Id
   * @param {RequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public getById<T>(endPoint: string, options?: RequestOptions): Observable<T> {
    return this._http.get<T>(`${this.API}${endPoint}`, options);
  }

  /**
   * GET request
   * @param {string} endPoint end point for the get
   * @param {RequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public get<T>(endPoint: string, options?: RequestOptions): Observable<T> {
    return this._http.get<T>(`${this.API}${endPoint}`, options);
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {RequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public post<T>(endPoint: string, options?: RequestOptions): Observable<T> {
    return this._http.post<T>(`${this.API}${endPoint}`, options);
  }

  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {RequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public put<T>(endPoint: string, options?: RequestOptions): Observable<T> {
    return this._http.put<T>(`${this.API}${endPoint}`, options);
  }

  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {RequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public delete<T>(endPoint: string, options?: RequestOptions): Observable<T> {
    return this._http.delete<T>(`${this.API}${endPoint}`, options);
  }
}
