// src/pages/LosersPage.tsx
import { useFullCoinList } from "@/hooks/useFullCoinList";
import { CoinListPage } from "./CoinListPage";
import { useMemo } from "react";

export const LosersPage = () => {
  const { data, isLoading, isError } = useFullCoinList();

  const topLosers = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => a.priceChangePercentage24h - b.priceChangePercentage24h);
  }, [data]);

  return (
    <CoinListPage 
      title="Top Losers (24h)"
      description="Cryptocurrencies that have lost the most value in the last 24 hours."
      coins={topLosers}
      isLoading={isLoading}
      isError={isError}
    />
  );
};