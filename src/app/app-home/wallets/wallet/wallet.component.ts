import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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
    private route: ActivatedRoute,
    public dialog: MatDialog
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

  addFunds() {
    const dialogRef = this.dialog.open(AddFundsDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (!isNaN(+result)) {
        this.wallet.initMoney += result;
        this.wallet.balance += result;
        this.walletService.updateUserWallet(this.wallet).subscribe();
      }
    });
  }
}

@Component({
  selector: 'add-funds-dialog',
  template: `<h1 mat-dialog-title>Add funds</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Funds</mat-label>
        <input matInput [(ngModel)]="funds" type="number" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="funds">Ok</button>
    </div>`,
})
export class AddFundsDialog {
  funds: number;
  constructor(public dialogRef: MatDialogRef<AddFundsDialog>) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
