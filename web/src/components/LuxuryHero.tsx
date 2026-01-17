"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface LuxuryHeroProps {
  isClient: boolean;
  token: string | null;
}

export default function LuxuryHero({ isClient, token }: LuxuryHeroProps) {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Execute", "Analyze", "Monitor", "Scale"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '60px 60px'
             }} />
      </div>

      <div className="relative z-10 container mx-auto px-8 text-center">
        {/* Professional Badge */}
        <div className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full 
                      bg-blue-500/5 border border-blue-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="text-xs font-semibold text-blue-400 tracking-widest uppercase">
            Professional Trading Platform
          </span>
        </div>

        {/* Main Headline with Morphing Text */}
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-none tracking-tighter">
          <span className="inline-block relative">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              {words[currentWord]}
            </span>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 
                          blur-3xl opacity-20 animate-pulse-slow" />
          </span>
          <br />
          <span className="relative inline-block mt-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 
                           bg-clip-text text-transparent animate-gradient-x">
              The Market
            </span>
            <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r 
                          from-blue-500 via-purple-500 to-cyan-500 rounded-full animate-shimmer" />
          </span>
        </h1>

        {/* Subtitle with Typing Effect */}
        <p className="text-xl md:text-2xl text-gray-300 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
          Where <span className="text-blue-400 font-medium">precision</span> meets{" "}
          <span className="text-purple-400 font-medium">opportunity</span>, and{" "}
          <span className="text-cyan-400 font-medium">data</span> transforms into{" "}
          <span className="text-white font-semibold">wealth</span>
        </p>

        {/* Premium CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16" suppressHydrationWarning>
          {!isClient ? (
            <>
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 
                              rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500" />
                <div className="relative px-12 py-5 bg-white text-black rounded-full font-bold text-lg">
                  Start Trading Now
                </div>
              </div>
              <div className="px-12 py-5 bg-white/5 text-white rounded-full font-semibold text-lg 
                            border border-white/10 backdrop-blur-xl">
                Watch Demo
              </div>
            </>
          ) : (
            <>
              <Link href={token ? "/dom" : "/login"} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 
                              rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 
                              animate-gradient-x" />
                <div className="relative px-12 py-5 bg-white hover:bg-gray-50 text-black rounded-full 
                              font-bold text-lg transition-all duration-300 flex items-center gap-3">
                  <span>Start Trading Now</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-black" />
                </div>
              </Link>

              <Link href="#demo" className="group px-12 py-5 bg-white/5 hover:bg-white/10 text-white 
                                          rounded-full font-semibold text-lg border border-white/10 
                                          backdrop-blur-xl transition-all duration-300">
                <span className="flex items-center gap-3">
                  Watch Demo
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent" />
                </span>
              </Link>
            </>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>Bank-Grade Security</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" 
                 style={{ animationDelay: '0.5s' }} />
            <span>Real-Time Execution</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" 
                 style={{ animationDelay: '1s' }} />
            <span>100M+ Traders</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-white/50 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
