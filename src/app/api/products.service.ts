import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@envs/environment';
import { Product } from '@shared/models/product.interface';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  public products = signal<Product[]>([]);

  private readonly _http = inject(HttpClient);
  private readonly _endPoint = environment.apiURL;

  constructor() {
    this.getProducts();
  }

  getProductById(productId: number): Observable<Product> {
    return this._http.get<Product>(`${this._endPoint}/${productId}`);
  }

  private getProducts(): void {
    this._http
      .get<Product[]>(`${this._endPoint}?sort=desc`)
      .pipe(tap((data: Product[]) => this.products.set(data)))
      .subscribe();
  }
}
