import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductsService } from '@features/products/products.service';
import { WishlistService } from '@features/wishlist/wishlist.service';
import { Product } from '@shared/models/product.interface';
import { AddToCartComponent } from '@shared/ui/add-to-cart/add-to-cart.component';
import { WishlistProductComponent } from '@shared/ui/wishlist/wishlist-product.component';
import { CartStore } from 'app/store/shopping-cart.store';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [AddToCartComponent, WishlistProductComponent, CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export default class DetailsComponent {
  starsArray: number[] = new Array(5).fill(0);
  cartStore = inject(CartStore);
  wishlistSvc = inject(WishlistService);

  productId = input.required<number>({ alias: 'id' });

  product = computed(() =>
    this._productSvc.products()?.find(({ id }) => id == this.productId()),
  );

  private readonly _productSvc = inject(ProductsService);
  private readonly _sanitizer = inject(DomSanitizer);

  public onAddToCart(): void {
    this.cartStore.addToCart(this.product() as Product);
  }

  public addOrRemoveFavorite(product: any): void {
    console.log('Akiii', product);
    this.wishlistSvc.addOrRemoveWishlist(product, 2);
  }

  // TODO: Por Dios refactorizar esto
  getStarSVG(index: number): SafeHtml {
    let svgContent = null;
    const rate = this.product()?.rating?.rate as number;

    if (index + 1 <= Math.floor(rate)) {
      svgContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2" class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
              </path>
            </svg>`;
    } else if (index < rate) {
      // Retorna el SVG de la estrella parcialmente llena si necesitas una lógica específica para esto
      svgContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="partialFillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" style="stop-color:currentColor; stop-opacity:1" />
              <stop offset="50%" style="stop-color:currentColor; stop-opacity:0" />
            </linearGradient>
          </defs>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#partialFillGradient)"></path>
        </svg>`;
    } else {
      // Retorna el SVG de la estrella vacía
      svgContent = `<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
              </path>
            </svg>`;
    }
    return this._sanitizer.bypassSecurityTrustHtml(svgContent);
  }
}
