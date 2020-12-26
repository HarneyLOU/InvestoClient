import { Injectable } from '@angular/core';
import { StockShort } from '../models/StockShort';
import { StockCurrent } from './../models/StockCurrent';
import { StockService } from './../services/stock.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StockCurrentService {
  stocksCurrent = new BehaviorSubject<StockShort[]>(null);

  constructor(private stockService: StockService) {
    this.stockService.getStockShortAll().subscribe((data) => {
      this.stocksCurrent.next(data);
    });
  }

  public getStock(symbol: string): any {
    return this.stocksCurrent.asObservable().pipe(
      filter((value) => value !== null),
      map((stocks) => stocks.find((s) => s.symbol === symbol))
    );
  }

  public getAll(): Observable<StockShort[]> {
    return this.stocksCurrent
      .asObservable()
      .pipe(filter((value) => value !== null));
  }

  public add(stock: StockShort): void {
    this.stocksCurrent.value.push(stock);
  }

  public update(stock: StockCurrent): void {
    const index = this.stocksCurrent.value.findIndex(
      (s) => s.symbol === stock.symbol
    );
    this.stocksCurrent.value[index].price = stock.price;
    this.stocksCurrent.value[index].date = stock.date;
  }

  public updateAll(stocks: StockCurrent[]): void {
    for (let i = 0; i < stocks.length; i++) {
      this.stocksCurrent[i].price = stocks[i].price;
      this.stocksCurrent[i].date = stocks[i].date;
    }
  }
}
