import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from '@api/api.service';
import { Observable } from 'rxjs';

interface Wishlist {
  id: number;
  productId: number;
  userId: number;
  creationDate: Date;
}

@Injectable({ providedIn: 'root' })
export class WishlistService extends APIService {
  private readonly _endPoint = '/wishlist';

  public getWishlists(): Observable<Wishlist[]> {
    return this.get<Wishlist[]>(this._endPoint);
  }

  public addWishlist(productId: number, userId: number): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        productId,
        userId,
      },
    };
    return this.post<any>(this._endPoint, requestOptions);
  }

  public removeWishlist(productId: number): Observable<any> {
    return this.delete<any>(`wishlist/${productId}`);
  }

  public getWishlistByUserId(userId: number): Observable<any> {
    return this.get<any>(`wishlist/${userId}`);
  }
}

/* 
 WISHLIST:  
  id 
  productId
  userId
  creationDate
*/
