"use client";
import { useState, useEffect } from "react";

export default function PremiumTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "APEX transformed my trading completely. The execution speed is unmatched, and the interface is incredibly intuitive. I've increased my profitability by 300% in just 6 months.",
      author: "Sarah Chen",
      role: "Professional Day Trader",
      company: "Goldman Sachs Alumni",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 5,
      verified: true
    },
    {
      quote: "As a quantitative analyst, I need precision and reliability. APEX delivers both flawlessly. The API integration is seamless, and the data quality is institutional-grade.",
      author: "Marcus Rodriguez",
      role: "Quantitative Analyst",
      company: "Citadel Securities",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      rating: 5,
      verified: true
    },
    {
      quote: "The real-time market depth and order book visualization gives me an edge that other platforms simply can't match. This is the future of retail trading.",
      author: "Emily Thompson",
      role: "Crypto Trader",
      company: "Independent",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      rating: 5,
      verified: true
    },
    {
      quote: "I've tried every major platform out there. APEX is the only one that combines Bloomberg-level data with a modern, beautiful interface. It's a game changer.",
      author: "David Park",
      role: "Portfolio Manager",
      company: "Bridgewater Associates",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      rating: 5,
      verified: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="relative z-10 py-32 border-t border-white/5 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" 
             style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-yellow-400 tracking-wider uppercase">
                5-Star Reviews
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Loved by
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                Professional Traders
              </span>
            </h2>
            <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
              Don&apos;t just take our word for it - hear from traders who&apos;ve transformed their trading with APEX
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative">
            {/* Main Testimonial Card */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 
                            rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative p-12 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl">
                {/* Quote Icon */}
                <div className="absolute top-8 left-8 text-blue-500/20">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 ml-20">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-8">
                    &ldquo;{testimonials[activeIndex].quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/50">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500" />
                      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                        {testimonials[activeIndex].author.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-bold text-white">
                          {testimonials[activeIndex].author}
                        </h4>
                        {testimonials[activeIndex].verified && (
                          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">
                        {testimonials[activeIndex].role}
                      </p>
                      <p className="text-blue-400 text-sm font-medium">
                        {testimonials[activeIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-12">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeIndex
                      ? 'w-12 h-3 bg-gradient-to-r from-blue-500 to-purple-500'
                      : 'w-3 h-3 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "4.9/5", sublabel: "App Store Rating" },
              { label: "10M+", sublabel: "Downloads" },
              { label: "99.9%", sublabel: "Uptime" },
              { label: "24/7", sublabel: "Support" }
            ].map((badge, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-black text-white mb-1">
                  {badge.label}
                </div>
                <div className="text-sm text-gray-400">
                  {badge.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
