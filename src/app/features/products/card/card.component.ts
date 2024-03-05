import { CurrencyPipe, JsonPipe, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/models/product.interface';
import { AddToCartComponent } from '@shared/ui/add-to-cart/add-to-cart.component';
import { QuantityComponent } from '@shared/ui/quantity/quantity.component';

/* function addDiscountProperty(product: any) {
  return { discount: false, ...product };
} */

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    RouterLink,
    QuantityComponent,
    AddToCartComponent,
    CurrencyPipe,
    SlicePipe,
    JsonPipe,
  ],
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  // @Input({ required: true, transform: addDiscountProperty }) product!: Product;
  product = input.required<Product>();
  @Output() addToCartEvent = new EventEmitter<Product>();

  public onAddToCart(): void {
    this.addToCartEvent.emit(this.product());
  }
}
