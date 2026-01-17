"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchMarketIndices, fetchCryptoData, type MarketIndex } from "@/services/marketDataService";

export default function MarketSummary() {
  const [majorIndices, setMajorIndices] = useState<MarketIndex[]>([]);
  const [btcData, setBtcData] = useState({ price: "0", change: "0%", isPositive: false });
  const [ethData, setEthData] = useState({ price: "0", change: "0%", isPositive: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMarketData() {
      try {
        setLoading(true);
        const [indices, cryptoData] = await Promise.all([
          fetchMarketIndices(),
          fetchCryptoData()
        ]);
        
        setMajorIndices(indices);
        
        // Find BTC and ETH from crypto data
        const btc = cryptoData.find(c => c.symbol.toLowerCase() === 'btc');
        const eth = cryptoData.find(c => c.symbol.toLowerCase() === 'eth');
        
        if (btc) {
          setBtcData({
            price: btc.price,
            change: btc.change,
            isPositive: btc.isPositive
          });
        }
        
        if (eth) {
          setEthData({
            price: eth.price,
            change: eth.change,
            isPositive: eth.isPositive
          });
        }
      } catch (error) {
        console.error('Error loading market data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMarketData();
    
    // Refresh every 60 seconds
    const interval = setInterval(loadMarketData, 60000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative z-10 py-12 border-t border-white/5">
      <div className="container mx-auto px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Market summary</h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Live data</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            </div>
          ) : (
            <>
              {/* Major Indices */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Major indices</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {majorIndices.map((item) => (
                    <Link
                      key={item.name}
                      href="#"
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10 transition-all"
                    >
                      <div className="text-xs text-gray-400 mb-1">{item.name}</div>
                      <div className="text-lg font-semibold text-white mb-1">${item.value}</div>
                      <div className="text-xs text-gray-400 mb-1">USD</div>
                      <div className={`text-sm font-medium ${item.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {item.change}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Crypto Market */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Cryptocurrency</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="#" className="p-4 rounded-xl bg-gradient-to-br from-orange-500/5 to-purple-500/5 border border-orange-400/20 hover:border-orange-400/40 transition-all">
                    <div className="text-xs text-gray-400 mb-1">Bitcoin</div>
                    <div className="text-xs font-mono text-gray-500 mb-2">BTC/USD</div>
                    <div className="text-lg font-semibold text-white mb-1">${btcData.price}</div>
                    <div className="text-xs text-gray-400 mb-1">USD</div>
                    <div className={`text-sm font-medium ${btcData.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {btcData.change}
                    </div>
                  </Link>

                  <Link href="#" className="p-4 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-400/20 hover:border-blue-400/40 transition-all">
                    <div className="text-xs text-gray-400 mb-1">Ethereum</div>
                    <div className="text-xs font-mono text-gray-500 mb-2">ETH/USD</div>
                    <div className="text-lg font-semibold text-white mb-1">${ethData.price}</div>
                    <div className="text-xs text-gray-400 mb-1">USD</div>
                    <div className={`text-sm font-medium ${ethData.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {ethData.change}
                    </div>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
