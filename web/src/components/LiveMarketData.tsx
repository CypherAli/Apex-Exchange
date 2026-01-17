"use client";
import { useState } from "react";

export default function LiveMarketData() {
  const [activeTab, setActiveTab] = useState<"depth" | "trades" | "analytics">("depth");

  const orderBookData = {
    bids: [
      { price: 42150.50, amount: 2.45, total: 103268.73 },
      { price: 42150.00, amount: 1.82, total: 76713.00 },
      { price: 42149.50, amount: 3.21, total: 135299.90 },
      { price: 42149.00, amount: 0.95, total: 40041.55 },
      { price: 42148.50, amount: 1.67, total: 70388.00 }
    ],
    asks: [
      { price: 42151.00, amount: 1.95, total: 82194.45 },
      { price: 42151.50, amount: 2.34, total: 98634.51 },
      { price: 42152.00, amount: 1.12, total: 47210.24 },
      { price: 42152.50, amount: 3.45, total: 145426.13 },
      { price: 42153.00, amount: 0.87, total: 36673.11 }
    ]
  };

  const recentTrades = [
    { time: "14:32:15", price: 42150.50, amount: 0.524, type: "buy" },
    { time: "14:32:12", price: 42150.00, amount: 1.234, type: "sell" },
    { time: "14:32:08", price: 42151.00, amount: 0.856, type: "buy" },
    { time: "14:32:05", price: 42149.50, amount: 2.145, type: "sell" },
    { time: "14:32:01", price: 42150.50, amount: 0.678, type: "buy" }
  ];

  return (
    <div className="relative z-10 py-32 border-t border-white/5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `repeating-linear-gradient(
                 0deg, rgba(59, 130, 246, 0.1) 0px, transparent 1px, transparent 40px
               ), repeating-linear-gradient(
                 90deg, rgba(59, 130, 246, 0.1) 0px, transparent 1px, transparent 40px
               )`
             }} />
      </div>

      <div className="container mx-auto px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full 
                          bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 
                          border border-white/10 backdrop-blur-xl mb-8">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 
                             bg-clip-text text-transparent tracking-wider uppercase">
                Live Market Data
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Real-Time
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent 
                             animate-gradient-x">
                Order Book & Trade Flow
              </span>
            </h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[
              { id: "depth", label: "Order Book Depth" },
              { id: "trades", label: "Recent Trades" },
              { id: "analytics", label: "Flow Analytics" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "depth" | "trades" | "analytics")}
                className={`px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300
                          ${activeTab === tab.id 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="glass-strong p-8 rounded-2xl border border-white/10">
            {activeTab === "depth" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bids */}
                <div>
                  <h3 className="text-xl font-black text-green-400 mb-6 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                    BUY ORDERS
                  </h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-500 uppercase tracking-wider mb-4">
                      <div>Price (USD)</div>
                      <div className="text-right">Amount (BTC)</div>
                      <div className="text-right">Total (USD)</div>
                    </div>
                    {orderBookData.bids.map((bid, i) => (
                      <div key={i} className="group relative">
                        <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 rounded transition-colors" 
                             style={{ width: `${(bid.amount / 3.5) * 100}%` }} />
                        <div className="relative grid grid-cols-3 gap-4 p-3 rounded hover:bg-white/5 transition-colors">
                          <div className="text-green-400 font-mono font-bold">{bid.price.toFixed(2)}</div>
                          <div className="text-white text-right font-mono">{bid.amount.toFixed(3)}</div>
                          <div className="text-gray-400 text-right font-mono text-sm">{bid.total.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Asks */}
                <div>
                  <h3 className="text-xl font-black text-red-400 mb-6 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />
                    SELL ORDERS
                  </h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-500 uppercase tracking-wider mb-4">
                      <div>Price (USD)</div>
                      <div className="text-right">Amount (BTC)</div>
                      <div className="text-right">Total (USD)</div>
                    </div>
                    {orderBookData.asks.map((ask, i) => (
                      <div key={i} className="group relative">
                        <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 rounded transition-colors" 
                             style={{ width: `${(ask.amount / 3.5) * 100}%` }} />
                        <div className="relative grid grid-cols-3 gap-4 p-3 rounded hover:bg-white/5 transition-colors">
                          <div className="text-red-400 font-mono font-bold">{ask.price.toFixed(2)}</div>
                          <div className="text-white text-right font-mono">{ask.amount.toFixed(3)}</div>
                          <div className="text-gray-400 text-right font-mono text-sm">{ask.total.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "trades" && (
              <div className="max-w-4xl mx-auto">
                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-4 text-xs text-gray-500 uppercase tracking-wider mb-4">
                    <div>Time</div>
                    <div className="text-right">Price (USD)</div>
                    <div className="text-right">Amount (BTC)</div>
                    <div className="text-right">Type</div>
                  </div>
                  {recentTrades.map((trade, i) => (
                    <div key={i} className="grid grid-cols-4 gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors 
                                          border border-white/5">
                      <div className="text-gray-400 font-mono text-sm">{trade.time}</div>
                      <div className={`text-right font-mono font-bold ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                        {trade.price.toFixed(2)}
                      </div>
                      <div className="text-white text-right font-mono">{trade.amount.toFixed(3)}</div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                       ${trade.type === 'buy' 
                                         ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                                         : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
                          {trade.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-8 glass rounded-xl border border-white/5">
                  <div className="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 
                                bg-clip-text text-transparent mb-3">
                    67%
                  </div>
                  <p className="text-gray-400 text-sm mb-2">Buy Pressure</p>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[67%] bg-gradient-to-r from-green-500 to-emerald-500" />
                  </div>
                </div>

                <div className="text-center p-8 glass rounded-xl border border-white/5">
                  <div className="text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 
                                bg-clip-text text-transparent mb-3">
                    $2.4M
                  </div>
                  <p className="text-gray-400 text-sm mb-2">Volume (1H)</p>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-blue-500 to-cyan-500" />
                  </div>
                </div>

                <div className="text-center p-8 glass rounded-xl border border-white/5">
                  <div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 
                                bg-clip-text text-transparent mb-3">
                    +2.4%
                  </div>
                  <p className="text-gray-400 text-sm mb-2">Price Change</p>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[24%] bg-gradient-to-r from-purple-500 to-pink-500" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Live Indicator */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/30">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 font-medium uppercase tracking-wider text-sm">
                Live Data Feed Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
