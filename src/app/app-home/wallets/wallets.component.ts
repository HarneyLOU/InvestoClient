import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddWalletComponent } from './add-wallet/add-wallet.component';
import { WalletService } from './../../app-core/services/wallet.service';
import { Wallet } from './../../app-core/models/Wallet';
@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss'],
})
export class WalletsComponent implements OnInit {
  wallets: Wallet[];

  constructor(public dialog: MatDialog, private walletService: WalletService) {}

  ngOnInit(): void {
    this.walletService.getUserWallets().subscribe((data) => {
      this.wallets = data;
    });
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
