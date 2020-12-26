import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from 'src/app/app-core/models/News';
import { MarketService } from 'src/app/app-core/services/market.service';
import { NewsService } from 'src/app/app-core/services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  marketStatus: string;
  news: News[];
  selectedNews: News[];

  constructor(
    private marketService: MarketService,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.marketService.getMarketStatus().subscribe((data: any) => {
      if (!data.ticks) {
        this.marketStatus = data;
      } else {
        this.marketStatus =
          'Opens in ' +
          (data.days * 24 + data.hours) +
          ':' +
          (data.minutes < 10 ? '0' + data.minutes : data.minutes) +
          ':' +
          (data.seconds < 10 ? '0' + data.seconds : data.seconds);
      }
    });
    this.newsService.getNews().subscribe((data) => {
      this.news = data;
      this.selectedNews = this.news.slice(0, 3);
    });
  }

  getNews(event?): void {
    const index = event.pageIndex;
    this.selectedNews = this.news.slice(index * 3, index * 3 + 3);
  }
}
