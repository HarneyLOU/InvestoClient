import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Team } from './../models/Team';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
  };
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  public addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.apiUrl + '/team', team, this.httpOptions);
  }

  public getUserTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl + '/team', this.httpOptions);
  }

  public joinTeam(code: string): Observable<Team> {
    return this.http.get<Team>(this.apiUrl + '/team/' + code, this.httpOptions);
  }
}
