"use client";

export default function TechnologyStack() {
  const technologies = [
    {
      category: "Backend Infrastructure",
      items: [
        { name: "Rust", description: "Ultra-low latency matching engine", metric: "< 1μs" },
        { name: "PostgreSQL", description: "ACID-compliant transaction system", metric: "99.99%" },
        { name: "Redis", description: "Real-time order book caching", metric: "< 1ms" },
        { name: "WebSocket", description: "Bidirectional streaming protocol", metric: "Live" }
      ],
      gradient: "from-orange-500 to-red-500"
    },
    {
      category: "Frontend Technology",
      items: [
        { name: "Next.js 16", description: "React-based framework with SSR", metric: "v16.1" },
        { name: "TypeScript", description: "Type-safe development", metric: "100%" },
        { name: "Tailwind CSS", description: "Utility-first styling", metric: "v4.0" },
        { name: "Turbopack", description: "Next-gen bundler", metric: "Fast" }
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      category: "Security & Compliance",
      items: [
        { name: "JWT Auth", description: "Stateless authentication", metric: "Secure" },
        { name: "AES-256", description: "Military-grade encryption", metric: "256-bit" },
        { name: "SOC 2 Type II", description: "Enterprise compliance", metric: "Certified" },
        { name: "Cold Storage", description: "Asset custody solution", metric: "Secure" }
      ],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      category: "Market Data Integration",
      items: [
        { name: "CoinGecko API", description: "Cryptocurrency market data", metric: "30s" },
        { name: "Finnhub API", description: "Stock & forex data feed", metric: "60s" },
        { name: "Level 2 Data", description: "Order book depth", metric: "Real-time" },
        { name: "Trade History", description: "Historical execution data", metric: "Full" }
      ],
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="relative z-10 py-32 border-t border-white/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.5) 1px, transparent 0)
               `,
               backgroundSize: '40px 40px'
             }} />
      </div>

      <div className="container mx-auto px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full 
                          bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 
                          border border-white/10 backdrop-blur-xl mb-8">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 
                             bg-clip-text text-transparent tracking-wider uppercase">
                Technology Stack
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Built with
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent 
                             animate-gradient-x">
                Enterprise-Grade Infrastructure
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Modern technology stack optimized for performance, security, and scalability.
            </p>
          </div>

          {/* Technology Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group relative glass-strong p-8 rounded-2xl border border-white/10 
                         hover:border-white/20 transition-all duration-500"
              >
                {/* Category Header */}
                <div className="mb-8">
                  <div className={`inline-flex px-4 py-2 rounded-full bg-gradient-to-r ${tech.gradient} 
                                bg-opacity-10 border border-white/10 mb-4`}>
                    <span className={`text-sm font-bold bg-gradient-to-r ${tech.gradient} 
                                   bg-clip-text text-transparent uppercase tracking-wider`}>
                      {tech.category}
                    </span>
                  </div>
                  <div className={`h-1 w-20 rounded-full bg-gradient-to-r ${tech.gradient}`} />
                </div>

                {/* Technology Items */}
                <div className="space-y-6">
                  {tech.items.map((item, i) => (
                    <div key={i} className="flex items-start justify-between gap-4 pb-6 border-b border-white/5 
                                          last:border-0 last:pb-0 hover:border-white/10 transition-colors">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-1">{item.name}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${tech.gradient} 
                                    bg-opacity-10 border border-white/10 flex-shrink-0`}>
                        <span className={`text-xs font-bold bg-gradient-to-r ${tech.gradient} 
                                       bg-clip-text text-transparent`}>
                          {item.metric}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hover Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tech.gradient} 
                               opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500 -z-10`} />
              </div>
            ))}
          </div>

          {/* Performance Metrics */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 glass rounded-xl border border-white/5">
              <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 
                            bg-clip-text text-transparent mb-2">
                &lt; 1μs
              </div>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Order Latency</p>
            </div>
            <div className="text-center p-6 glass rounded-xl border border-white/5">
              <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 
                            bg-clip-text text-transparent mb-2">
                100K+
              </div>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Orders/Second</p>
            </div>
            <div className="text-center p-6 glass rounded-xl border border-white/5">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 
                            bg-clip-text text-transparent mb-2">
                99.99%
              </div>
              <p className="text-gray-500 text-xs uppercase tracking-wider">System Uptime</p>
            </div>
            <div className="text-center p-6 glass rounded-xl border border-white/5">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-400 
                            bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Global Access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
