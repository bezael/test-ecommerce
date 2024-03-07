import { CurrencyPipe, NgClass, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SlicePipe, CurrencyPipe, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  categories = input.required<string[]>();
  productsCart = input.required<Product[]>();
  totalAmount = input.required<number>();
  productsCount = input.required<number>();
  showCart = signal<boolean>(false);
  userMenu = ['profile', 'orders', 'logout'];
}
