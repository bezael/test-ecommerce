import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component'),
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component'),
  },
  {
    path: 'orders',
    loadComponent: () => import('./orders/orders.component'),
  },
];
export default routes;
