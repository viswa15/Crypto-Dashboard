// src/hooks/useTrendingCoins.ts
import { useQuery } from '@tanstack/react-query';
import { getTrendingCoins } from '@/lib/api';

export const useTrendingCoins = () => {
  return useQuery({
    queryKey: ['trendingCoins'],
    queryFn: getTrendingCoins,
  });
};