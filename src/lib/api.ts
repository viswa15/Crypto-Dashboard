// src/lib/api.ts
import axios from 'axios';
import { Coin, TrendingCoin } from '@/types';

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  headers: {
    'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY,
  },
});

// ADAPTER: Maps the messy API response to our clean Coin model
const coinListAdapter = (apiCoin: any): Coin => ({
  id: apiCoin.id,
  rank: apiCoin.market_cap_rank,
  symbol: apiCoin.symbol.toUpperCase(),
  name: apiCoin.name,
  imageUrl: apiCoin.image,
  price: apiCoin.current_price,
  marketCap: apiCoin.market_cap,
  priceChangePercentage24h: apiCoin.price_change_percentage_24h,
  volume24h: apiCoin.total_volume,
});

// API FUNCTION: Fetches and adapts the coin list
export const getCoinsMarkets = async (page: number = 1): Promise<Coin[]> => {
  const response = await api.get('/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 50,
      page: page,
      sparkline: false,
    },
  });
  return response.data.map(coinListAdapter);
};

// API FUNCTION: Fetches trending coins
export const getTrendingCoins = async (): Promise<TrendingCoin[]> => {
    const response = await api.get('/search/trending');
    return response.data.coins.map((item: any) => item.item);
};

export const getFullCoinList = async (): Promise<Coin[]> => {
  const response = await api.get('/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 250, // Fetch the maximum allowed per page
      page: 1,
      sparkline: false,
    },
  });
  // The adapter is already defined in your file, so we reuse it
  return response.data.map(coinListAdapter); 
};