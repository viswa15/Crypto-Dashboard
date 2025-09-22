// src/hooks/useCoins.ts
import { useQuery } from '@tanstack/react-query';
import { getCoinsMarkets } from '@/lib/api';

export const useCoins = (page: number) => {
  return useQuery({
    queryKey: ['coins', page], // The key includes the page for unique caching
    queryFn: () => getCoinsMarkets(page),
  });
};