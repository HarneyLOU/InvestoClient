import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService } from './../../app-core/services/accout.service';

declare const gapi: any;

@Component({
  selector: 'app-login-google',
  templateUrl: 'login-google.component.html',
  styleUrls: ['./login-google.component.scss'],
})
export class LoginGoogleComponent implements AfterViewInit, OnInit, OnDestroy {
  loginInvalid = false;
  loading = false;
  submitted = false;
  returnUrl: string;

  public auth2: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnDestroy(): void {
    console.log('PAPA');
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '1046162263305-iie4bj416r9oehqkrr5rgdluqrrqdg19.apps.googleusercontent.com',
        prompt: 'select_account',
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        this.accountService
          .loginWithGoogle(googleUser.getAuthResponse().id_token)
          .pipe(first())
          .subscribe(
            (data) => {
              this.router.navigate([this.returnUrl]);
            },
            (error) => {
              this.loading = false;
              this.loginInvalid = true;
            }
          );
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }

  ngAfterViewInit() {
    this.googleInit();
  }
}
