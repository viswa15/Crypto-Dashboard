// src/types/index.ts
export interface Coin {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  imageUrl: string;
  price: number;
  marketCap: number;
  priceChangePercentage24h: number;
  volume24h: number;
}

export interface TrendingCoin {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  marketCapRank: number;
}