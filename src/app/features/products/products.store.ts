import { inject } from '@angular/core';
import { ProductsService } from '@features/products/products.service';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import {
  setAllEntities,
  setEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Product } from '@shared/models/product.interface';
import { exhaustMap, pipe } from 'rxjs';

export interface ProductStore {
  products: Product[];
}

const initialState: ProductStore = {
  products: [],
};

export const ProductsStore = signalStore(
  withEntities<Product>(),
  withMethods((store, productSvc = inject(ProductsService)) => ({
    setProduct(product: Product) {
      patchState(store, setEntity(product));
    },
    loadProducts: rxMethod<void>(
      pipe(
        // tap(() => patchState(store, setPending()))
        exhaustMap(() => {
          return productSvc.getAll().pipe(
            tapResponse({
              next: (products) => {
                patchState(store, setAllEntities(products));
              },
              error: (error: { message: string }) => {
                // patchState(store, setError(error.message));
                console.log('Error', error.message);
              },
            }),
          );
        }),
      ),
    ),
  })),
);
