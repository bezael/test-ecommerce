import { Injectable, signal } from '@angular/core';
import { APIService } from '@api/api.service';
import { Product } from '@shared/models/product.interface';
import { Observable, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService extends APIService {
  public products = signal<Product[]>([]);
  public productSelected = signal<Product | undefined>(undefined);

  private readonly _endPoint = '/products';

  constructor() {
    super();
    this.getAllProducts();
  }

  public getAllProducts(): void {
    this.get<Product[]>(`${this._endPoint}?sort=desc`)
      .pipe(
        map((products: Product[]) => this._addPropertyQTY(products)),
        tap((products: Product[]) => this.products.set(products)),
      )
      .subscribe();
  }

  getAll(): Observable<Product[]> {
    return this.get<Product[]>(this._endPoint);
  }
  private _addPropertyQTY(products: Product[]): Product[] {
    return products.map((product) => ({ ...product, quantity: 1 }));
  }
}
