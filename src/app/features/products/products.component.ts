import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductsService } from '@api/products.service';
import { CardComponent } from '@features/products/card/card.component';
import { Product } from '@shared/models/product.interface';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent, JsonPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
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
