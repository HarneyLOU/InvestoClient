import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppMaterialModule } from '../app-material/app-material.module';
import { AppRoutingModule } from '../app-routing.module';
import { AppCoreModule } from '../app-core/app-core.module';
import { StocksComponent } from './stocks/stocks.component';
import { HomeComponent } from './home/home.component';
import { StockCardComponent } from './stocks/stock-card/stock-card.component';
import { WalletsComponent } from './wallets/wallets.component';
import { StartupComponent } from './startup/startup.component';
import { AddWalletComponent } from './wallets/add-wallet/add-wallet.component';
import { WalletComponent } from './wallets/wallet/wallet.component';
import { StockOrderComponent } from './stocks/stock-order/stock-order.component';

@NgModule({
  declarations: [
    NavigationComponent,
    DashboardComponent,
    StocksComponent,
    HomeComponent,
    StockCardComponent,
    WalletsComponent,
    StartupComponent,
    AddWalletComponent,
    WalletComponent,
    StockOrderComponent,
  ],
  imports: [
    AppMaterialModule,
    AppRoutingModule,
    AppCoreModule,
    ReactiveFormsModule,
  ],
  exports: [NavigationComponent, StartupComponent],
})
export class AppHomeModule {}
