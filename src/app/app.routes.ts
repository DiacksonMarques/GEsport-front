import { ConfirmPresenceComponent } from './pages/selective-administrative/confirm-presence/confirm-presence.component';
import { AthleteRegistrationComponent } from './pages/dashboard/athlete-registration/athlete-registration.component';
import { Routes } from '@angular/router';

import { AuthGuard, AuthGuardLogin } from './core/auth/auth.guard';

import { Page404Component } from './pages/page-404/page-404.component';
import { LoginComponent } from './pages/login/login.component';
import { InscricaoComponent } from './pages/inscricao/inscricao.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { FinancialComponent } from './pages/dashboard/financial/financial.component';
import { SelectiveRegistrationComponent } from './pages/selective-registration/selective-registration.component';
import { DeferCandidateComponent } from './pages/selective-administrative/defer-candidate/defer-candidate.component';
import { EvaluationCandidateComponent } from './pages/selective-administrative/evaluation-candidate/evaluation-candidate.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardLogin]},
  { path: 'acompanhe', component: InscricaoComponent, canActivate: [AuthGuardLogin]},
  { path: 'acompanhe/:enrollment', component: InscricaoComponent, canActivate: [AuthGuardLogin]},
  { path: 'inscricao', component: SelectiveRegistrationComponent, canActivate: [AuthGuardLogin]},
  { path: 'seletiva',
    children: [
      {path: 'deferir', component: DeferCandidateComponent},
      {path: 'presenca', component: ConfirmPresenceComponent},
      {path: 'avalicao', component: EvaluationCandidateComponent},
    ],
    canActivate: [AuthGuardLogin]
  },


  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'financial', component: FinancialComponent, canActivate: [AuthGuard]},
  { path: 'inscricaoAtleta', component: AthleteRegistrationComponent, canActivate: [AuthGuard]},

  //404
  { path: '**', component: Page404Component },
];
