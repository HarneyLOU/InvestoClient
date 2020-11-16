import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { StockCurrentService } from './stock-current.service';
import { StockCurrent } from './../models/StockCurrent';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;

  constructor(private stockCurrentService: StockCurrentService) {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/realtimetrades')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public ListenStockUpdate = (stocks) => {
    this.hubConnection.on('stockupdate', (data) => {
      for (const d of data) {
        const stock: StockCurrent = {
          symbol: d.symbol,
          price: d.price,
          date: d.date,
        };
        this.stockCurrentService.update(stocks, stock);
      }
      console.log(data);
    });
  };
}
