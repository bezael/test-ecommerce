import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':categoryName',
    loadComponent: () => import('./categories.component'),
  },
];
export default routes;
