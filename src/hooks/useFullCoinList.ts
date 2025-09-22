// src/hooks/useFullCoinList.ts
import { useQuery } from '@tanstack/react-query';
import { getFullCoinList } from '@/lib/api';

export const useFullCoinList = () => {
  return useQuery({
    queryKey: ['fullCoinList'],
    queryFn: getFullCoinList,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
};