import { CommonModule, CurrencyPipe, NgClass, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '@features/users/models/user.model';
import { CartState } from '@store/shopping-cart.store';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SlicePipe, CurrencyPipe, NgClass, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cart = input.required<CartState>();
  categories = input.required<string[]>();
  user = input.required<User | undefined>();
  showCart = signal<boolean>(false);

  onLogoutEvent = output();
  
}
