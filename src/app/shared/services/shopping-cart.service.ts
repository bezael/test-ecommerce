import { Injectable, inject, signal } from '@angular/core';
import { Product } from '@shared/models/product.interface';
import { ToastrService } from 'ngx-toastr';

interface ShoppingCart {
  items: Product[];
  totalAmount: number;
  productsCount: number;
}
const initialShoppingCart: ShoppingCart = {
  items: [],
  totalAmount: 0,
  productsCount: 0,
};
@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  private readonly toastr = inject(ToastrService);

  shoppingCart = signal<ShoppingCart>(initialShoppingCart);

  // Generic
  addItem(item: Product): void {
    item.qty = 1;

    this.shoppingCart.update((currentCart: ShoppingCart): ShoppingCart => {
      const isProductInCart = currentCart.items.find(
        (itemCart: Product) => itemCart.id === item.id,
      );

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

  clearShoppingCart(): void {
    this.shoppingCart.set(initialShoppingCart);
    this.toastr.success('Shopping cart empty!', 'DOMINI STORE');
  }
}
