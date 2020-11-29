import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { StockCurrentService } from './../../app-core/services/stock-current.service';
import { StockService } from './../../app-core/services/stock.service';
import { StockShort } from 'src/app/app-core/models/StockShort';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
})
export class StocksComponent implements OnInit {
  stocks: StockShort[];
  stocksPerRow: number;
  delay = 100;

  filteredOptions: Observable<StockShort[]>;

  myControl = new FormControl('');

  constructor(
    private breakpointObserver: BreakpointObserver,
    private stockCurrentService: StockCurrentService
  ) {}

  private _filter(value: string): StockShort[] {
    const filterValue = value.toLowerCase();
    return this.stocks.filter(
      (option) =>
        option.symbol.toLowerCase().includes(filterValue) ||
        option.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.stockCurrentService.getAll().subscribe((data) => {
      this.stocks = data;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
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
          this.stocksPerRow = 3;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.stocksPerRow = 4;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.stocksPerRow = 5;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.stocksPerRow = 6;
        }
      });
  }
}
