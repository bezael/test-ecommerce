import { Injectable, inject, signal } from '@angular/core';
import { Product } from '@shared/models/product.interface';
import { ToastrService } from 'ngx-toastr';

export interface ShoppingCart {
  items: Product[];
  totalAmount: number;
  productsCount: number;
}

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  private readonly toastr = inject(ToastrService);

  shoppingCart = signal<ShoppingCart>({
    items: [],
    totalAmount: 0,
    productsCount: 0,
  });

  // Generic
  addItemToShoppingCart(item: Product): void {
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
    // console.log('currentCart', this.shoppingCart());
  }

  removeItemFromShoppingCart() {}
  calculateTotal() {}
  clearShoppingCart() {}
}
