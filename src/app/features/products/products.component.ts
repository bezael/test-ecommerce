import { Component, inject } from '@angular/core';
import { CardComponent } from '@features/products/card/card.component';
import { ProductsService } from '@features/products/products.service';
import { Product } from '@shared/models/product.interface';
import { QuantityComponent } from '@shared/ui/quantity/quantity.component';
import { CartStore } from 'app/store/shopping-cart.store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent, QuantityComponent],
  styleUrl: './products.component.scss',
  template: ` <section class="text-gray-light">
    <div class="product-container">
      <div class="product-grid">
        @for (product of products(); track product.id) {
          <app-card
            (addToCartEvent)="onAddToCart($event)"
            class="product-card"
            [product]="product"
          >
            <!--      <app-quantity
              [quantity]="product.quantity"
              (onChange)="changeQuantity($event, product.id)"
            /> -->
          </app-card>
        }
      </div>
    </div>
  </section>`,
})
export default class ProductsComponent {
  readonly products = inject(ProductsService).products;
  private readonly cartStore = inject(CartStore);

  public changeQuantity(action: string, productId: number) {
    // INCREMENT DECREMENT
    if (action === 'DECREMENT') {
      this.cartStore.decrement(productId);
    } else if (action === 'INCREMENT') {
      this.cartStore.increment(productId);
    }
  }

  public onAddToCart(product: Product): void {
    this.cartStore.addToCart(product);
  }
}
