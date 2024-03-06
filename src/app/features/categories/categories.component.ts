import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { CardComponent } from '@features/products/card/card.component';
import { ProductsService } from '@features/products/products.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export default class CategoriesComponent {
  readonly _categoryName = input.required<string>({ alias: 'categoryName' });
  private readonly _productSvc = inject(ProductsService);

  productsByCategory = computed(() =>
    this._productSvc.getProductsByCategory(this._categoryName()),
  );

  filteredProducts = this._productSvc.products();

  /*   private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService); */

  /*   productId$ = this.route.params.pipe(
    map((params: any) => params['categoryName']),
  ); */
  /* products = computed(() => this._productSvc.products()); */

  //  this.productSvc.products()?.find(({ id }) => id == this.productId()),

  onAddToCart(evnet: any): void {}
}
