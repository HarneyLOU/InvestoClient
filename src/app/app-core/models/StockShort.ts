export interface StockShort {
  symbol: string;
  name: string;
  price: number;
  image: string;
  change: number;
  open: number;
  prevClose: number;
  low: number;
  high: number;
  date: Date;
}
