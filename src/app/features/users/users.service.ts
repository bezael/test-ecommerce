import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from '@api/api.service';
import { environment } from '@envs/environment';
import { Observable, tap } from 'rxjs';
import { User } from './models/user.model';
       
@Injectable({ providedIn:'root' })
export class UserService extends APIService {
  private readonly _endPoint = `${environment.SERVER_URL}/users`;

  public create(user: User): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
       user
      },
    };
    
    return this.post<any>(`${this._endPoint}/register`, requestOptions)
      .pipe(
        tap(({ refresh_token }) => localStorage.setItem('refreshToken', refresh_token))
      )
  }

  public login(user: User): Observable<any> { 
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: user
    };
   return this.post<any>(`${this._endPoint}/login`, requestOptions)
  }
  
  public update(user: User): Observable<User>{
    const requestOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
      }),
      body: {
        user
      },
    };
    
    return this.put<User>(this._endPoint, requestOptions)

   }

  public getByUserId(userId: number): Observable<User>{
    return this.get<User>(`${this._endPoint}/${userId}`);
  }


  /// move to auth service 
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
