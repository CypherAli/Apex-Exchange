"use client";
import { useEffect, useState } from "react";

interface Trade {
  id: string;
  pair: string;
  price: string;
  change: number;
  volume: string;
}

const generateRandomTrade = (): Trade => {
  const pairs = ["BTC/USD", "ETH/USD", "AAPL", "TSLA", "GOOGL", "MSFT", "EUR/USD", "GBP/USD"];
  const pair = pairs[Math.floor(Math.random() * pairs.length)];
  const change = (Math.random() - 0.5) * 10;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    pair,
    price: (Math.random() * 10000 + 100).toFixed(2),
    change,
    volume: (Math.random() * 1000000).toFixed(0),
  };
};

export default function LiveTradingFeed() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Initialize with some trades
    setTrades(Array.from({ length: 5 }, generateRandomTrade));

    // Add new trade every 3 seconds
    const interval = setInterval(() => {
      setTrades((prev) => [generateRandomTrade(), ...prev.slice(0, 4)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 py-12 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Live Trading Feed
              </h3>
              <p className="text-gray-400 text-sm">Real-time market activity</p>
            </div>
          </div>

          <div className="space-y-2">
            {trades.map((trade, index) => (
              <div
                key={trade.id}
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all"
                style={{
                  animation: index === 0 ? "slideInFromTop 0.5s ease-out" : "none",
                }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-400/20">
                    <span className="text-lg">📊</span>
                  </div>
                  <div>
                    <div className="font-bold text-white">{trade.pair}</div>
                    <div className="text-xs text-gray-400">Vol: {parseInt(trade.volume).toLocaleString()}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold text-white">${trade.price}</div>
                  <div
                    className={`text-sm font-semibold ${
                      trade.change >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {trade.change >= 0 ? "▲" : "▼"} {Math.abs(trade.change).toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
