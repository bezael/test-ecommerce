import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products.component').then(
        (c) => c.ProductsComponent,
      ),
  },
  {
    path: 'product-details/:id',
    loadComponent: () =>
      import('./features/products/details/details.component').then(
        (c) => c.DetailsComponent,
      ),
  }, // should be child route // NO la creees ahora
  /* { path: 'cart', component: CartComponent }, */
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];
