import { CurrencyPipe, JsonPipe, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '@features/products/products.service';
import { Product } from '@shared/models/product.interface';
import { AddToCartComponent } from '@shared/ui/add-to-cart/add-to-cart.component';
import { QuantityComponent } from '@shared/ui/quantity/quantity.component';

@Component({
  selector: 'app-card',
  standalone: true,
  inputs: [],
  imports: [
    RouterLink,
    QuantityComponent,
    AddToCartComponent,
    CurrencyPipe,
    SlicePipe,
    JsonPipe,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  // @Input({ required: true, transform: addDiscountProperty }) product!: Product;
  // @Output() addToCartEvent = new EventEmitter<Product>();

  currentProduct = input.required<Product>({ alias: 'product' });
  addToCartEvent = output<Product>();

  onAddToCart(): void {
    this.addToCartEvent.emit(this.currentProduct());
  }
}
