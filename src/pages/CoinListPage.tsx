// src/pages/CoinListPage.tsx
import { CoinsTable } from "@/components/dashboard/CoinsTable";
import { Coin } from "@/types";
import { useMemo, useState } from "react";
import { CoinDetailModal } from "@/components/dashboard/CoinDetailModal";

interface CoinListPageProps {
  title: string;
  description: string;
  coins: Coin[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

const ITEMS_PER_PAGE = 50;

export const CoinListPage = ({ title, description, coins, isLoading, isError }: CoinListPageProps) => {
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedCoins = useMemo(() => {
    if (!coins) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return coins.slice(startIndex, endIndex);
  }, [coins, currentPage]);

  const totalPages = coins ? Math.ceil(coins.length / ITEMS_PER_PAGE) : 0;

  if (isError) {
    return <p className="text-red-500 text-center">Failed to load data.</p>;
  }

  return (
    <div>
      {selectedCoin && (
        <CoinDetailModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
      )}
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <CoinsTable 
        coins={paginatedCoins}
        isLoading={isLoading}
        onRowClick={(coin) => setSelectedCoin(coin)}
      />

      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button 
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-800 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Previous
          </button>
          <span className="font-bold text-gray-400">Page <span className="text-white">{currentPage}</span> of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-800 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};