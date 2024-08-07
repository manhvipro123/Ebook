import {Routes} from "@angular/router";
import {MainComponent} from "./main.component";

export const MAIN_ROUTES: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./components/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
            },
            {
                path: 'ebooks',
                loadChildren: () => import('./components/ebooks/ebooks.routes').then(m => m.EBOOKS_ROUTES)
            },
            {
                path: 'authors',
                loadChildren: () => import('./components/authors/authors.routes').then(m => m.AUTHORS_ROUTES)
            },
            {
                path: 'categories',
                loadChildren: () => import('./components/categories/categories.routes').then(m => m.CATEGORIES_ROUTES)
            },
            {
                path: 'user',
                loadChildren: () => import('./components/user/user.routes').then(m => m.USER_ROUTES)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    }
]