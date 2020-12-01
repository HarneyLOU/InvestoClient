import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockShort } from 'src/app/app-core/models/StockShort';
import { StockCurrentService } from './../../../app-core/services/stock-current.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { WalletService } from 'src/app/app-core/services/wallet.service';
import { OrderService } from 'src/app/app-core/services/order.service';
import { Wallet } from 'src/app/app-core/models/Wallet';
import { WalletState } from 'src/app/app-core/models/WalletState';
import { Order } from 'src/app/app-core/models/Order';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stock-order',
  templateUrl: './stock-order.component.html',
  styleUrls: ['./stock-order.component.scss'],
})
export class StockOrderComponent implements OnInit {
  symbol: string;
  action: string;
  stocks: StockShort[];
  filteredOptions: Observable<StockShort[]>;
  selectedStock: StockShort;

  stockControl = new FormControl('', [Validators.required]);
  amountControl = new FormControl('', [Validators.min(1), Validators.required]);
  wallets: Wallet[];
  selectedWallet: Wallet;
  walletId: number;

  cols: number;
  rows: number;

  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private stockCurrentService: StockCurrentService,
    private walletService: WalletService,
    private orderService: OrderService,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  public getSelectedStock(selected: string): void {
    this.stockCurrentService.getStock(selected).subscribe((data) => {
      this.selectedStock = data;
    });
  }

  walletChange(event: any): any {
    this.selectedWallet = this.wallets.find(
      (w) => w.walletId === event.value.walletId
    );
    this.filterStocks();
  }

  actionChange(event: any): any {
    this.action = event.value;
    this.filterStocks();
    this.selectedStock = null;
    this.stockControl.setValue(null);
  }

  ngOnInit(): void {
    this.symbol = this.route.snapshot.queryParamMap.get('symbol');
    this.walletId = +this.route.snapshot.queryParamMap.get('wallet');
    this.action = this.route.snapshot.queryParamMap.get('action') ?? 'buy';
    this.stockControl.setValue(this.symbol);
    this.getSelectedStock(this.symbol);

    this.stockCurrentService.getAll().subscribe((stocksData) => {
      this.stocks = stocksData;
      this.walletService.getUserWallets().subscribe((walletsData) => {
        this.wallets = walletsData;
        this.selectedWallet = this.getRightWallet();
        this.filteredOptions = this.stockControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
      });
    });
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((result) => {
        if (
          result.breakpoints[Breakpoints.XSmall] ||
          result.breakpoints[Breakpoints.Small]
        ) {
          this.cols = 1;
          this.rows = 2;
        } else {
          this.cols = 2;
          this.rows = 1;
        }
      });
  }

  private filterStocks(): void {
    this.filteredOptions = this.filteredOptions.pipe(
      startWith(''),
      map((value) => this._filter(''))
    );
  }

  private _filter(value: string): StockShort[] {
    const filterValue = value.toLowerCase();
    return this.stocks?.filter(
      (option) =>
        option.symbol.toLowerCase().includes(filterValue) &&
        (this.action === 'buy' ||
          this.selectedWallet?.possesions.some(
            (s) => s.symbol === option.symbol
          ))
    );
  }

  onSubmit(): void {
    if (
      this.amountControl.invalid ||
      this.stockControl.invalid ||
      this.selectedStock == null ||
      this.selectedWallet == null
    ) {
      this.openSnackBar('Please fill your order', 'Close');
      return;
    }
    const order: Order = {
      amount: this.amountControl.value,
      stockId: this.selectedStock.stockId,
      walletId: this.selectedWallet.walletId,
      buy: this.action === 'buy' ? true : false,
    };
    this.submitted = true;
    this.orderService.addOrder(order).subscribe((data) => {
      this.openSnackBar('Order has been requested', 'Check');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar
      .open(message, action, {
        duration: 2500,
      })
      .afterDismissed()
      .subscribe(() => {
        if (action === 'Check')
          this.router.navigate(['/wallets', this.selectedWallet.walletId]);
      });
  }

  getAmount(stock: StockShort): number {
    return this.selectedWallet?.possesions.find(
      (s) => s.symbol === stock.symbol
    ).amount;
  }

  getRightWallet(): Wallet {
    if (this.wallets.length > 0) {
      if (this.walletId !== 0) {
        const wallet = this.wallets.find((w) => w.walletId === this.walletId);
        if (wallet) {
          return wallet;
        }
      }
      return this.wallets[0];
    }
  }
}
