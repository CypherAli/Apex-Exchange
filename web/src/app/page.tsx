"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import OrderBook from "@/components/OrderBook";
import Chart from "@/components/Chart";
import OrderForm from "@/components/OrderForm";
import OpenOrders from "@/components/OpenOrders";
import Assets from "@/components/Assets";
import TradeHistory from "@/components/TradeHistory";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"orders" | "funds" | "trades">("orders");
  const [mounted, setMounted] = useState(false);
  const [chartCollapsed, setChartCollapsed] = useState(false);
  const [selectedPair, setSelectedPair] = useState("BTC/USDT");
  const [showPairDropdown, setShowPairDropdown] = useState(false);
  const { token, logout } = useAuth();
  const router = useRouter();

  const tradingPairs = [
    { symbol: "BTC/USDT", price: "$49,200.00", change: "+2.5%" },
    { symbol: "ETH/USDT", price: "$2,450.00", change: "+1.8%" },
    { symbol: "BNB/USDT", price: "$320.50", change: "-0.5%" },
    { symbol: "SOL/USDT", price: "$98.75", change: "+5.2%" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAuthClick = () => {
    if (token) {
      logout();
    } else {
      router.push('/login');
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0e11] text-gray-300 flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-gray-800 flex items-center px-6 bg-[#181a20]">
        <div className="font-bold text-xl text-yellow-500 tracking-wider mr-8">
          BINANCE <span className="text-xs text-gray-500 ml-1">CLONE</span>
        </div>
        
        {/* Trading Pair Selector */}
        <div className="relative">
          <button
            onClick={() => setShowPairDropdown(!showPairDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#2B3139] hover:bg-[#3B4048] rounded transition"
          >
            <span className="text-sm font-medium text-white">{selectedPair}</span>
            <span className="text-xs text-green-500 font-mono">
              {tradingPairs.find(p => p.symbol === selectedPair)?.price}
            </span>
            <span className="text-xs">▼</span>
          </button>
          
          {/* Dropdown */}
          {showPairDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-[#1E2329] border border-gray-700 rounded shadow-lg z-50 min-w-[200px]">
              {tradingPairs.map(pair => (
                <button
                  key={pair.symbol}
                  onClick={() => {
                    setSelectedPair(pair.symbol);
                    setShowPairDropdown(false);
                  }}
                  className="w-full px-4 py-2 hover:bg-[#2B3139] text-left flex justify-between items-center transition"
                >
                  <span className="text-sm text-white">{pair.symbol}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{pair.price}</span>
                    <span className={`text-xs ${pair.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {pair.change}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Login/Logout Button */}
        <div className="ml-auto flex items-center gap-4">
          <div className="text-xs text-gray-500">
            Engine: <span className="text-orange-500">Rust</span> • Gateway: <span className="text-cyan-500">Go</span>
          </div>
          
          {!mounted ? (
            <div className="px-4 py-1.5 bg-gray-700 text-gray-400 text-sm font-medium rounded">
              Loading...
            </div>
          ) : token ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">Logged In</span>
              </div>
              <button
                onClick={handleAuthClick}
                className="px-4 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded border border-red-500/30 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleAuthClick}
              className="px-4 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold rounded transition"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Main Content: Chia 3 cột */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Cột 1: Chart (Chiếm phần lớn) */}
        <div className="flex-1 flex flex-col border-r border-gray-800">
          {!chartCollapsed && (
            <div className="flex-1 relative">
              {/* Chart Component - Set absolute positioning */}
              <div className="absolute inset-0">
                <Chart onToggle={() => setChartCollapsed(!chartCollapsed)} collapsed={chartCollapsed} />
              </div>
            </div>
          )}
          
          {/* Khu vực Bottom với Tabs */}
          <div className={`${chartCollapsed ? 'flex-1' : 'h-64'} border-t border-gray-800 bg-[#1e2026] flex flex-col`}>
            {/* Tab Header */}
            <div className="flex items-center border-b border-gray-800">
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-4 py-2 text-sm font-bold transition-colors ${
                  activeTab === "orders"
                    ? "text-yellow-500 border-b-2 border-yellow-500"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                Open Orders
              </button>
              <button
                onClick={() => setActiveTab("funds")}
                className={`px-4 py-2 text-sm font-bold transition-colors ${
                  activeTab === "funds"
                    ? "text-yellow-500 border-b-2 border-yellow-500"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                Funds
              </button>
              <button
                onClick={() => setActiveTab("trades")}
                className={`px-4 py-2 text-sm font-bold transition-colors ${
                  activeTab === "trades"
                    ? "text-yellow-500 border-b-2 border-yellow-500"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                History
              </button>
              
              {/* Show Chart Button (only when collapsed) */}
              {chartCollapsed && (
                <button
                  onClick={() => setChartCollapsed(false)}
                  className="ml-auto px-4 py-2 text-sm font-bold text-green-400 hover:text-green-300 transition-colors"
                  title="Show Chart"
                >
                  📈 Show Chart
                </button>
              )}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden relative">
              {activeTab === "orders" && <OpenOrders />}
              {activeTab === "funds" && <Assets />}
              {activeTab === "trades" && <TradeHistory />}
            </div>
          </div>
        </div>

        {/* Cột 2: OrderBook */}
        <div className="w-[280px] border-r border-gray-800 bg-[#1e2026] flex flex-col">
          <OrderBook />
        </div>

        {/* Cột 3: Order Form (Đặt lệnh) */}
        <div className="w-[320px] bg-[#1e2026] p-2">
          {mounted && !token && (
            <div className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-400 text-sm text-center font-medium">
                ⚠️ Please login to place orders
              </p>
              <button
                onClick={() => router.push('/login')}
                className="w-full mt-3 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold rounded transition"
              >
                Go to Login
              </button>
            </div>
          )}
          <OrderForm />
        </div>

      </div>
    </main>
  );
}
