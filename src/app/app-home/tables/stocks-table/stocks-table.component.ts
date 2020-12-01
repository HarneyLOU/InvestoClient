import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { WalletState } from 'src/app/app-core/models/WalletState';
import { Wallet } from 'src/app/app-core/models/Wallet';
import { StockCurrentService } from 'src/app/app-core/services/stock-current.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface StockPossesion {
  position: number;
  symbol: string;
  amount: number;
  value?: number;
  average?: number;
  change?: number;
}

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.scss'],
})
export class StocksTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @Input() possesions: WalletState[];
  @Input() wallet: Wallet;

  displayedColumns: string[] = [
    'position',
    'symbol',
    'amount',
    'value',
    'change',
    'action',
  ];

  dataSource: MatTableDataSource<StockPossesion>;

  constructor(private stockCurrentService: StockCurrentService) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.wallet;
    this.dataSource = new MatTableDataSource();
    let i = 1;
    for (let possesion of this.possesions) {
      const newElement: StockPossesion = {
        position: i,
        symbol: possesion.symbol,
        amount: possesion.amount,
        average: possesion.averagePrice,
      };
      this.dataSource.data.push(newElement);
      i++;
    }
    for (let element of this.dataSource.data) {
      this.stockCurrentService.getStock(element.symbol).subscribe((data) => {
        element.value = data.price * element.amount;
        element.change =
          (data.price * element.amount) / (element.average * element.amount) -
          1;
      });
    }
  }

  getTotalCost(): number {
    return this.dataSource.data
      .map((s) => s.value)
      .reduce((acc, value) => acc + value, 0);
  }

  getTotalChange(): number {
    return this.dataSource.data
      .map((s) => s.change)
      .reduce((acc, value) => acc + value, 0);
  }
}
