import { Component, Input, OnInit } from '@angular/core';
import { createChart } from 'lightweight-charts';
import { Company } from 'src/app/app-core/models/Company';
import { Stock } from 'src/app/app-core/models/Stock';

@Component({
  selector: 'app-candle-chart',
  templateUrl: './candle-chart.component.html',
  styleUrls: ['./candle-chart.component.scss'],
})
export class CandleChartComponent implements OnInit {
  @Input() company: Company;
  @Input() data: Stock[];
  dateStr: any;

  constructor() {}

  ngOnInit(): void {
    const chartData = [];
    for (let stock of this.data) {
      let date = stock.date.toString();
      chartData.push({
        time: date.split('T')[0],
        open: stock.open,
        close: stock.close,
        low: stock.low,
        high: stock.high,
      });
    }

    const width = 600;
    const height = 300;

    const chartContainer = document.getElementById('candles-chart');

    let chart = createChart(chartContainer, {
      width: width,
      height: height,
      rightPriceScale: {
        scaleMargins: {
          top: 0.35,
          bottom: 0.2,
        },
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
        fixLeftEdge: true,
        borderColor: '#D1D4DC',
      },
      layout: {
        backgroundColor: '#ffffff',
        textColor: '#000',
      },
      grid: {
        horzLines: {
          color: '#F0F3FA',
          visible: false,
        },
        vertLines: {
          color: '#F0F3FA',
          visible: false,
        },
      },
    });

    var series = chart.addCandlestickSeries({
      upColor: 'rgb(38,166,154)',
      downColor: 'rgb(255,82,82)',
      wickUpColor: 'rgb(38,166,154)',
      wickDownColor: 'rgb(255,82,82)',
      borderVisible: false,
    });

    series.applyOptions({
      priceFormat: {
        type: 'custom',
        minMove: 0.02,
        formatter: (price) => '$' + price.toFixed(2),
      },
    });

    series.setData(chartData);

    const toolTip = document.getElementById('candles-three-line-legend');

    this.setLastBarText(toolTip, chartData);

    chart.subscribeCrosshairMove((param: any) => {
      if (
        param === undefined ||
        param.time === undefined ||
        param.point.x < 0 ||
        param.point.x > width ||
        param.point.y < 0 ||
        param.point.y > height
      ) {
        this.setLastBarText(toolTip, chartData);
      } else {
        let price = param.seriesPrices.get(series);
        toolTip.innerHTML =
          this.getStockTitle() + this.getPricesString(price) + '</div>';
      }
    });
  }

  getStockTitle() {
    return (
      '<div style="font-size: 24px; margin: 4px 0px; color: #20262E;">' +
      this.company.symbol +
      '</div>' +
      '<div style="font-size: 22px; margin: 4px 0px; color: #20262E">'
    );
  }

  setLastBarText(toolTip: any, data: any) {
    toolTip.innerHTML =
      this.getStockTitle() +
      this.getPricesString(data[data.length - 1]) +
      '</div>';
  }

  getPricesString(price: any) {
    return (
      '<div style="font-size: 16px; display: flex; justify-content: space-around; width: 500px; text-align: center">' +
      '<div>' +
      ' Open' +
      '<div>$' +
      price.open +
      '</div>' +
      '</div>' +
      '<div>' +
      ' Close' +
      '<div>$' +
      price.close +
      '</div>' +
      '</div>' +
      '<div>' +
      ' High' +
      '<div>$' +
      price.high +
      '</div>' +
      '</div>' +
      '<div>' +
      ' Low' +
      '<div>$' +
      price.low +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }
}
