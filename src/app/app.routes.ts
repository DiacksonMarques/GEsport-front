import { AthleteRegistrationComponent } from './pages/athlete-registration/athlete-registration.component';
import { Routes } from '@angular/router';

import { AuthGuardLogin } from './core/auth/auth.guard';

import { Page404Component } from './pages/page-404/page-404.component';
import { LoginComponent } from './pages/login/login.component';
import { InscricaoComponent } from './pages/inscricao/inscricao.component';
import { AthleteRegistrationUpdateComponent } from './pages/athlete-registration-update/athlete-registration-update.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardLogin]},
  { path: 'inscricao', component: InscricaoComponent, canActivate: [AuthGuardLogin]},
  { path: 'inscricaoAtleta', component: AthleteRegistrationComponent, canActivate: [AuthGuardLogin]},
  { path: 'alterarAtleta', component: AthleteRegistrationUpdateComponent, canActivate: [AuthGuardLogin]},

  //404
  { path: '**', component: Page404Component },
];
