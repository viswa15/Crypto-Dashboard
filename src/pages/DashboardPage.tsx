// src/pages/DashboardPage.tsx

import { useState, useMemo } from "react";
import { CoinsTable } from "@/components/dashboard/CoinsTable";
import { useCoins } from "@/hooks/useCoins";
import { Coin } from "@/types";
import { CoinDetailModal } from "@/components/dashboard/CoinDetailModal";
import { HighlightCard } from "@/components/dashboard/HighlightCard";
import { useTrendingCoins } from "@/hooks/useTrendingCoins";

const DashboardPage = () => {
  const [page, setPage] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  
  const { data: coins, isLoading, isError } = useCoins(page);
  const { data: trendingData, isLoading: isTrendingLoading } = useTrendingCoins();

  // Memoized calculation for top gainers and losers from the main coin list
  const { topGainers, topLosers } = useMemo(() => {
    if (!coins) return { topGainers: [], topLosers: [] };
    const sortedByChange = [...coins].sort((a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h);
    return {
      topGainers: sortedByChange.slice(0, 3),
      topLosers: sortedByChange.slice(-3).reverse(),
    };
  }, [coins]);

  // Adapter for trending coins to fit the HighlightCard structure
  const trendingCoinsForCard = useMemo(() => {
    return trendingData?.map(tc => {
      const correspondingCoin = coins?.find(c => c.id === tc.id);
      return {
        id: tc.id,
        name: tc.name,
        imageUrl: tc.thumb,
        // Defaulting to 0 if the trending coin isn't in the top 50 by market cap
        priceChangePercentage24h: correspondingCoin?.priceChangePercentage24h ?? 0,
      } as Coin; // Casting to Coin to match prop type, with some fields being undefined
    });
  }, [trendingData, coins]);

  if (isError) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-500 mb-2">An Error Occurred</h2>
        <p>We couldn't fetch the cryptocurrency data. Please try again later.</p>
      </div>
    );
  }
  
  // The API does not provide total pages, so we disable 'Next' at a high number as a safeguard.
  const isLastPage = (coins?.length ?? 0) < 50;

  return (
    <div>
      {selectedCoin && (
        <CoinDetailModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
      )}

      <h1 className="text-3xl font-bold mb-6">Cryptocurrency Prices by Market Cap</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <HighlightCard 
            title="Trending" 
            icon="🔥" 
            coins={trendingCoinsForCard} 
            isLoading={isTrendingLoading} 
            linkTo="/trending"
          />
          <HighlightCard 
            title="Top Gainers" 
            icon="🚀" 
            coins={topGainers} 
            isLoading={isLoading} 
            linkTo="/gainers"
          />
          <HighlightCard 
            title="Top Losers" 
            icon="🔻" 
            coins={topLosers} 
            isLoading={isLoading} 
            linkTo="/losers"
          />
      </div>

      <CoinsTable 
        coins={coins || []} 
        isLoading={isLoading}
        onRowClick={(coin) => setSelectedCoin(coin)}
      />

      <div className="flex justify-center items-center mt-6 space-x-4">
        <button 
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="bg-gray-800 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Previous
        </button>
        <span className="font-bold text-gray-400">Page <span className="text-white">{page}</span></span>
        <button 
          onClick={() => setPage(p => p + 1)}
          disabled={isLastPage}
          className="bg-gray-800 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;