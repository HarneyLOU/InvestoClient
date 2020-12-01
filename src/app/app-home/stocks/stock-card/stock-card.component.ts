import { Component, OnChanges, OnInit, Input } from '@angular/core';
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
export class StockCardComponent implements OnInit {
  @Input() stock: StockShort;
  @Input() delay = 0;
  isOnPlus: boolean;
  constructor() {}
  ngOnInit(): void {
    this.isOnPlus = this.stock.change >= 0 ? true : false;
  }

  change() {
    const change =
      (this.stock.price - this.stock.prevClose) / this.stock.prevClose;
    this.isOnPlus = change >= 0 ? true : false;
    return change;
  }
}
