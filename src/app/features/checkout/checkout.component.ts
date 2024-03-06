import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CheckoutService } from '@features/checkout/checkout.service';
import { WishlistService } from '@features/wishlist/wishlist.service';
import { QuantityComponent } from '@shared/ui/quantity/quantity.component';
import { RemoveProductComponent } from '@shared/ui/remove/remove-product.component';
import { WishlistProductComponent } from '@shared/ui/wishlist/wishlist-product.component';
import { CartStore } from 'app/store/shopping-cart.store';

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
export class CheckoutComponent {
  readonly cartStore = inject(CartStore);

  private readonly _checkoutSvc = inject(CheckoutService);
  private readonly _wishlistSvc = inject(WishlistService);

  public onProceedToPay(): void {
    this._checkoutSvc.onProceedToPay(this.cartStore.products());
  }

  public clearAll(): void {
    this.cartStore.clearCart();
  }

  updateQuantity(action: string, productId: number): void {
    if (action === 'DECREMENT') {
      this.cartStore.decrement(productId);
    } else if (action === 'INCREMENT') {
      this.cartStore.increment(productId);
    }
  }

  public addOrRemoveFavorite(productId: number) {
    console.log('addOrRemoveFavorite click', productId);
    this._wishlistSvc.addWishlist(productId, 1);
    // Call service to add product to wishlist
  }

  public onRemoveProduct(productId: number) {
    this.cartStore.removeItem(productId);
  }
}
