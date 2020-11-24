import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockCurrentService } from './../../../app-core/services/stock-current.service';

@Component({
  selector: 'app-stock-order',
  templateUrl: './stock-order.component.html',
  styleUrls: ['./stock-order.component.scss'],
})
export class StockOrderComponent implements OnInit {
  symbol: string;
  stock: any;

  constructor(
    private route: ActivatedRoute,
    private stockCurrentService: StockCurrentService
  ) {}

  ngOnInit(): void {
    this.symbol = this.route.snapshot.queryParamMap.get('symbol');
    if (this.symbol != null)
      this.stock = this.stockCurrentService.getStock(this.symbol);
  }
}
