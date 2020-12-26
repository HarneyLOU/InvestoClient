import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './app-home/dashboard/dashboard.component';
import { HomeComponent } from './app-home/home/home.component';
import { StocksComponent } from './app-home/stocks/stocks.component';
import { WalletsComponent } from './app-home/wallets/wallets.component';
import { WalletComponent } from './app-home/wallets/wallet/wallet.component';
import { StockOrderComponent } from './app-home/stocks/stock-order/stock-order.component';

import { AuthGuard } from './app-core/helpers/auth-guard';
import { StartupComponent } from './app-home/startup/startup.component';
import { ErrorComponent } from './app-home/error/error.component';
import { StockDetailsComponent } from './app-home/stocks/stock-details/stock-details.component';
import { TeamsComponent } from './app-home/teams/teams.component';

const appAuthModule = () =>
  import('./app-auth/app-auth.module').then((x) => x.AppAuthModule);

const routes: Routes = [
  { path: '', component: StartupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'stocks', component: StocksComponent, canActivate: [AuthGuard] },
  { path: 'wallets', component: WalletsComponent, canActivate: [AuthGuard] },
  { path: 'wallets/:id', component: WalletComponent, canActivate: [AuthGuard] },
  {
    path: 'stocks/:id',
    component: StockDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'teams', component: TeamsComponent, canActivate: [AuthGuard] },
  { path: 'order', component: StockOrderComponent, canActivate: [AuthGuard] },
  { path: 'error', component: ErrorComponent },
  { path: 'auth', loadChildren: appAuthModule },
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
