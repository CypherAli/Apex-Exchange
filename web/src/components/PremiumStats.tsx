"use client";
import { useState, useEffect } from "react";

export default function PremiumStats() {
  const [counts, setCounts] = useState({
    users: 0,
    trades: 0,
    volume: 0,
    countries: 0
  });

  useEffect(() => {
    const targets = {
      users: 100000000,
      trades: 5000000000,
      volume: 2500000000000,
      countries: 195
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounts({
        users: Math.floor(targets.users * progress),
        trades: Math.floor(targets.trades * progress),
        volume: Math.floor(targets.volume * progress),
        countries: Math.floor(targets.countries * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000000000) return `$${(num / 1000000000000).toFixed(1)}T`;
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(0)}B+`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(0)}M+`;
    return num.toLocaleString();
  };

  const stats = [
    {
      value: formatNumber(counts.users),
      label: "Active Traders",
      sublabel: "Institutional & Retail",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      value: formatNumber(counts.trades),
      label: "Trades Executed",
      sublabel: "Daily Average",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      value: formatNumber(counts.volume),
      label: "Trading Volume",
      sublabel: "Annual Notional",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      value: formatNumber(counts.countries),
      label: "Countries Served",
      sublabel: "Global Presence",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="relative z-10 py-32 border-t border-white/5 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }} />
      </div>

      <div className="container mx-auto px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-green-400 tracking-wider uppercase">
                Trusted Worldwide
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Powering the Future
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                of Global Trading
              </span>
            </h2>
            <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
              Join millions of traders who trust APEX for their daily trading needs
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Animated Border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-sm"
                     style={{
                       background: `linear-gradient(135deg, ${stat.gradient.split(' ')[1]}, ${stat.gradient.split(' ')[3]})`
                     }} />
                
                {/* Card */}
                <div className="relative p-8 rounded-2xl bg-black border border-white/[0.05] 
                              hover:border-white/10 transition-all duration-500 backdrop-blur-xl
                              group-hover:scale-105 group-hover:-translate-y-2">
                  {/* Value */}
                  <div className="mb-3">
                    <span className="text-6xl font-black text-white group-hover:text-transparent 
                                   group-hover:bg-gradient-to-br group-hover:bg-clip-text transition-all"
                          style={{
                            backgroundImage: `linear-gradient(135deg, ${stat.gradient.split(' ')[1]}, ${stat.gradient.split(' ')[3]})`
                          }}>
                      {stat.value}
                    </span>
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-gray-200 transition-colors">
                    {stat.label}
                  </h3>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">
                    {stat.sublabel}
                  </p>

                  {/* Hover Indicator */}
                  <div className="mt-4 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                       style={{
                         background: `linear-gradient(to right, ${stat.gradient.split(' ')[1]}, ${stat.gradient.split(' ')[3]})`
                       }} />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <p className="text-gray-500 text-lg mb-6">
              Be part of the world&apos;s most advanced trading community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 
                              rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 
                              animate-gradient-x" />
                <div className="relative px-12 py-5 bg-white hover:bg-gray-50 text-black rounded-full 
                              font-bold text-lg transition-all duration-300 flex items-center gap-3">
                  <span>Open Trading Account</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-black" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
