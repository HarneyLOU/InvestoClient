import { Component, OnInit } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AccountService } from './../../app-core/services/accout.service';
import { User } from 'src/app/app-core/models/User';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss'],
})
export class StartupComponent implements OnInit {
  user: User;

  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {
    if (this.user) {
      this.router.navigate(['/home']);
    }
  }
}
