import { NumberSymbol } from '@angular/common';
import { Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/app-core/models/Order';
import { Wallet } from 'src/app/app-core/models/Wallet';
import { OrderService } from 'src/app/app-core/services/order.service';

export interface OrderTransaction {
  position: number;
  symbol: string;
  singlePrice: number;
  amount: number;
  price: number;
  transactionType: string;
  status: string;
  realised: Date;
}

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
})
export class OrdersTableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @Input() orders: Order[];

  displayedColumns: string[] = [
    'position',
    'symbol',
    'singlePrice',
    'amount',
    'price',
    'transactionType',
    'status',
    'realised',
  ];

  dataSource: MatTableDataSource<OrderTransaction>;

  constructor(private orderService: OrderService) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    let i = 1;
    for (const order of this.orders) {
      const transaction = order.transactions.pop();
      const orderTransaction: OrderTransaction = {
        position: i,
        symbol: order.symbol,
        singlePrice: transaction
          ? transaction.price / transaction.amount
          : null,
        amount: transaction ? transaction.amount : order.amount,
        price: transaction ? transaction.price : null,
        transactionType: order.buy ? 'Buy' : 'Sell',
        status: order.status,
        realised: transaction ? transaction.realised : order.created,
      };
      this.dataSource.data.push(orderTransaction);
      i++;
    }
  }
}
