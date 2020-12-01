import { Component, OnInit } from '@angular/core';
import { createChart } from 'lightweight-charts';
import { StockService } from 'src/app/app-core/services/stock.service';
import { CompanyService } from 'src/app/app-core/services/company.service';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/app-core/models/Company';
import { Stock } from 'src/app/app-core/models/Stock';
import { getTreeMultipleDefaultNodeDefsError } from '@angular/cdk/tree';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss'],
})
export class StockDetailsComponent implements OnInit {
  company: Company;
  intradayData: Stock[];
  dailyData: Stock[];
  candlesData: Stock[];

  stockId: string;

  selectedChart = 'intraday';

  constructor(
    private stockService: StockService,
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) {}

  onChartChange(event: any) {
    this.selectedChart = event.value;
    if (this.selectedChart === 'daily' && !this.dailyData) {
      this.stockService.getLastData(this.stockId, 'd').subscribe((data) => {
        this.dailyData = data;
      });
    }
    if (this.selectedChart === 'candles' && !this.candlesData) {
      const now = new Date();
      const lastMonth = now.setDate(now.getDate() - 60);
      this.stockService.getHistoricData(this.stockId).subscribe((data) => {
        this.candlesData = data;
      });
    }
  }

  ngOnInit(): void {
    this.stockId = this.route.snapshot.paramMap.get('id');
    this.companyService.getCompany(this.stockId).subscribe((data) => {
      this.company = data;
    });
    this.stockService.getHistoricData(this.stockId).subscribe((data) => {
      this.intradayData = data;
    });
    Date.now;
  }

  checkIfChartIsLoaded(): boolean {
    if (this.selectedChart === 'intraday' && this.intradayData) return true;
    if (this.selectedChart === 'daily' && this.dailyData) return true;
    if (this.selectedChart === 'candles' && this.candlesData) return true;
    return false;
  }
}
