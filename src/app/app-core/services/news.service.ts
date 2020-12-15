import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { News } from './../models/News';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
  };

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  public getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl + '/news', this.httpOptions);
  }
}
