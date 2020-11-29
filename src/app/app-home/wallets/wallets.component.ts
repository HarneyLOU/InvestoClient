import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddWalletComponent } from './add-wallet/add-wallet.component';
import { WalletService } from './../../app-core/services/wallet.service';
import { Wallet } from './../../app-core/models/Wallet';
import { StockCurrentService } from 'src/app/app-core/services/stock-current.service';
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss'],
  animations: [
    trigger('fade', [
      transition(
        'void => *',
        [
          style({ opacity: 0 }),
          animate('200ms {{delay}}ms', style({ opacity: 1 })),
        ],
        { params: { delay: 0 } }
      ),
    ]),
  ],
})
export class WalletsComponent implements OnInit {
  wallets: Wallet[];
  delay = 300;

  constructor(
    public dialog: MatDialog,
    private walletService: WalletService,
    private stockCurrentService: StockCurrentService
  ) {}

  ngOnInit(): void {
    this.walletService.getUserWallets().subscribe((data) => {
      this.wallets = data;
    });
  }

  walletValue(wallet: Wallet): number {
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

  walletChange(wallet: Wallet): number {
    return (wallet.balance + wallet.value) / wallet.initMoney - 1;
  }

  openAddingWallet(): void {
    const dialogRef = this.dialog.open(AddWalletComponent, {
      width: '300px',
      data: { wallets: this.wallets },
    });
  }

  onRemoveWallet(wallet: Wallet): void {
    this.walletService.deleteUserWallet(wallet.walletId).subscribe((data) => {
      console.log(data);
      const index: number = this.wallets.indexOf(wallet);
      if (index !== -1) {
        this.wallets.splice(index, 1);
      }
    });
  }
}
