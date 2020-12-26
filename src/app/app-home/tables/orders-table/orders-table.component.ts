import { NumberSymbol } from '@angular/common';
import { Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/app-core/models/Order';
import { OrderService } from 'src/app/app-core/services/order.service';

export interface OrderTransaction {
  orderId: number;
  position: number;
  symbol: string;
  singlePrice: number;
  amount: number;
  price: number;
  transactionType: string;
  status: string;
  realised: Date;
  limit: number;
  activation: Date;
  expiration: Date;
}

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
})
export class OrdersTableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() orders: Order[];

  displayedColumns: string[] = [
    'position',
    'symbol',
    'singlePrice',
    'amount',
    'price',
    'transactionType',
    'limit',
    'status',
    'activation',
    'expiration',
    'realised',
    'action',
  ];

  dataSource: MatTableDataSource<OrderTransaction>;

  constructor(private orderService: OrderService) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    let i = 1;
    for (const order of this.orders) {
      const transaction = order.transactions.pop();
      const orderTransaction: OrderTransaction = {
        orderId: order.orderId,
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
        limit: order.limit ?? null,
        activation: order.activationDate,
        expiration: order.expiryDate,
      };
      this.dataSource.data.push(orderTransaction);
      i++;
    }
  }

  onCancel(value: number) {
    this.orderService.cancelOrder(value).subscribe((data) => {
      const order: Order = data;
      if (order.status === 'Cancelled - on request') {
        this.dataSource.data.find((o) => o.orderId === order.orderId).status =
          order.status;
      }
    });
  }
}
