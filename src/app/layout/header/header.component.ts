import { CurrencyPipe, NgClass, SlicePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SlicePipe, CurrencyPipe, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showCart = signal<boolean>(false);

  private readonly shoppingCartSvc = inject(ShoppingCartService);
  shoppingCart = this.shoppingCartSvc.shoppingCart;
}