import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private marketStatus: BehaviorSubject<string> = new BehaviorSubject<string>(
    'Synchronizing'
  );

  constructor() {}

  public getMarketStatus(): Observable<string> {
    return this.marketStatus.asObservable();
  }

  public setMarketStatus(status: string): void {
    this.marketStatus.next(status);
  }
}
