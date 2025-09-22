// src/components/dashboard/CoinDetailModal.tsx

import { Coin } from '@/types';
import { X } from 'lucide-react';
import { PriceChange } from '../ui/PriceChange';

interface CoinDetailModalProps {
  coin: Coin;
  onClose: () => void;
}

const Stat = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
  <div className="flex justify-between py-3 border-b border-gray-700">
    <span className="text-gray-400">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export const CoinDetailModal = ({ coin, onClose }: CoinDetailModalProps) => {
  return (
    // Modal Overlay
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div 
        className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src={coin.imageUrl} alt={coin.name} className="w-8 h-8 mr-3 rounded-full" />
            <h2 className="text-2xl font-bold">{coin.name} <span className="text-gray-400">{coin.symbol}</span></h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-2">
          <Stat label="Rank" value={`#${coin.rank}`} />
          <Stat label="Price" value={`$${coin.price.toLocaleString()}`} />
          <Stat label="24h Change" value={<PriceChange percent={coin.priceChangePercentage24h} />} />
          <Stat label="Market Cap" value={`$${coin.marketCap.toLocaleString()}`} />
          <Stat label="Volume (24h)" value={`$${coin.volume24h.toLocaleString()}`} />
        </div>
      </div>
    </div>
  );
};