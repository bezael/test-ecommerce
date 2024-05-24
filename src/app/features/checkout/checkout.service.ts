import { Injectable } from '@angular/core';
import { APIService } from '@api/api.service';
import { environment } from '@envs/environment';
import { Product } from '@shared/models/product.interface';
import { loadStripe } from '@stripe/stripe-js';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CheckoutService extends APIService {
  private readonly _url = environment.SERVER_URL;

  onProceedToPay(products: Product[]) {
    debugger;
    const data = {
      items: products,
      customer_email: 'jofiel@gmail.com', // TODO: from user info
    };
    
    return this._http
      .post<any>(`${this._url}/checkout`, data)
      .pipe(
        map(async (res: any) => {
          console.log('hacer type', res);
          const stripe = await loadStripe('pk_test_Zvh5KeROD4AbBdIsMZ0zzdUf');
          await stripe?.redirectToCheckout({ sessionId: res.id });
        }),
      )
      .subscribe({
        error: (err) => console.error(err),
      });
  }
}
