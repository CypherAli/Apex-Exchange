"use client";

const quotes = [
  {
    text: "The stock market is filled with individuals who know the price of everything, but the value of nothing.",
    author: "Philip Fisher",
    role: "Investment Legend",
    year: "1907-2004"
  },
  {
    text: "In investing, what is comfortable is rarely profitable.",
    author: "Robert Arnott",
    role: "Founder, Research Affiliates",
    year: "Born 1954"
  },
  {
    text: "The goal of a successful trader is to make the best trades. Money is secondary.",
    author: "Alexander Elder",
    role: "Professional Trader",
    year: "Born 1950"
  },
  {
    text: "Time is your friend; impulse is your enemy.",
    author: "John Bogle",
    role: "Founder of Vanguard",
    year: "1929-2019"
  }
];

export default function TradingWisdom() {
  return (
    <div className="relative z-10 py-32 overflow-hidden">
      {/* Artistic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider px-4 py-2 rounded-full border border-blue-400/30 bg-blue-400/5">
                Wisdom from the Masters
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              The Art of <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Trading</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Timeless insights from legendary investors and traders who shaped the markets
            </p>
          </div>

          {/* Quotes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`
                }}
              >
                {/* Quote Card */}
                <div className="h-full p-10 rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.05] hover:border-blue-400/30 transition-all duration-500 relative overflow-hidden group-hover:shadow-2xl group-hover:shadow-blue-500/10">
                  {/* Decorative Element */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                  
                  {/* Giant Quote Mark */}
                  <div className="absolute -top-4 -left-2 text-8xl text-blue-400/10 font-serif leading-none select-none">
                    &ldquo;
                  </div>

                  {/* Quote Text */}
                  <blockquote className="relative z-10 mb-8">
                    <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light italic">
                      {quote.text}
                    </p>
                  </blockquote>

                  {/* Author Info */}
                  <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-white/5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center border border-blue-400/20 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">📊</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white text-lg">{quote.author}</div>
                      <div className="text-sm text-gray-400">
                        {quote.role} <span className="text-gray-600">•</span> {quote.year}
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Divider */}
          <div className="mt-20 flex items-center justify-center">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
            <div className="mx-4 text-blue-400/50">✦</div>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
