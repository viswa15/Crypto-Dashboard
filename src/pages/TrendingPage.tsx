// src/pages/TrendingPage.tsx
import { useTrendingCoins } from '@/hooks/useTrendingCoins';
import { useState } from 'react';
import { CoinDetailModal } from '@/components/dashboard/CoinDetailModal';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { useFullCoinList } from '@/hooks/useFullCoinList';
import { Coin } from '@/types';
import { CoinsTable } from '@/components/dashboard/CoinsTable';

// We need to merge data from two endpoints to get a full table
const useFullTrendingData = () => {
  const { data: trendingData, isLoading: isTrendingLoading } = useTrendingCoins();
  const { data: fullCoinData, isLoading: isFullCoinLoading } = useFullCoinList();

  const mergedData = trendingData?.map(trendingCoin => {
    const marketData = fullCoinData?.find(c => c.id === trendingCoin.id);
    return {
      ...marketData, // Spread market data if found
      id: trendingCoin.id,
      name: trendingCoin.name,
      symbol: trendingCoin.symbol.toUpperCase(),
      imageUrl: trendingCoin.thumb,
      rank: marketData?.rank ?? trendingCoin.marketCapRank,
      // Provide defaults for missing data
      price: marketData?.price ?? 0,
      priceChangePercentage24h: marketData?.priceChangePercentage24h ?? 0,
      marketCap: marketData?.marketCap ?? 0,
      volume24h: marketData?.volume24h ?? 0,
    } as Coin;
  });

  return { 
    data: mergedData, 
    isLoading: isTrendingLoading || isFullCoinLoading 
  };
};

export const TrendingPage = () => {
  const { data: trendingCoins, isLoading } = useFullTrendingData();
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  return (
    <div>
      {selectedCoin && (
        <CoinDetailModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
      )}
      <h1 className="text-3xl font-bold mb-2">Top Trending Cryptocurrencies</h1>
      <p className="text-gray-400 mb-6">List of coins that are most searched for on CoinGecko in the last 3 hours.</p>
      
      <CoinsTable 
        coins={trendingCoins || []}
        isLoading={isLoading}
        onRowClick={(coin) => setSelectedCoin(coin)}
      />
    </div>
  );
};