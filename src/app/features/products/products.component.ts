import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardComponent } from '@features/products/card/card.component';
import { ProductsService } from '@features/products/products.service';
import { Product } from '@shared/models/product.interface';
import { QuantityComponent } from '@shared/ui/quantity/quantity.component';
import { CartStore } from 'app/store/shopping-cart.store';

@Component({
  selector: 'app-products',
  standalone: true,

  imports: [CardComponent, QuantityComponent, CommonModule],
  template: ` <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap -m-4">
        @for (product of products(); track product.id) {
          <app-card
            (addToCartEvent)="onAddToCart($event)"
            class="w-full p-4 lg:w-1/4 md:w-1/2 "
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
