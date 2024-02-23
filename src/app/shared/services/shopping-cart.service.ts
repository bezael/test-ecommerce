import { Injectable, inject, signal } from '@angular/core';
import { Product } from '@shared/models/product.interface';
import { ToastrService } from 'ngx-toastr';

interface ShoppingCart {
  items: Product[];
  totalAmount: number;
  productsCount: number;
}

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  shoppingCart = signal<ShoppingCart>({
    items: [],
    totalAmount: 0,
    productsCount: 0,
  });

  private readonly toastr = inject(ToastrService);
  /*   private subTotal = computed(() =>
    this.shoppingCart().items.reduce((a, b) => a + b.qty * Number(b.price), 0),
  ); */

  // Generic
  addItem(item: Product): void {
    item.qty = 1;

    this.shoppingCart.update((currentCart: ShoppingCart): ShoppingCart => {
      const isProductInCart = this.isProductInCart(item.id, currentCart.items);

      if (isProductInCart) {
        isProductInCart.qty += 1;

        isProductInCart.subTotal =
          isProductInCart.qty * Number(isProductInCart.price);
      } else {
        currentCart.items = [...currentCart.items, { ...item, qty: 1 }];
      }

      currentCart.totalAmount += item.qty * +item.price;
      currentCart.productsCount += item.qty;
      return currentCart;
    });
    this.toastr.success('Product added!!', 'DOMINI STORE');
  }

  removeItem(productId: number) {
    this.shoppingCart.update((currentCart) => {
      const isProductInCart = this.isProductInCart(
        productId,
        currentCart.items,
      );

      if (isProductInCart) {
        currentCart.totalAmount -= +isProductInCart.price * isProductInCart.qty;
        currentCart.productsCount -= isProductInCart.qty;

        currentCart.items = currentCart.items.filter(
          (item: Product) => item.id !== productId,
        );
      }
      this.toastr.success('Item removed!', 'DOMINI STORE');
      return currentCart;
    });
  }

  clearShoppingCart(): void {
    this.shoppingCart.set({
      items: [],
      totalAmount: 0,
      productsCount: 0,
    });
  }
  private isProductInCart(
    productId: number,
    items: Product[],
  ): Product | undefined {
    return items.find((item: Product) => item.id === productId);
  }
}
