import { Injectable } from '@angular/core';
import { StockShort } from '../models/StockShort';
import { StockCurrent } from './../models/StockCurrent';
import { StockService } from './../services/stock.service';

@Injectable({
  providedIn: 'root',
})
export class StockCurrentService {
  private stocksCurrent: StockCurrent[] = [];

  constructor(private stockService: StockService) {}

  public getStock(symbol: string): StockCurrent {
    return this.stocksCurrent.find((s) => s.symbol === symbol);
  }

  public getAll(): StockCurrent[] {
    return this.stocksCurrent;
  }

  public add(stock: StockCurrent): void {
    this.stocksCurrent.push(stock);
  }

  public update(stocks: StockShort[], stock: StockCurrent): void {
    const index = stocks.findIndex((s) => s.symbol === stock.symbol);
    stocks[index].price = stock.price;
    stocks[index].date = stock.date;
  }

  public updateAll(stocks: StockCurrent[]): void {
    for (let i = 0; i < stocks.length; i++) {
      this.stocksCurrent[i] = stocks[i];
    }
  }
}
