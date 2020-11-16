import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './app-home/dashboard/dashboard.component';
import { HomeComponent } from './app-home/home/home.component';
import { StocksComponent } from './app-home/stocks/stocks.component';

import { AuthGuard } from './app-core/helpers/auth-guard';

const appAuthModule = () =>
  import('./app-auth/app-auth.module').then((x) => x.AppAuthModule);

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'stocks', component: StocksComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: appAuthModule },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
