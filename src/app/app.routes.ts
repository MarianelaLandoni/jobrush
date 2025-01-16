import { Routes } from '@angular/router';
import { authGuard } from 'core/guards/auth.guard';
import { DashboardComponent } from 'features/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('./features/dashboard/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'tableros',
        loadComponent: () =>
          import('./features/dashboard/boards/boards.component').then((m) => m.BoardsComponent),
      },
      {
        path: 'tableros/:id',
        loadComponent: () =>
          import('./features/dashboard/boards/board-detail/board-detail.component').then(
            (m) => m.BoardDetailComponent
          ),
      },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    ],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
