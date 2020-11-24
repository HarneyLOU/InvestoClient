import { DateSelectionModelChange } from '@angular/material/datepicker';

export interface Wallet {
  walletId?: number;
  name: string;
  description: string;
  ownerId?: number;
  initMoney: number;
  created?: Date;
}
