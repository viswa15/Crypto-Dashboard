// src/components/dashboard/TrendingCoinsCard.tsx
import { useTrendingCoins } from '@/hooks/useTrendingCoins';
import { SkeletonLoader } from '../ui/SkeletonLoader';

export const TrendingCoinsCard = () => {
  const { data, isLoading, isError } = useTrendingCoins();

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="font-bold text-lg mb-4">🔥 Trending</h3>
      {isLoading && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <SkeletonLoader key={i} className="h-8" />)}
        </div>
      )}
      {isError && <p className="text-red-500">Could not fetch trending coins.</p>}
      {data && (
        <ul className="space-y-3">
          {data.slice(0, 5).map((coin) => (
            <li key={coin.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={coin.thumb} alt={coin.name} className="w-6 h-6 mr-3 rounded-full" />
                <span>{coin.name} ({coin.symbol})</span>
              </div>
              <span className="font-mono text-sm">#{coin.marketCapRank}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};