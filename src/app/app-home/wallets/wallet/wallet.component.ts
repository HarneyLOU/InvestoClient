import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/app-core/models/Order';
import { Wallet } from 'src/app/app-core/models/Wallet';
import { OrderService } from 'src/app/app-core/services/order.service';
import { StockCurrentService } from 'src/app/app-core/services/stock-current.service';
import { WalletService } from 'src/app/app-core/services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  wallet: Wallet;
  orders: Order[];

  constructor(
    private walletService: WalletService,
    private orderService: OrderService,
    private stockCurrentService: StockCurrentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const walletId = this.route.snapshot.paramMap.get('id');
    this.walletService.getUserWallet(+walletId).subscribe((data) => {
      this.wallet = data;
    });
    this.orderService.getOrders(+walletId).subscribe((data) => {
      this.orders = data;
    });
  }

  walletValue(wallet: Wallet): number {
    if (wallet) {
      wallet.value = 0;
      for (let walletState of wallet.possesions) {
        this.stockCurrentService
          .getStock(walletState.symbol)
          .subscribe((data) => {
            wallet.value = wallet.value + walletState.amount * data.price;
          });
      }
      return wallet.value;
    }
    return 0;
  }

  walletChange(wallet: Wallet): number {
    if (wallet) {
      return (wallet.balance + wallet.value) / wallet.initMoney - 1;
    }
    return 0;
  }
}
