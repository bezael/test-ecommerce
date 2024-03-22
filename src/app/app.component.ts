import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CategoryService } from '@features/categories/categories.service';
import { ProductsService } from '@features/products/products.service';
import { UserService } from '@features/users/users.service';
import { UserStore } from '@features/users/users.store';
import { CallToActionComponent } from '@layout/call-to-action/call-to-action.component';
import { FooterComponent } from '@layout/footer/footer.component';
import { HeaderComponent } from '@layout/header/header.component';
import HeroComponent from '@layout/hero/hero.component';
import { FilterComponent } from '@shared/ui/filter/filter.component';
import { SpinnerComponent } from '@shared/ui/spinner/spinner.component';
import { CartState, CartStore } from '@store/shopping-cart.store';
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
    CallToActionComponent,
    RouterOutlet,
    AsyncPipe,
    JsonPipe,
  ],
  template: `
    <div class="flex flex-col h-screen">
      <app-header
        (onLogoutEvent)="onLogout()"
        [cart]="cart"
        [user]="currentUser()?.user"
        [categories]="categories()"/>
      @if (showSection()) {
        <app-hero />
        <app-filter
          (categoryEvent)="onCategoryChange($event)"
          [categories]="categories()"/>
      }
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
  cart!: CartState;

  readonly cartStore = inject(CartStore);
  readonly categories = inject(CategoryService).categories;
  readonly userSvc = inject(UserService);

  readonly currentUser = computed(() => this._userStore.currentUser());
  
  private readonly _userStore = inject(UserStore);
  private readonly _router = inject(Router);
  private readonly _productSvc = inject(ProductsService);

  constructor() {
      effect(() => {
        this.cart = {
          products: this.cartStore.products(),
          productsCount: this.cartStore.productsCount(),
          totalAmount:  this.cartStore.totalAmount()
        }
      })
    }

  ngOnInit(): void {
    this._showSection();
  }
  
  public onLogout() {
    this.userSvc.logout()
      .pipe(
        tap((res) => console.log('XXXXXXXXX logout', res))
      )
      .subscribe()
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
