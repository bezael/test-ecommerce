import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsService } from '@api/products.service';
import { CardComponent } from '@features/products/card/card.component';
import { Product } from '@shared/models/product.interface';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent, RouterOutlet],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  private readonly productSvc = inject(ProductsService);
  products = this.productSvc.products;

  private readonly shoppingCartSvc = inject(ShoppingCartService);
  shoppingCart = this.shoppingCartSvc.shoppingCart;

  onAddToCart(product: Product): void {
    this.shoppingCartSvc.addItem(product);
  }
}
