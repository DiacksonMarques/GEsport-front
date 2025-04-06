import { SaleComponent } from './pages/sale/sale/sale.component';
import { ConfirmPresenceComponent } from './pages/selective-administrative/confirm-presence/confirm-presence.component';
import { AthleteRegistrationComponent } from './pages/dashboard/athlete-registration/athlete-registration.component';
import { Routes } from '@angular/router';

import { AuthGuard, AuthGuardLogin } from './core/auth/auth.guard';

import { Page404Component } from './pages/page-404/page-404.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { FinancialComponent } from './pages/dashboard/financial/financial.component';
import { SelectiveRegistrationComponent } from './pages/selective/selective-registration/selective-registration.component';
import { EvaluationCandidateComponent } from './pages/selective-administrative/evaluation-candidate/evaluation-candidate.component';
import { SelectiveResultComponent } from './pages/selective/selective-result/selective-result.component';
import { SaleViewComponent } from './pages/sale/sale-view/sale-view.component';
import { SaleSellesComponent } from './pages/sale/sale-seller/sale-selles.component';
import { SellerComponent } from './pages/sale/seller/seller.component';
import { SaleAdminComponent } from './pages/sale/sale-admin/sale-admin.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardLogin]},
  { path: 'seletiva',
    children: [
      {path: 'inscricao', component: SelectiveRegistrationComponent},
      {path: 'acompanhe', component: SelectiveResultComponent},
      {path: 'acompanhe/:enrollment', component: SelectiveResultComponent},

      {path: 'presenca', component: ConfirmPresenceComponent},
      {path: 'avalicao', component: EvaluationCandidateComponent},
    ],
    canActivate: [AuthGuardLogin]
  },
  { path: 'venda',
    children: [
      {path: '', component: SaleComponent},
      {path: 'v/:idSeller', component: SaleComponent},
      {path: 'pesquisa', component: SaleViewComponent},
      {path: 'pesquisa/:numberSale', component: SaleViewComponent},
      {path: 'vendedor', component: SaleSellesComponent},
      {path: 'vendedor/:idSeller', component: SaleSellesComponent},
      {path: 'admin', children: [
        {path: '', component: SaleAdminComponent},
        {path: 'vendedor', component: SellerComponent},
      ]},
    ],
    canActivate: [AuthGuardLogin]
  },


  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'financial', component: FinancialComponent, canActivate: [AuthGuard]},
  { path: 'inscricaoAtleta', component: AthleteRegistrationComponent, canActivate: [AuthGuard]},

  //404
  { path: '**', component: Page404Component },
];
