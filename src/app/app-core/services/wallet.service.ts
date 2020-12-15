import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Wallet } from './../models/Wallet';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
  };

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  public getUserWallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(this.apiUrl + '/wallet', this.httpOptions);
  }

  public getUserWallet(id: number): Observable<Wallet> {
    return this.http.get<Wallet>(
      this.apiUrl + '/wallet/' + id,
      this.httpOptions
    );
  }

  public addUserWallet(wallet: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>(
      this.apiUrl + '/wallet',
      wallet,
      this.httpOptions
    );
  }

  public deleteUserWallet(id: number): Observable<{}> {
    return this.http.delete<Wallet>(
      this.apiUrl + `/wallet/${id}`,
      this.httpOptions
    );
  }

  public updateUserWallet(wallet: Wallet): Observable<Wallet> {
    return this.http.put<Wallet>(
      this.apiUrl + '/wallet/' + wallet.walletId.toString(),
      wallet,
      this.httpOptions
    );
  }
}
