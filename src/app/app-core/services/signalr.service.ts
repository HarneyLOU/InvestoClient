import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { StockCurrentService } from './stock-current.service';
import { MarketService } from './market.service';
import { StockCurrent } from './../models/StockCurrent';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;
  websocketUrl: string;

  constructor(
    private stockCurrentService: StockCurrentService,
    private marketService: MarketService
  ) {
    this.websocketUrl = environment.websocketUrl;
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.websocketUrl + '/realtimetrades')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public ListenStockUpdate = () => {
    this.hubConnection.on('stockupdate', (data) => {
      for (const d of data) {
        const stock: StockCurrent = {
          symbol: d.symbol,
          price: d.price,
          date: d.date,
        };
        this.stockCurrentService.update(stock);
      }
    });
  };

  public ListenMarketStatusUpdate = () => {
    this.hubConnection.on('marketstatus', (data) => {
      this.marketService.setMarketStatus(data);
    });
  };
}
