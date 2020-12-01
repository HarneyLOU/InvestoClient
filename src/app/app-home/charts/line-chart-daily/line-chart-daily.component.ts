import { Component, Input, OnInit } from '@angular/core';
import {
  createChart,
  isBusinessDay,
  Time,
  UTCTimestamp,
} from 'lightweight-charts';
import { Company } from 'src/app/app-core/models/Company';
import { Stock } from 'src/app/app-core/models/Stock';

@Component({
  selector: 'app-line-chart-daily',
  templateUrl: './line-chart-daily.component.html',
  styleUrls: ['./line-chart-daily.component.scss'],
})
export class LineChartDailyComponent implements OnInit {
  @Input() company: Company;
  @Input() data: Stock[];
  dateStr: any;

  constructor() {}

  ngOnInit(): void {
    const chartData = [];
    for (let stock of this.data) {
      let myTime = new Date(stock.date).getTime() / 1000;
      chartData.push({
        time: myTime,
        value: stock.price,
      });
    }

    const width = 600;
    const height = 300;

    const chartContainer = document.getElementById('daily-chart');
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
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        tickMarkFormatter: (time: UTCTimestamp, tickMarkType, locale) => {
          return String(this.getHoursAndMinutes(time));
        },
      },
    });

    var series = chart.addLineSeries({
      color: 'rgba(19, 40, 153, 1.0)',
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

    chart.timeScale().fitContent();

    const toolTip = document.getElementById('daily-three-line-legend');

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
        this.dateStr = this.getHoursAndMinutes(param.time);
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

  getHoursAndMinutes(time: any) {
    let date = new Date(time * 1000);
    let minute =
      date.getMinutes() < 10
        ? '0' + date.getMinutes().toString()
        : date.getMinutes().toString();
    return date.getHours() + 1 + ':' + minute;
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
    this.dateStr = this.getHoursAndMinutes(data[data.length - 1].time);
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
