import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '@shared/models/product.interface';
import { ToastrService } from 'ngx-toastr';

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
      product.quantity = 1;

      const isProductInCart = products().find(
        (item: Product) => item.id === product.id,
      );

      if (isProductInCart) {
        isProductInCart.quantity += 1;
        isProductInCart.subTotal =
          isProductInCart.quantity * Number(isProductInCart.price);

        patchState(store, { products: [...products()] });
      } else {
        patchState(store, { products: [...products(), product] });
      }
      toastrSvc.success('Product added!!', 'DOMINI STORE');
    },
    removeItem(id: number) {
      const isProductInCart = products().find(
        (item: Product) => item.id === id,
      );

      if (isProductInCart) {
        const updatedProduct = products().filter((a) => a.id !== id);
        patchState(store, { products: updatedProduct });
        toastrSvc.info('Product removed!!', 'DOMINI STORE');
      }
    },

    clearCart() {
      patchState(store, initialCartState);
      toastrSvc.info('All Products removed!!', 'DOMINI STORE');
    },
    increment(id: number) {
      const updatedProduct = products().map((product) =>
        product.id === id
          ? {
            ...product,
            quantity: product.quantity + 1,
            subTotal: (product.quantity + 1) * Number(product.price),
          }
          : product,
      );

      patchState(store, { products: updatedProduct });
    },
    decrement(id: number) {
      const updatedProduct = products().map((product) =>
        product.id === id
          ? {
            ...product,
            quantity: product.quantity - 1,
            subTotal: (product.quantity - 1) * Number(product.price),
          }
          : product,
      );
      patchState(store, { products: updatedProduct });
    },
  })),
);

function calculateTotalPrice(products: Product[]): number {
  return products.reduce(
    (acc, product) => acc + Number(product.price) * product.quantity,
    0,
  );
}

function calculateProductsCount(products: Product[]): number {
  return products.reduce((total, product) => total + product.quantity, 0);
}
