import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order } from './../models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
  };

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  public addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(
      this.apiUrl + '/order',
      order,
      this.httpOptions
    );
  }

  public getOrders(walletId: number): Observable<Order[]> {
    return this.http.get<Order[]>(
      this.apiUrl + '/order/wallet/' + walletId.toString(),
      this.httpOptions
    );
  }
}
