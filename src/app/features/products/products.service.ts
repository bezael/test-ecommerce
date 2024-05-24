import { Injectable, signal } from '@angular/core';
import { APIService } from '@api/api.service';
import { environment } from '@envs/environment';
import { Product } from '@shared/models/product.interface';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService extends APIService {
   products = signal<Product[]>([]);
  //  productSelected = signal<Product | undefined>(undefined);

  private readonly _endPoint =  `${environment.API_URL_FAKE_STORE}/products`;

  constructor() {
    super();
    this.getAllProducts();
  }

   getProductsByCategory(category: string): void {
    debugger;
    this.get<Product[]>(`${this._endPoint}/category/${category}`)
      .pipe(
        map((products: Product[]) => this._addProperties(products)),
        tap((products: Product[]) => this.products.set(products)),
      )
      .subscribe();
  }
   getAllProducts(): void {
    this.get<Product[]>(`${this._endPoint}?sort=desc`)
      .pipe(
        map((products: Product[]) => this._addProperties(products)),
        tap((products: Product[]) => this.products.set(products)),
      )
      .subscribe();
  }

  private _addProperties(products: Product[]): Product[] {
    return products.map((product) => ({
      ...product,
      quantity: 0,
      isDesired: false,
    }));
  }
}
