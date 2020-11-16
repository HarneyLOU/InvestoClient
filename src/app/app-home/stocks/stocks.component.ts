import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SignalrService } from './../../app-core/services/signalr.service';
import { StockCurrentService } from './../../app-core/services/stock-current.service';
import { StockService } from './../../app-core/services/stock.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
})
export class StocksComponent implements OnInit {
  stocks: any;
  stocksPerRow: number;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private signalrService: SignalrService,
    private stockCurrentService: StockCurrentService,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    this.stockService.getStockShortAll().subscribe((data) => {
      this.stocks = data;
      this.signalrService.startConnection();
      this.signalrService.ListenStockUpdate(this.stocks);
    });
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.stocksPerRow = 1;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.stocksPerRow = 2;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.stocksPerRow = 3;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.stocksPerRow = 4;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.stocksPerRow = 6;
        }
      });
  }
}
