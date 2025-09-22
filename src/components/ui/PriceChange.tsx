// src/components/ui/PriceChange.tsx
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface PriceChangeProps {
  percent: number | null | undefined;
}

export const PriceChange = ({ percent }: PriceChangeProps) => {
  if (percent === null || typeof percent === 'undefined') {
    return <span className="text-gray-400">--</span>;
  }

  const isPositive = percent >= 0;
  const colorClass = isPositive ? 'text-green-500' : 'text-red-500';

  return (
    // We made this an inline-flex and removed the width and justification
    <div className={`inline-flex items-center font-medium ${colorClass}`}>
      {isPositive ? (
        <ArrowUpRight className="w-4 h-4 mr-1" />
      ) : (
        <ArrowDownRight className="w-4 h-4 mr-1" />
      )}
      <span>{Math.abs(percent).toFixed(2)}%</span>
    </div>
  );
};