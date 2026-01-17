"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchStockData } from "@/services/marketDataService";

interface Stock {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  volume?: string;
}

export default function USStocks() {
  const [trendingStocks, setTrendingStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStockData() {
      try {
        setLoading(true);
        // Popular tech stocks
        const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'AMD'];
        const stocks = await fetchStockData(symbols);
        setTrendingStocks(stocks);
      } catch (error) {
        console.error('Error loading stock data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStockData();
    
    // Refresh every 60 seconds
    const interval = setInterval(loadStockData, 60000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative z-10 py-20 border-t border-white/5">
      <div className="container mx-auto px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                📈 US stocks
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Live market data</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <Link
              href="#"
              className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 transition group"
            >
              See all stocks
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            </div>
          ) : (
            <>
              {/* Community Trends */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-white mb-4">Top Tech Stocks</h3>
                <div className="overflow-x-auto pb-4">
                  <div className="flex gap-4 min-w-max">
                    {trendingStocks.map((stock) => (
                      <Link
                        key={stock.symbol}
                        href="#"
                        className="flex-shrink-0 w-48 p-4 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-400/20 hover:border-blue-400/40 transition-all"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center text-sm font-bold border border-blue-400/30 text-blue-300">
                            {stock.symbol.slice(0, 2)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-white truncate">{stock.symbol}</div>
                            <div className="text-xs text-gray-400 truncate">{stock.name}</div>
                          </div>
                        </div>
                        <div className="text-lg font-semibold text-white mb-1">${stock.price}</div>
                        <div className="text-xs text-gray-400 mb-2">USD</div>
                        <div className={`text-sm font-medium ${stock.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                          {stock.change}
                        </div>
                        {stock.volume && (
                          <div className="text-xs text-gray-500 mt-2">Vol: {stock.volume}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
