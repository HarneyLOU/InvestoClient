import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StockShort } from './../models/StockShort';

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
}
