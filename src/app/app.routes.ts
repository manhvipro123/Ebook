import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shares/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.route').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/main/main.route').then((m) => m.MAIN_ROUTES),
  },
  {
    path: 'loading',
    loadChildren: () =>
      import('./pages/loading/loading.route').then((m) => m.LOADING_ROUTES),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // redirect to `login`
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
