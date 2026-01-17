"use client";
import Link from "next/link";

export default function PremiumFeatures() {
  const features = [
    {
      number: "01",
      title: "Order Book Depth",
      description: "Real-time Level 2 market data with full order book depth visualization. See exactly where liquidity sits.",
      gradient: "from-blue-500 to-cyan-500",
      metric: "Level 2",
      metricLabel: "Market Data"
    },
    {
      number: "02",
      title: "Matching Engine",
      description: "Built in Rust for maximum performance. Price-time priority matching with sub-millisecond order execution.",
      gradient: "from-green-500 to-emerald-500",
      metric: "< 1ms",
      metricLabel: "Execution"
    },
    {
      number: "03",
      title: "Risk Management",
      description: "Pre-trade risk checks, position limits, and margin calculations. Prevent costly errors before they happen.",
      gradient: "from-purple-500 to-pink-500",
      metric: "Real-time",
      metricLabel: "Checks"
    },
    {
      number: "04",
      title: "Market Orders",
      description: "Support for limit, market, stop-loss, and stop-limit orders. Full order lifecycle management and fill tracking.",
      gradient: "from-orange-500 to-red-500",
      metric: "4 Types",
      metricLabel: "Orders"
    },
    {
      number: "05",
      title: "WebSocket API",
      description: "Subscribe to real-time trade updates, order book changes, and account events via WebSocket connections.",
      gradient: "from-cyan-500 to-blue-500",
      metric: "Live",
      metricLabel: "Streaming"
    },
    {
      number: "06",
      title: "Trade History",
      description: "Complete audit trail of all trades, orders, and account activity. Export to CSV for analysis and reporting.",
      gradient: "from-pink-500 to-purple-500",
      metric: "Full",
      metricLabel: "Audit Trail"
    }
  ];

  return (
    <div className="relative z-10 py-20 border-t border-white/5">
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Core Features
            </h2>
            <p className="text-gray-400">
              Professional trading platform capabilities
            </p>
          </div>

          {/* Features Grid - Simplified */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                href="/dom"
                className="group p-6 rounded-xl bg-white/[0.02] border border-white/10 
                         hover:bg-white/[0.04] hover:border-blue-500/40 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`text-4xl font-black opacity-15 bg-gradient-to-br ${feature.gradient} 
                                 bg-clip-text text-transparent`}>
                    {feature.number}
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold bg-gradient-to-br ${feature.gradient} 
                                   bg-clip-text text-transparent`}>
                      {feature.metric}
                    </div>
                    <div className="text-[9px] text-gray-600 uppercase tracking-wider">
                      {feature.metricLabel}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link href="/dom" 
                  className="inline-block px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
              View Platform
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
