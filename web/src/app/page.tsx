"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import PremiumBackground from "@/components/PremiumBackground";
import LuxuryHero from "@/components/LuxuryHero";
import PremiumFeatures from "@/components/PremiumFeatures";
import PremiumStats from "@/components/PremiumStats";
import TechnologyStack from "@/components/TechnologyStack";
import SecurityCompliance from "@/components/SecurityCompliance";
import LiveMarketData from "@/components/LiveMarketData";
import InstitutionalTestimonials from "@/components/InstitutionalTestimonials";
import InstitutionalPricing from "@/components/InstitutionalPricing";
import LanguageSelector from "@/components/LanguageSelector";
import MarketSummary from "@/components/MarketSummary";
import USStocks from "@/components/USStocks";
import LiveTradingFeed from "@/components/LiveTradingFeed";
import TradingPhilosophy from "@/components/TradingPhilosophy";
import TradingWisdom from "@/components/TradingWisdom";
import MarketMoodIndicator from "@/components/MarketMoodIndicator";
import CommunityIdeas from "@/components/CommunityIdeas";
import IndicatorsStrategies from "@/components/IndicatorsStrategies";
import TopStories from "@/components/TopStories";
import CryptoSection from "@/components/CryptoSection";
import ForexHeatmap from "@/components/ForexHeatmap";
import FuturesCommodities from "@/components/FuturesCommodities";
import CalendarSection from "@/components/CalendarSection";
import BrokerSection from "@/components/BrokerSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  const { token, logout } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Use setTimeout to defer state update
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleAuthClick = () => {
    if (token) {
      logout();
    } else {
      router.push('/login');
    }
  };

  return (
    <main className="min-h-screen bg-black text-gray-100 relative">
      {/* Premium Canvas Background */}
      <PremiumBackground />
      
      {/* Header */}
      <header className="relative z-20 h-16 border-b border-white/5 flex items-center px-8 bg-black/40 backdrop-blur-2xl">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-white tracking-tight mr-8 flex items-center gap-2 hover:opacity-80 transition group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition" />
            <div className="relative w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">A</span>
            </div>
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            APEX
          </span>
        </Link>
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-xl mr-12 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/50 via-purple-600/50 to-cyan-600/50 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition" />
          <input
            type="text"
            placeholder="Search markets, assets, strategies..."
            className="relative w-full h-10 px-4 pl-11 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* Navigation */}
        <nav className="flex items-center gap-10 flex-1">
          <Link href="/" className="text-sm text-white/90 hover:text-white transition font-medium relative group">
            Products
            <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform" />
          </Link>
          <Link href="#" className="text-sm text-gray-400 hover:text-white transition font-medium relative group">
            Community
            <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform" />
          </Link>
          <Link href="/dom" className="text-sm text-gray-400 hover:text-white transition font-medium relative group">
            Markets
            <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform" />
          </Link>
          <Link href="#" className="text-sm text-gray-400 hover:text-white transition font-medium relative group">
            Brokers
            <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform" />
          </Link>
        </nav>
        
        {/* Right Side Actions */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Language Selector */}
          <LanguageSelector />

          {/* User/Auth Section */}
          <div suppressHydrationWarning>
            {!isClient ? (
              <div className="w-32 h-10 bg-transparent"></div>
            ) : token ? (
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-white/5 rounded-lg transition group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition" />
                  <svg className="relative w-5 h-5 text-gray-300 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <button
                  onClick={handleAuthClick}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white text-sm font-medium rounded-lg transition border border-white/20 hover:border-white/30"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleAuthClick}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition animate-gradient-x" />
                <div className="relative px-7 py-2.5 bg-white hover:bg-gray-50 text-black text-sm font-bold rounded-lg transition-all">
                  Get started
                </div>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Luxury Hero Section */}
      <LuxuryHero isClient={isClient} token={token} />

      {/* Premium Features Section */}
      <PremiumFeatures />

      {/* Premium Stats Section - NEW */}
      <PremiumStats />

      {/* Technology Stack Section - NEW */}
      <TechnologyStack />

      {/* Security & Compliance Section - NEW */}
      <SecurityCompliance />

      {/* Tech Stack Section - Redesigned */}
      <div className="relative z-10 border-t border-white/5 py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-sm font-medium text-purple-400 tracking-wider uppercase">
                  Technology Stack
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Built with <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">World-Class</span> Technology
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Leveraging the most advanced and battle-tested technologies in the industry
              </p>
            </div>

            {/* Tech Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Rust", color: "orange", desc: "Blazing Fast Engine" },
                { name: "Go", color: "cyan", desc: "Scalable Gateway" },
                { name: "Next.js", color: "blue", desc: "Modern UI/UX" },
                { name: "PostgreSQL", color: "green", desc: "Reliable Database" },
                { name: "Redis", color: "red", desc: "Lightning Cache" },
                { name: "NATS", color: "purple", desc: "Message Streaming" }
              ].map((tech, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-xl bg-white/[0.02] border border-white/[0.05] 
                           hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300
                           hover:scale-105 hover:-translate-y-1"
                >
                  {/* Hover Glow */}
                  <div className={`absolute -inset-1 bg-${tech.color}-500/20 rounded-xl blur-lg opacity-0 
                                 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative text-center">
                    <div className={`w-3 h-3 rounded-full bg-${tech.color}-500 mx-auto mb-3 
                                   group-hover:scale-125 transition-transform`} />
                    <h3 className={`text-lg font-bold text-gray-300 mb-1 group-hover:text-${tech.color}-400 transition-colors`}>
                      {tech.name}
                    </h3>
                    <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                      {tech.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Market Summary Section - FIRST: Show overall market */}
      <MarketSummary />

      {/* Crypto Section - Popular section */}
      <CryptoSection />

      {/* US Stocks Section */}
      <USStocks />

      {/* Forex Heatmap Section */}
      <ForexHeatmap />

      {/* Futures & Commodities Section */}
      <FuturesCommodities />

      {/* Live Trading Feed - Real action happening now */}
      <LiveTradingFeed />

      {/* Market Mood Indicator - Psychology */}
      <MarketMoodIndicator />

      {/* Trading Philosophy - Art of Trading */}
      <TradingPhilosophy />

      {/* Trading Wisdom - Quotes from legends */}
      <TradingWisdom />

      {/* Community Ideas Section */}
      <CommunityIdeas />

      {/* Indicators and Strategies Section */}
      <IndicatorsStrategies />

      {/* Top Stories Section */}
      <TopStories />

      {/* Calendar Section */}
      <CalendarSection />

      {/* Live Market Data Section - NEW */}
      <LiveMarketData />

      {/* Institutional Testimonials Section - NEW */}
      <InstitutionalTestimonials />

      {/* Institutional Pricing Section - NEW */}
      <InstitutionalPricing />

      {/* Broker Section */}
      <BrokerSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Quick Access Section */}
      <div className="relative z-10 border-t border-white/5 py-16">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" suppressHydrationWarning>
              <Link
                href="/dom"
                className="group p-8 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
                    Start Trading
                  </h3>
                  <svg className="w-5 h-5 text-blue-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">
                  Access advanced order types, depth of market, and real-time execution.
                </p>
              </Link>

              {!isClient ? (
                <div className="p-8 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">Create Account</h3>
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">Sign up in seconds. No credit card required.</p>
                </div>
              ) : (
                <Link
                  href={token ? "#" : "/login"}
                  className="group p-8 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition">
                      {token ? "View Dashboard" : "Create Account"}
                    </h3>
                    <svg className="w-5 h-5 text-purple-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {token ? "Monitor your positions and trading history." : "Sign up in seconds. No credit card required."}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
