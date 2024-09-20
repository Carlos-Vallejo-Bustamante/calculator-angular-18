import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'calculator',
        loadComponent: () => import('@/calculator/pages/calculator-page/calculator-page.component')
    },
    {
        path: '**',
        redirectTo: 'calculator',
    }
];
