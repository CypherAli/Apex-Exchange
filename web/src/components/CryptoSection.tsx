"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchCryptoData, fetchCryptoGainers, fetchCryptoLosers } from "@/services/marketDataService";

interface Crypto {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  logo?: string;
  marketCap?: string;
}

export default function CryptoSection() {
  const [activeTab, setActiveTab] = useState<"trends" | "gainers" | "losers">("trends");
  const [trendingCrypto, setTrendingCrypto] = useState<Crypto[]>([]);
  const [cryptoGainers, setCryptoGainers] = useState<Crypto[]>([]);
  const [cryptoLosers, setCryptoLosers] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCryptoData() {
      try {
        setLoading(true);
        const [trending, gainers, losers] = await Promise.all([
          fetchCryptoData(),
          fetchCryptoGainers(),
          fetchCryptoLosers()
        ]);
        
        setTrendingCrypto(trending.slice(0, 8));
        setCryptoGainers(gainers.slice(0, 8));
        setCryptoLosers(losers.slice(0, 8));
      } catch (error) {
        console.error('Error loading crypto data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCryptoData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadCryptoData, 30000);
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
                <span className="text-2xl">₿</span> Crypto
              </h2>
              <p className="text-gray-400">Cryptocurrency markets and trending coins</p>
            </div>
            <Link
              href="#"
              className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 transition group"
            >
              See all crypto
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mb-8 border-b border-white/10">
            <button
              onClick={() => setActiveTab("trends")}
              className={`pb-3 px-1 font-medium transition relative ${
                activeTab === "trends" ? "text-white" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Community trends
              {activeTab === "trends" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("gainers")}
              className={`pb-3 px-1 font-medium transition relative ${
                activeTab === "gainers" ? "text-white" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Crypto gainers
              {activeTab === "gainers" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("losers")}
              className={`pb-3 px-1 font-medium transition relative ${
                activeTab === "losers" ? "text-white" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Crypto losers
              {activeTab === "losers" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400" />
              )}
            </button>
          </div>

          {/* Content based on active tab */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            </div>
          ) : (
            <>
              {activeTab === "trends" && (
                <div className="overflow-x-auto pb-4">
                  <div className="flex gap-4 min-w-max">
                    {trendingCrypto.map((crypto) => (
                      <Link
                        key={crypto.symbol}
                        href="#"
                        className="flex-shrink-0 w-56 p-5 rounded-xl bg-gradient-to-br from-orange-500/5 via-purple-500/5 to-blue-500/5 border border-white/[0.08] hover:border-orange-400/30 transition-all group"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-full flex items-center justify-center text-xl border border-orange-400/20 group-hover:scale-110 transition-transform overflow-hidden">
                            {crypto.logo ? (
                              <img src={crypto.logo} alt={crypto.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xs">₿</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-white truncate">{crypto.symbol}</div>
                            <div className="text-xs text-gray-400 truncate">{crypto.name}</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-white mb-2">${crypto.price}</div>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm font-semibold ${
                          crypto.isPositive 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {crypto.isPositive ? '▲' : '▼'} {crypto.change}
                        </div>
                        {crypto.marketCap && (
                          <div className="text-xs text-gray-500 mt-2">Cap: {crypto.marketCap}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "gainers" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cryptoGainers.map((crypto) => (
                    <Link
                      key={crypto.symbol}
                      href="#"
                      className="p-5 rounded-xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/20 hover:border-green-400/40 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center text-xl border border-green-400/20 overflow-hidden">
                          {crypto.logo ? (
                            <img src={crypto.logo} alt={crypto.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs">₿</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-white truncate">{crypto.name}</div>
                          <div className="text-xs text-gray-400 truncate">{crypto.symbol}</div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-white mb-2">${crypto.price}</div>
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-green-500/20 text-green-400 text-sm font-bold">
                        ▲ {crypto.change}
                      </div>
                      {crypto.marketCap && (
                        <div className="text-xs text-gray-500 mt-2">Cap: {crypto.marketCap}</div>
                      )}
                    </Link>
                  ))}
                </div>
              )}

              {activeTab === "losers" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cryptoLosers.map((crypto) => (
                    <Link
                      key={crypto.symbol}
                      href="#"
                      className="p-5 rounded-xl bg-gradient-to-br from-red-500/5 to-rose-500/5 border border-red-500/20 hover:border-red-400/40 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-full flex items-center justify-center text-xl border border-red-400/20 overflow-hidden">
                          {crypto.logo ? (
                            <img src={crypto.logo} alt={crypto.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs">₿</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-white truncate">{crypto.name}</div>
                          <div className="text-xs text-gray-400 truncate">{crypto.symbol}</div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-white mb-2">${crypto.price}</div>
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-500/20 text-red-400 text-sm font-bold">
                        ▼ {crypto.change}
                      </div>
                      {crypto.marketCap && (
                        <div className="text-xs text-gray-500 mt-2">Cap: {crypto.marketCap}</div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
