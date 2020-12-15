import { Component, Input, OnInit } from '@angular/core';
import { createChart } from 'lightweight-charts';
import { Company } from 'src/app/app-core/models/Company';
import { Stock } from 'src/app/app-core/models/Stock';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
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
        value: stock.close,
      });
    }

    const width = 600;
    const height = 300;

    const chartContainer = document.getElementById('chart');
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
      },
      grid: {
        horzLines: {
          color: '#eee',
          visible: false,
        },
        vertLines: {
          color: '#ffffff',
        },
      },
      crosshair: {
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        vertLine: {
          visible: true,
          style: 0,
          width: 2,
          color: 'rgba(32, 38, 46, 0.1)',
          labelVisible: false,
        },
      },
    });

    chart.applyOptions({
      timeScale: {
        fixLeftEdge: true,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
      },
    });

    var series = chart.addAreaSeries({
      topColor: 'rgba(19, 68, 193, 0.4)',
      bottomColor: 'rgba(0, 120, 255, 0.0)',
      lineColor: 'rgba(19, 40, 153, 1.0)',
      lineWidth: 3,
    });

    series.applyOptions({
      priceFormat: {
        type: 'custom',
        minMove: 0.02,
        formatter: (price) => '$' + price.toFixed(2),
      },
    });

    series.setData(chartData);

    const toolTip = document.getElementById('three-line-legend');

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
        this.dateStr =
          param.time.year + ' - ' + param.time.month + ' - ' + param.time.day;
        let price = param.seriesPrices.get(series);
        toolTip.innerHTML =
          this.getStockTitle() +
          '$' +
          (Math.round(+price * 100) / 100).toFixed(2) +
          '</div>' +
          '<div>' +
          this.dateStr +
          '</div>';
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
    this.dateStr =
      data[data.length - 1].time.year +
      ' - ' +
      data[data.length - 1].time.month +
      ' - ' +
      data[data.length - 1].time.day;
    toolTip.innerHTML =
      this.getStockTitle() +
      '$' +
      data[data.length - 1].value +
      '</div>' +
      '<div>' +
      this.dateStr +
      '</div>';
  }
}
