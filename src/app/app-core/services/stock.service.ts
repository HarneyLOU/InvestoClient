import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StockShort } from './../models/StockShort';
import { Stock } from './../models/Stock';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
  };

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  public getStockShortAll(): Observable<StockShort[]> {
    return this.http.get<StockShort[]>(
      this.apiUrl + '/stock/short',
      this.httpOptions
    );
  }

  public getHistoricData(
    stockId: string,
    from?: string,
    to?: string,
    interval?: string
  ): Observable<Stock[]> {
    const stockParams = new HttpParams()
      .set('stockId', stockId)
      .set('from', from ?? null)
      .set('to', to ?? null)
      .set('interval', interval ?? null);
    return this.http.get<Stock[]>(this.apiUrl + '/stock/history', {
      headers: this.httpOptions.headers,
      params: stockParams,
    });
  }

  public getLastData(stockId: string, period: string): Observable<Stock[]> {
    const stockParams = new HttpParams()
      .set('stockId', stockId)
      .set('period', period ?? 'd');
    return this.http.get<Stock[]>(this.apiUrl + '/stock/last', {
      headers: this.httpOptions.headers,
      params: stockParams,
    });
  }
}
