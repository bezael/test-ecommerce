import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CheckoutService } from '@features/checkout/checkout.service';
import { QuantityComponent } from '@shared/ui/quantity/quantity.component';
import { RemoveProductComponent } from '@shared/ui/remove/remove-product.component';
import { WishlistProductComponent } from '@shared/ui/wishlist/wishlist-product.component';
import { CartStore } from 'app/store/shopping-cart.store';

enum Action {
  Decrement = 'DECREMENT',
  Increment = 'INCREMENT'
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    QuantityComponent,
    RemoveProductComponent,
    WishlistProductComponent,
    SlicePipe,
    CurrencyPipe,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export default class CheckoutComponent {
  readonly cartStore = inject(CartStore);

  private readonly _checkoutSvc = inject(CheckoutService);
  // private readonly _wishlistSvc = inject(WishlistService);

   onProceedToPay(): void {
    // TODO: If is not logged in, redirect to login page
    this._checkoutSvc.onProceedToPay(this.cartStore.products());
  }

   clearAll(): void {
    this.cartStore.clearCart();
  }

  updateQuantity(action: string, productId: number): void {
    if (action === Action.Decrement) {
      this.cartStore.decrement(productId);
    } else if (action === Action.Increment) {
      this.cartStore.increment(productId);
    }
  }

   addOrRemoveFavorite(productId: number) {
    console.log('addOrRemoveFavorite click', productId);
    // this._wishlistSvc.addOrRemoveWishlist(productId, 1);
    // Call service to add product to wishlist
  }

   onRemoveProduct(productId: number) {
    this.cartStore.removeItem(productId);
  }
}
