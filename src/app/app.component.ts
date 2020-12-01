import { Component, OnInit } from '@angular/core';
import { ParticlesConfig } from './../assets/data/particles-config';
import { User } from './app-core/models/User';
import { AccountService } from './app-core/services/accout.service';
import { SignalrService } from './app-core/services/signalr.service';
import { StockCurrentService } from './app-core/services/stock-current.service';

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

  constructor(
    private accountService: AccountService,
    private signalrService: SignalrService,
    private stockCurrentService: StockCurrentService
  ) {
    this.accountService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {
    this.invokeParticles();

    this.signalrService.startConnection();
    this.signalrService.ListenStockUpdate();
  }

  logout() {
    this.accountService.logout();
  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig);
  }
}
