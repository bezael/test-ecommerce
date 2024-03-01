import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit, Signal, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductsService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';
import { CartStore } from 'app/store/shopping-cart.store';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  starsArray: number[] = new Array(5).fill(0);
  cartStore = inject(CartStore);

  @Input({ alias: 'id' }) productId!: number;
  // productId = input<number>(0, { alias: 'id' });
  public product!: Signal<Product | undefined>;
  // public product = signal<Product | undefined>(undefined);
  private readonly productSvc = inject(ProductsService);
  // private readonly injector = inject(EnvironmentInjector);
  private readonly sanitizer = inject(DomSanitizer);

  /*   private readonly shoppingCartSvc = inject(ShoppingCartService);
  shoppingCart = this.shoppingCartSvc.shoppingCart; */

  ngOnInit(): void {
    // this.product.set(this.productSvc.getProductById(this.productId));
    this.product = this.productSvc.getProductById(this.productId);

    /*    runInInjectionContext(this.injector, () => {
      this.product = toSignal<Product>(
        this.productSvc.getProductById(this.productId),
      );
    }); */
  }

  onAddToCart() {
    //  this.shoppingCartSvc.addItem(this.product() as Product);
    this.cartStore.addToCart(this.product() as Product); // Check this type
  }

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
    return this.sanitizer.bypassSecurityTrustHtml(svgContent);
  }
}
