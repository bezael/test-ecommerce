import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from '@api/api.service';
import { environment } from '@envs/environment';
import { Observable, tap } from 'rxjs';
       
@Injectable({ providedIn:'root' })
export class AuthService extends APIService {
  private readonly _endPoint = `${environment.SERVER_URL}/users`;

  public logout(): Observable<any>{
    return this.post(`${this._endPoint}/logout`);
  }
  
  public refreshToken(): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      refreshToken: this._getRefreshToken()
    };

    return this.post<any>(`${this._endPoint}/refresh`, requestOptions)
      .pipe(tap((tokens) => {
        console.log(tokens);
        /* this.storeTokens(tokens);
        this.currentTokenSubject.next(tokens.accessToken); */
    }));
  }

  public getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  private _getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

/* 
   logout() {
    this.removeTokens();
    this.currentTokenSubject.next(null);
  } */

}
