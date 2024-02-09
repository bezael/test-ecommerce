import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private readonly shoppingCartSvc = inject(ShoppingCartService);
  shoppingCart = this.shoppingCartSvc.shoppingCart;

  onProceedToPay(): void {}

  removeItem(productId: number): void {
    this.shoppingCartSvc.removeItem(productId);
  }

  clearAll(): void {
    this.shoppingCartSvc.clearShoppingCart();
  }
}
