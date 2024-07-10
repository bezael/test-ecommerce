import { Routes } from '@angular/router';

const wishlistRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./wishlist.component'),
  },
];

export default wishlistRoutes;
