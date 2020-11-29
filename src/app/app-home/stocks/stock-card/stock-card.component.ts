import { Component, OnInit, Input } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

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
  @Input() stock: any;
  @Input() delay = 0;
  constructor() {}

  ngOnInit(): void {}
}
