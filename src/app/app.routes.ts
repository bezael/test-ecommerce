import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes'),
  },
  {
    path: 'categories',
    loadChildren: () => import('./features/categories/categories.routes'),
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.routes'),
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./features/wishlist/wishlist.routes'),
  },
  {
    path: 'checkout',
    loadChildren: () => import('./features/checkout/checkout.routes'),
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];
