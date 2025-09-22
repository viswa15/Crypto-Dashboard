import { Link } from 'react-router-dom';
import { LineChart } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-gray-800/80 backdrop-blur-sm shadow-lg shadow-black/20">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Left Side: Logo and Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <LineChart className="h-7 w-7 text-blue-400 group-hover:animate-pulse" />
          <span className="text-xl font-bold text-gray-200 group-hover:text-white transition-colors duration-200">
            Crypto Dashboard
          </span>
        </Link>

        {/* Right Side: Call-to-Action Button */}
        <a 
          href="https://www.coingecko.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden sm:inline-block bg-blue-500/10 text-blue-300 border border-blue-500/30 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-500/20 hover:text-white transition-all duration-200"
        >
          Powered by CoinGecko
        </a>
      </div>
    </header>
  );
};