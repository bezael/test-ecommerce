import { HttpClient } from '@angular/common/http';
import {
  EnvironmentInjector,
  Injectable,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '@envs/environment';
import { Product } from '@shared/models/product.interface';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  public products = signal<Product[]>([]);

  private readonly _http = inject(HttpClient);
  private readonly _endPoint = environment.apiURL;
  private readonly _injector = inject(EnvironmentInjector);

  constructor() {
    this.getProducts();
  }

  getProductById(productId: number) {
    return runInInjectionContext(this._injector, () =>
      toSignal<Product>(
        this._http.get<Product>(`${this._endPoint}/${productId}`),
      ),
    );
  }

  private getProducts(): void {
    this._http
      .get<Product[]>(`${this._endPoint}?sort=desc`)
      .pipe(
        map((products: Product[]) =>
          products.map((product) => ({ ...product, qty: 1 })),
        ),
        tap((products: Product[]) => this.products.set(products)),
      )
      .subscribe();
  }
}
