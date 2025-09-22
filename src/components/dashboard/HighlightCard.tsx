// src/components/dashboard/HighlightCard.tsx
import { Coin } from '@/types';
import { PriceChange } from '../ui/PriceChange';
import { SkeletonLoader } from '../ui/SkeletonLoader';
import { Link } from 'react-router-dom';

interface HighlightCardProps {
  title: string;
  icon: string;
  coins: Coin[] | undefined;
  isLoading: boolean;
  linkTo: string;
}

export const HighlightCard = ({ title, icon, coins, isLoading, linkTo }: HighlightCardProps) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-md flex items-center">{icon} {title}</h3>
        <Link to={linkTo} className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">
          View more ›
        </Link>
      </div>
      
      {isLoading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <SkeletonLoader key={i} className="h-8" />)}
        </div>
      )}
      {coins && (
        <ul className="space-y-3">
          {coins.slice(0, 3).map((coin) => (
            <li key={coin.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <img src={coin.imageUrl} alt={coin.name} className="w-5 h-5 mr-2 rounded-full" />
                <span>{coin.name}</span>
              </div>
              <PriceChange percent={coin.priceChangePercentage24h} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}