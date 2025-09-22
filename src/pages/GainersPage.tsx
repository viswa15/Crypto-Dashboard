// src/pages/GainersPage.tsx
import { useFullCoinList } from "@/hooks/useFullCoinList";
import { CoinListPage } from "./CoinListPage";
import { useMemo } from "react";

export const GainersPage = () => {
  const { data, isLoading, isError } = useFullCoinList();

  const topGainers = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h);
  }, [data]);

  return (
    <CoinListPage 
      title="Top Gainers (24h)"
      description="Cryptocurrencies that have gained the most value in the last 24 hours."
      coins={topGainers}
      isLoading={isLoading}
      isError={isError}
    />
  );
};