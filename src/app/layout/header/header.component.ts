import {
  CurrencyPipe,
  NgClass,
  SlicePipe,
  TitleCasePipe,
} from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from '@store/shopping-cart.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SlicePipe, CurrencyPipe, NgClass, TitleCasePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // categories = input.required<Category[]>();
  @Input({ required: true }) categories: string[] = [];
  showCart = signal<boolean>(false);
  cartStore = inject(CartStore);
}
