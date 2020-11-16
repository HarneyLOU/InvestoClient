import { NgModule } from '@angular/core';

import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppMaterialModule } from '../app-material/app-material.module';
import { AppRoutingModule } from '../app-routing.module';
import { AppCoreModule } from '../app-core/app-core.module';
import { StocksComponent } from './stocks/stocks.component';
import { HomeComponent } from './home/home.component';
import { StockCardComponent } from './stocks/stock-card/stock-card.component';

@NgModule({
  declarations: [
    NavigationComponent,
    DashboardComponent,
    StocksComponent,
    HomeComponent,
    StockCardComponent,
  ],
  imports: [AppMaterialModule, AppRoutingModule, AppCoreModule],
  exports: [NavigationComponent],
})
export class AppHomeModule {}
