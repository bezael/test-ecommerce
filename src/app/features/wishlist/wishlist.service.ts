import { HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { APIService } from '@api/api.service';
import { ProductsService } from '@features/products/products.service';
import { Observable, tap } from 'rxjs';

interface Wishlist {
  id: number;
  productId: number;
  userId: number;
  creationDate: Date;
}

@Injectable({ providedIn: 'root' })
export class WishlistService extends APIService {
  private readonly _endPoint = '/wishlist';
  private readonly _productSvc = inject(ProductsService);

  public getWishlists(): Observable<Wishlist[]> {
    return this.get<Wishlist[]>(this._endPoint);
  }
  // this.markProductToDesired(productId: number);
  //
  // TODO: userId Should come from AuthState
  public addOrRemoveWishlist(productId: number, userId: any): any {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        productId,
        userId,
      },
    };
    return this.post<any>(this._endPoint, requestOptions)
      .pipe(
        tap((res: any) => console.log('addOrRemoveWishlist::', res)),
        tap(() => this._productSvc.markProductToDesired(productId)),
      )
      .subscribe();
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
