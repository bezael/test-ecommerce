import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from '@features/products/card/card.component';
import { ProductsService } from '@features/products/products.service';
import { Product } from '@shared/models/product.interface';
import { CartStore } from 'app/store/shopping-cart.store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent, RouterOutlet],
  template: `<section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap -m-4">
        @for (product of products(); track product.id) {
          <app-card
            (addToCartEvent)="onAddToCart($event)"
            class="w-full p-4 lg:w-1/4 md:w-1/2 "
            [product]="product"
          />
        }
      </div>
    </div>
  </section>`,
})
export class ProductsComponent {
  cartStore = inject(CartStore);

  private readonly productSvc = inject(ProductsService);
  products = this.productSvc.products;

  public onAddToCart(product: Product): void {
    this.cartStore.addToCart(product);
  }
}
