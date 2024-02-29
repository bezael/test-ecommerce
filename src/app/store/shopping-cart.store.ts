import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Product } from '@shared/models/product.interface';
import { ToastrService } from 'ngx-toastr';
import { pipe } from 'rxjs';
export interface CartState {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}

const initialCartState: CartState = {
  products: [],
  totalAmount: 0,
  productsCount: 0,
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialCartState),
  withComputed(({ products }) => ({
    productsCount: computed(() => calculateProductsCount(products())),
    totalAmount: computed(() => calculateTotalPrice(products())),
  })),
  withMethods(({ products, ...store }, toastrSvc = inject(ToastrService)) => ({
    addToCart(product: Product) {
      patchState(store, { products: [...products(), product] });
      toastrSvc.success('Product added!!', 'DOMINI STORE');
    },
    removeItem(id: number) {
      const updatedProduct = products().filter((a) => a.id !== id);
      patchState(store, { products: updatedProduct });
      toastrSvc.info('Product removed!!', 'DOMINI STORE');
    },
    addToCartOLD: rxMethod<any>(
      pipe(
        tapResponse({
          next: (product: Product) => {
            patchState(store, { products: [...products(), product] });
            toastrSvc.success('Product added!!', 'DOMINI STORE');
          },
          error: () =>
            toastrSvc.error(
              'Something went wrong adding to cart',
              'DOMINI STORE',
            ),
        }),
      ),
    ),
    removeItemOLd: rxMethod<any>(
      pipe(
        tapResponse({
          next: (id: number) => {
            const updatedProduct = products().filter((a) => a.id !== id);
            patchState(store, { products: updatedProduct });
            toastrSvc.info('Product removed!!', 'DOMINI STORE');
          },
          error: () =>
            toastrSvc.error(
              'Something went wrong removing from cart',
              'DOMINI STORE',
            ),
        }),
      ),
    ),
    clearCart() {
      patchState(store, initialCartState);
      toastrSvc.info('All Products removed!!', 'DOMINI STORE');
    },
  })),
);

function calculateTotalPrice(products: Product[]): number {
  return products.reduce(
    (total, product) => total + Number(product.price) * product.qty,
    0,
  );
}

function calculateProductsCount(products: Product[]): number {
  return products.reduce((total, product) => total + product.qty, 0);
}
