import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
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
import { ErrorComponent } from './error/error.component';
import { StocksTableComponent } from './tables/stocks-table/stocks-table.component';
import { OrdersTableComponent } from './tables/orders-table/orders-table.component';
import { StockDetailsComponent } from './stocks/stock-details/stock-details.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { LineChartDailyComponent } from './charts/line-chart-daily/line-chart-daily.component';
import { CandleChartComponent } from './charts/candle-chart/candle-chart.component';

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
    ErrorComponent,
    StocksTableComponent,
    OrdersTableComponent,
    StockDetailsComponent,
    LineChartComponent,
    LineChartDailyComponent,
    CandleChartComponent,
  ],
  imports: [
    AppMaterialModule,
    AppRoutingModule,
    AppCoreModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [NavigationComponent, StartupComponent],
})
export class AppHomeModule {}
