import { Injectable } from '@angular/core';
import { APIService } from '@api/api.service';
import { environment } from '@envs/environment';
import { Observable, tap } from 'rxjs';
import { User } from './models/user.model';
       
@Injectable({ providedIn:'root' })
export class UserService extends APIService {
  private readonly _endPoint = `${environment.SERVER_URL}/users`;

  public create(user: User): Observable<any> {
 /*    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {user},
    }; */
    
    return this.post<User>(`${this._endPoint}/register`,  {body:user})
      .pipe(
        tap((res: any) => console.log('Take type create:', res)),
        tap(({ refresh_token }) => localStorage.setItem('refreshToken', refresh_token))
      );
    
    //     this.apiService.get<MyDataType>('https://api.example.com/data').subscribe(data => {

  }

  public login(user: User): Observable<any> { 
/*     console.log('Login', user);

    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: user
    };
        console.log('requestOptions', requestOptions); */
   return this.post<any>(`${this._endPoint}/login`, user)
  }
  
  public update(user: User): Observable<User>{
  /*   const requestOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
      }),
      body: user,
    }; */
    
    return this.put<User>(this._endPoint, user)
     // get<T>(url: string, options?: HttpRequestOptions<"body", "json">): Observable<T>;) 
   }

  public getByUserId(userId: number): Observable<User>{
    return this.get<User>(`${this._endPoint}/${userId}`);
  }

}


/* {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjM2M2YzYjMxOTNmMTFkMmQ2MjFiNmYiLCJlbWFpbCI6IlJFVEVFQGdtYWlsLmNvbSIsIm5hbWUiOiJSRVRFRSIsImlhdCI6MTcxNDgzMTE2MywiZXhwIjoxNzE0OTE3NTYzfQ.cRN845oQdLeXgZnvt3bVeZXr3zUBs8XXvKvdBwxmO78",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjM2M2YzYjMxOTNmMTFkMmQ2MjFiNmYiLCJlbWFpbCI6IlJFVEVFQGdtYWlsLmNvbSIsIm5hbWUiOiJSRVRFRSIsImlhdCI6MTcxNDgzMTE2MywiZXhwIjoxNzE1NDM1OTYzfQ.hrbSAxPB8_BCBdOO70we4ybSDoRNdxE0VaCW_fEUt6A",
    "user": {
        "name": "RETEE",
        "email": "RETEE@gmail.com",
        "_id": "66363f3b3193f11d2d621b6f",
        "__v": 0
    },
    "status": 201,
    "message": "User created successfully"
} */