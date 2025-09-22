// src/components/dashboard/CoinsTable.tsx
import { Coin } from '@/types';
import { useMemo, useState } from 'react';
import { PriceChange } from '../ui/PriceChange';
import { SkeletonLoader } from '../ui/SkeletonLoader';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface CoinsTableProps {
  coins: Coin[];
  isLoading: boolean;
  onRowClick: (coin: Coin) => void;
}

type SortKey = 'price' | 'priceChangePercentage24h' | 'marketCap' | 'volume24h';

export const CoinsTable = ({ coins, isLoading, onRowClick }: CoinsTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({ 
    key: 'marketCap', 
    direction: 'desc' 
  });

  const sortedAndFilteredCoins = useMemo(() => {
    let sortableItems = [...(coins || [])];

    if (searchTerm) {
      sortableItems = sortableItems.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortableItems;
  }, [coins, searchTerm, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const SortableHeader = ({ label, sortKey }: { label: string; sortKey: SortKey }) => {
    const isSorted = sortConfig.key === sortKey;
    const textColor = isSorted ? 'text-blue-400' : 'text-gray-400';

    return (
      <th className={`p-3 cursor-pointer transition-colors duration-200 ${textColor} hover:text-white`} onClick={() => requestSort(sortKey)}>
        <div className="flex items-center justify-end gap-1">
          <span>{label}</span>
          {isSorted && (
            sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
          )}
        </div>
      </th>
    );
  };
  
  const TableRow = ({ coin }: { coin: Coin }) => (
    <tr 
      className="border-b border-gray-700/50 hover:bg-gray-700/50 cursor-pointer transition-colors duration-200"
      onClick={() => onRowClick(coin)}
    >
      <td className="p-3 text-center text-gray-400">{coin.rank}</td>
      <td className="p-3 flex items-center">
        <img src={coin.imageUrl} alt={coin.name} className="w-6 h-6 mr-3 rounded-full" />
        <div>
          <p className="font-bold">{coin.name}</p>
          <p className="text-gray-400 text-sm">{coin.symbol}</p>
        </div>
      </td>
      <td className="p-3 font-mono text-right">${coin.price.toLocaleString()}</td>
      
      {/* THIS IS THE CELL THAT NEEDS THE CHANGE */}
      <td className="p-3 text-right"> 
        <PriceChange percent={coin.priceChangePercentage24h} />
      </td>

      <td className="p-3 font-mono text-right">${coin.marketCap.toLocaleString()}</td>
      <td className="p-3 font-mono text-right">${coin.volume24h.toLocaleString()}</td>
    </tr>
  );

  const SkeletonRow = () => (
    <tr className="border-b border-gray-700/50">
      <td className="p-3"><SkeletonLoader className="h-6 w-8 mx-auto" /></td>
      <td className="p-3">
        <div className="flex items-center">
          <SkeletonLoader className="h-6 w-6 mr-3 rounded-full" />
          <div>
            <SkeletonLoader className="h-4 w-24 mb-1" />
            <SkeletonLoader className="h-3 w-12" />
          </div>
        </div>
      </td>
      <td className="p-3"><SkeletonLoader className="h-6 w-24 ml-auto" /></td>
      <td className="p-3"><SkeletonLoader className="h-6 w-20" /></td>
      <td className="p-3"><SkeletonLoader className="h-6 w-32 ml-auto" /></td>
      <td className="p-3"><SkeletonLoader className="h-6 w-32 ml-auto" /></td>
    </tr>
  );

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-6">
      <input 
        type="text"
        placeholder="Search by name or symbol..."
        className="w-full md:w-1/3 bg-gray-900/50 p-2 rounded mb-4 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm">
              <th className="p-3 w-12 text-center font-medium">#</th>
              <th className="p-3 font-medium">Coin</th>
              <SortableHeader label="Price" sortKey="price" />
              <SortableHeader label="24h %" sortKey="priceChangePercentage24h" />
              <SortableHeader label="Market Cap" sortKey="marketCap" />
              <SortableHeader label="Volume (24h)" sortKey="volume24h" />
            </tr>
          </thead>
          <tbody>
            {isLoading && [...Array(10)].map((_, i) => <SkeletonRow key={i} />)}
            {!isLoading && sortedAndFilteredCoins?.map(coin => <TableRow key={coin.id} coin={coin} />)}
          </tbody>
        </table>
      </div>
      {!isLoading && sortedAndFilteredCoins?.length === 0 && (
         <p className="text-center py-8 text-gray-400">No coins found.</p>
      )}
    </div>
  );
};