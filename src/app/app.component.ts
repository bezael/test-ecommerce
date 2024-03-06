import { AsyncPipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CategoryService } from '@features/categories/categories.service';
import { ProductsService } from '@features/products/products.service';
import { FooterComponent } from '@layout/footer/footer.component';
import { HeaderComponent } from '@layout/header/header.component';
import HeroComponent from '@layout/hero/hero.component';
import { FilterComponent } from '@shared/ui/filter/filter.component';
import { SpinnerComponent } from '@shared/ui/spinner/spinner.component';
import { CartStore } from '@store/shopping-cart.store';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    HeroComponent,
    FilterComponent,
    RouterOutlet,
    AsyncPipe,
  ],
  template: `
    <div class="flex flex-col h-screen">
      <app-header
        [categories]="categories()"
        [productsCart]="productsCart()"
        [totalAmount]="totalAmount()"
        [productsCount]="productsCount()"
      />
      @if (showSection()) {
        <app-hero />
        <app-filter
          (categoryEvent)="onCategoryChange($event)"
          [categories]="categories()"
        />
      }
      <!--  <main class="container px-4 py-10 mx-auto"> -->
      <main class="flex-grow">
        <app-spinner />
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  showSection = signal<boolean>(false);
  readonly cartStore = inject(CartStore);
  readonly productsCart = computed(() => this.cartStore.products());
  readonly totalAmount = computed(() => this.cartStore.totalAmount());
  readonly productsCount = computed(() => this.cartStore.productsCount());
  readonly categories = inject(CategoryService).categories;

  private readonly _router = inject(Router);
  private readonly _productSvc = inject(ProductsService);

  /*   
    cart = computed(() => {
      products: this.cartStore.products(),
      productsCount: this.cartStore.productsCount(),
      totalAmount: this.cartStore.totalAmount()
    }); 
    */

  ngOnInit(): void {
    this._showSection();
  }

  public onCategoryChange(category: string) {
    if (category === 'all') {
      this._productSvc.getAllProducts();
    } else {
      this._productSvc.getProductsByCategory(category);
    }
  }

  private _showSection() {
    this._router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        tap((event: NavigationEnd) => {
          const isHomePage = event.url === '/' || event.url === '/products';
          this.showSection.set(isHomePage);
        }),
      )
      .subscribe();
  }
}
