import { Routes } from '@angular/router';

const checkoutRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./checkout.component'),
  },
  {
    path: 'thank-you',
    loadComponent: () => import('./thank-you/thank-you.component'),
  },
];
export default checkoutRoutes;
