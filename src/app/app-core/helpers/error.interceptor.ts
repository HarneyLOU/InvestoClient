import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from './../services/accout.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  transformError(err: { [key: string]: any }) {
    const messages: string[] = [];

    if (err) {
      for (let key in err) {
        for (let message of err[key]) {
          messages.push(`${key}: ${message}`);
        }
      }
    }

    return messages;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.accountService.logout();
        }
        return throwError(this.transformError(err.error.errors));
      })
    );
  }
}
