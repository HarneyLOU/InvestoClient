export interface Order {
  orderId?: number;
  walletId: number;
  stockId: number;
  symbol?: string;
  amount: number;
  buy: boolean;
  type?: string;
  transactions?: Transaction[];
  status?: string;
  created?: Date;
}

export interface Transaction {
  transactionId: number;
  orderId: number;
  amount: number;
  price: number;
  realised: Date;
}
