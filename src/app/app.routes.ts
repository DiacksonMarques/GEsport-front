import { Routes } from '@angular/router';
import { HomeComponent } from './pages/landing-page/home/home.component';
import { Page404Component } from './pages/landing-page/page-404/page-404.component';
import { LoginComponent } from './pages/landing-page/login/login.component';
import { AuthGuard, AuthGuardLogin } from './core/auth/auth.guard';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { RolesComponent } from './pages/admin/roles/roles.component';
import { InscricaoComponent } from './pages/landing-page/inscricao/inscricao.component';

export const routes: Routes = [
  { path: '' ,component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardLogin]},
  { path: 'inscricao', component: InscricaoComponent, canActivate: [AuthGuardLogin]},

  //ADMIN
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'roles', component: RolesComponent, canActivate: [AuthGuard]},

  { path: '**', component: Page404Component },
];
