import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { StockShort } from 'src/app/app-core/models/StockShort';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss'],
  animations: [
    trigger('fade', [
      transition(
        'void => *',
        [
          style({ opacity: 0 }),
          animate('500ms {{delay}}ms', style({ opacity: 1 })),
        ],
        { params: { delay: 0 } }
      ),
    ]),
  ],
})
export class StockCardComponent implements OnInit, DoCheck {
  @Input() stock: StockShort;
  @Input() delay = 0;
  isOnPlus: boolean;
  constructor() {}

  ngOnInit(): void {}

  ngDoCheck() {
    if (this.stock.price < this.stock.low) {
      this.stock.low = this.stock.price;
    }
    if (this.stock.price > this.stock.high) {
      this.stock.high = this.stock.price;
    }
  }

  change() {
    const change =
      (this.stock.price - this.stock.prevClose) / this.stock.prevClose;

    return change;
  }
}
