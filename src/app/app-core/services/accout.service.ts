import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from './../models/User';

declare const gapi: any;

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email, password) {
    return this.http
      .post<User>(`${environment.apiUrl}/user/authenticate`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('external', 'local');
          this.userSubject.next(user);
          return user;
        })
      );
  }

  loginWithGoogle(token) {
    return this.http
      .post<User>(`${environment.apiUrl}/user/authenticate-with-google`, {
        token,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('external', 'google');
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);

    // if (localStorage.getItem('external') === 'google') {
    //   let auth2 = gapi.auth2.init({
    //     client_id:
    //       '1046162263305-iie4bj416r9oehqkrr5rgdluqrrqdg19.apps.googleusercontent.com',
    //   });
    //   auth2 = gapi.auth2.getAuthInstance();
    //   auth2.signOut().then(function () {
    //     console.log('User signed out.');
    //   });
    //   localStorage.removeItem('external');
    // }
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/user/register`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/user`);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
  }

  update(id, params) {
    return this.http.put(`${environment.apiUrl}/user/${id}`, params).pipe(
      map((x) => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/user/${id}`).pipe(
      map((x) => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue.id) {
          this.logout();
        }
        return x;
      })
    );
  }
}
