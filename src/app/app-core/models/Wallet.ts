import { WalletState } from './WalletState';

export interface Wallet {
  walletId?: number;
  name: string;
  description: string;
  ownerId?: number;
  initMoney: number;
  balance?: number;
  created?: Date;
  possesions?: WalletState[];
  value?: number;
}
