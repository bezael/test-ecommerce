import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIService } from "@api/api.service";
import { Observable, tap } from "rxjs";

interface User {
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  phone: string;
}
       
@Injectable({providedIn:'root'})
export class UserService extends APIService {
  
  private readonly _endPoint = '/users';
  // https://fakestoreapi.com/users'

  public create(user: User): any{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
       user
      },
    };
    return this.post<User>(this._endPoint, requestOptions)
      .pipe(
        tap((user: User) => console.log('Usersssssssssss', user))
      ).subscribe()
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
    
    return this.put<User>(this._endPoint, requestOptions);
   }

  public getByUserId(userId: number): Observable<User>{
    return this.get<User>(`${this._endPoint}/${userId}`);
  }
}