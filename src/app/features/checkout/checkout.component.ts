import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CheckoutService } from '@features/checkout/services/checkout.service';
import { CartStore } from 'app/store/shopping-cart.store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  /* private readonly shoppingCartSvc = inject(ShoppingCartService);
  shoppingCart = this.shoppingCartSvc.shoppingCart; */
  cartStore = inject(CartStore);

  private readonly checkoutSvc = inject(CheckoutService);

  onProceedToPay(): void {
    // this.checkoutSvc.onProceedToPay(this.shoppingCart().items);
    this.checkoutSvc.onProceedToPay(this.cartStore.products());
  }

  removeItem(productId: number): void {
    //this.shoppingCartSvc.removeItem(productId);
    this.cartStore.removeItem(productId);
  }

  clearAll(): void {
    //this.shoppingCartSvc.clearShoppingCart();
    this.cartStore.clearCart();
  }
}
