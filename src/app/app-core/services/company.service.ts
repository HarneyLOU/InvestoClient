import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../models/Company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
  };

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  public getCompany(stockId: string): Observable<Company> {
    return this.http.get<Company>(
      this.apiUrl + '/company/' + stockId,
      this.httpOptions
    );
  }
}
