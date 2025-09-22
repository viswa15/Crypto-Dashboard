// src/test/mocks/data.ts
import { Coin } from '@/types';

export const mockCoins: Coin[] = [
  {
    id: 'bitcoin',
    rank: 1,
    symbol: 'BTC',
    name: 'Bitcoin',
    imageUrl: 'image_url',
    price: 50000,
    marketCap: 1000000000,
    priceChangePercentage24h: 2.5,
    volume24h: 50000000,
  },
  {
    id: 'ethereum',
    rank: 2,
    symbol: 'ETH',
    name: 'Ethereum',
    imageUrl: 'image_url',
    price: 4000,
    marketCap: 500000000,
    priceChangePercentage24h: -1.2,
    volume24h: 30000000,
  },
];