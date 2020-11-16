import { Component, OnInit } from '@angular/core';
import { ParticlesConfig } from './../assets/data/particles-config';
import { User } from './app-core/models/User';
import { AccountService } from './app-core/services/accout.service';

declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Investo';
  user: User;

  public stocks: any;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {
    this.invokeParticles();
  }

  logout() {
    this.accountService.logout();
  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig);
  }
}
