"use client";
import Link from "next/link";
import AnimatedCounter from "./AnimatedCounter";

export default function TradingPhilosophy() {
  return (
    <div className="relative z-10 py-32 overflow-hidden">
      {/* Artistic Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Content - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left Column - Story */}
            <div className="space-y-8">
              <div>
                <div className="inline-block mb-6">
                  <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider px-4 py-2 rounded-full border border-blue-400/30 bg-blue-400/5">
                    Our Philosophy
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Trading is an
                  <span className="block mt-2 italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    art form
                  </span>
                </h2>
              </div>

              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-blue-400 first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                  Like a master painter approaching a blank canvas, successful traders blend technical precision with intuitive vision. 
                  Each decision is a brushstroke, carefully placed with years of experience and understanding.
                </p>

                <p>
                  We believe trading transcends mere numbers and charts. It&apos;s about reading the rhythm of markets, 
                  understanding human psychology, and having the discipline to wait for the perfect moment.
                </p>

                <p className="text-blue-300 italic border-l-4 border-blue-400/30 pl-6 py-2">
                  &ldquo;The market is not just about data—it&apos;s about stories, emotions, and the collective heartbeat of millions 
                  of traders worldwide.&rdquo;
                </p>

                <p>
                  Our platform is designed not just to execute trades, but to empower your journey from novice to virtuoso. 
                  Every feature, every tool, every insight is crafted with the respect that this art form deserves.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Link
                  href="/dom"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Begin Your Journey
                </Link>
                <Link
                  href="#"
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all border border-white/10 hover:border-white/20"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Column - Visual Stats */}
            <div className="space-y-6">
              {/* Achievement Cards */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 backdrop-blur-sm hover:scale-105 transition-transform duration-500">
                <div className="text-6xl mb-4">🎨</div>
                <div className="text-5xl font-bold text-white mb-2">
                  <AnimatedCounter end={100} suffix="M+" />
                </div>
                <div className="text-xl text-gray-300">Artists of Finance</div>
                <div className="text-sm text-gray-500 mt-2">Trading on our platform daily</div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/20 backdrop-blur-sm hover:scale-105 transition-transform">
                  <div className="text-4xl mb-3">⚡</div>
                  <div className="text-3xl font-bold text-white mb-1">
                    <AnimatedCounter end={0.001} decimals={3} suffix="s" />
                  </div>
                  <div className="text-sm text-gray-300">Execution Speed</div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-400/20 backdrop-blur-sm hover:scale-105 transition-transform">
                  <div className="text-4xl mb-3">🌍</div>
                  <div className="text-3xl font-bold text-white mb-1">
                    <AnimatedCounter end={195} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-300">Countries</div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 backdrop-blur-sm hover:scale-105 transition-transform duration-500">
                <div className="text-6xl mb-4">💎</div>
                <div className="text-5xl font-bold text-white mb-2">
                  $<AnimatedCounter end={500} suffix="B+" />
                </div>
                <div className="text-xl text-gray-300">Daily Trade Volume</div>
                <div className="text-sm text-gray-500 mt-2">The pulse of global markets</div>
              </div>
            </div>
          </div>

          {/* Bottom - Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-white/5">
            <div className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-400/30 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎯</div>
              <h3 className="text-xl font-bold text-white mb-3">Precision</h3>
              <p className="text-gray-400 leading-relaxed">
                Every trade executed with microsecond accuracy and zero compromise
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-purple-400/30 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🧠</div>
              <h3 className="text-xl font-bold text-white mb-3">Intelligence</h3>
              <p className="text-gray-400 leading-relaxed">
                Advanced analytics meet human intuition for smarter decisions
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-pink-400/30 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🤝</div>
              <h3 className="text-xl font-bold text-white mb-3">Integrity</h3>
              <p className="text-gray-400 leading-relaxed">
                Transparent, honest, and built on trust—your success is our mission
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
