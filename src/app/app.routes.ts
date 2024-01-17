import { Routes } from '@angular/router';
import { HomeComponent } from './landing-page/home/home.component';
import { Page404Component } from './landing-page/page-404/page-404.component';
import { LoginComponent } from './core/login/login.component';

export const routes: Routes = [
  { path: '' ,component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: Page404Component },
];
