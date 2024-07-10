import { Routes } from '@angular/router';

const categoriesRoutes: Routes = [
  {
    path: ':categoryName',
    loadComponent: () => import('./categories.component'),
  },
];
export default categoriesRoutes;
