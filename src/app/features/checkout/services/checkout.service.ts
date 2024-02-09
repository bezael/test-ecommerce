import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@envs/environment';
import { Product } from '@shared/models/product.interface';
import { loadStripe } from '@stripe/stripe-js';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private readonly _http = inject(HttpClient);
  private readonly _url = environment.serverURL;

  onProceedToPay(items: Product[]) {
    return this._http
      .post<any>(`${this._url}/checkout`, { items: items })
      .pipe(
        map(async (res: any) => {
          console.log('CheckoutResponse', res);
          const stripe = await loadStripe('pk_test_Zvh5KeROD4AbBdIsMZ0zzdUf');
          stripe?.redirectToCheckout({ sessionId: res.id });
        }),
      )
      .subscribe({
        error: (err) => console.error(err),
      });
  }
}
