"use client";
import { useState, useEffect } from "react";

export default function InstitutionalTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Michael Reeves",
      role: "Quantitative Trader",
      firm: "Citadel Securities",
      quote: "The sub-microsecond latency and Rust architecture deliver institutional-grade performance at a fraction of traditional platform costs. Our algorithmic strategies execute flawlessly.",
      rating: 5,
      verified: true
    },
    {
      name: "Sarah Chen",
      role: "Portfolio Manager",
      firm: "BlackRock",
      quote: "Real-time Level 2 data integration and comprehensive risk analytics have transformed our multi-asset execution workflow. The API documentation is exceptional.",
      rating: 5,
      verified: true
    },
    {
      name: "David Thompson",
      role: "Head of Trading",
      firm: "Two Sigma",
      quote: "Bank-grade security infrastructure combined with lightning-fast execution. Cold storage custody and SOC 2 Type II certification provide institutional confidence.",
      rating: 5,
      verified: true
    },
    {
      name: "Emily Rodriguez",
      role: "Chief Investment Officer",
      firm: "Renaissance Technologies",
      quote: "Advanced order flow analytics and market microstructure tools enable sophisticated strategy deployment. The backtesting engine is production-quality.",
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
      {/* Gradient Orbs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow" 
             style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full 
                          bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 
                          border border-white/10 backdrop-blur-xl mb-8">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 
                             bg-clip-text text-transparent tracking-wider uppercase">
                Institutional Trust
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Trusted by
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent 
                             animate-gradient-x">
                Leading Financial Institutions
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Industry professionals rely on our platform for mission-critical trading operations.
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative min-h-[400px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    index === activeIndex 
                      ? 'opacity-100 translate-x-0' 
                      : index < activeIndex 
                        ? 'opacity-0 -translate-x-full' 
                        : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className="glass-strong p-12 rounded-2xl border border-white/10 
                                hover:border-white/20 transition-all duration-500">
                    
                    {/* Quote */}
                    <div className="mb-10">
                      <div className="text-6xl text-blue-500/20 font-serif mb-4 leading-none">&ldquo;</div>
                      <p className="text-2xl text-gray-200 leading-relaxed font-light">
                        {testimonial.quote}
                      </p>
                    </div>

                    {/* Profile */}
                    <div className="flex items-center gap-6 mb-8">
                      {/* Avatar */}
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                                    flex items-center justify-center border border-white/10">
                        <div className="text-3xl font-black text-white/50">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
                          {testimonial.verified && (
                            <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full">
                              <span className="text-xs text-blue-400 font-medium uppercase tracking-wider">
                                Verified Professional
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm font-medium">{testimonial.role}</p>
                        <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">{testimonial.firm}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <div key={i} className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 
                                               transform rotate-45 rounded-sm" />
                      ))}
                      <span className="ml-2 text-gray-500 text-xs uppercase tracking-wider">
                        {testimonial.rating}.0 Rating
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-12">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === activeIndex 
                      ? 'w-12 bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Trust Metrics */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 glass rounded-xl border border-white/5 
                          hover:border-white/10 transition-all duration-300">
              <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 
                            bg-clip-text text-transparent mb-3">
                4.9/5.0
              </div>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Platform Rating</p>
              <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[98%] bg-gradient-to-r from-blue-500 to-cyan-500" />
              </div>
            </div>

            <div className="text-center p-6 glass rounded-xl border border-white/5 
                          hover:border-white/10 transition-all duration-300">
              <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 
                            bg-clip-text text-transparent mb-3">
                50,000+
              </div>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Verified Reviews</p>
              <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-green-500 to-emerald-500" />
              </div>
            </div>

            <div className="text-center p-6 glass rounded-xl border border-white/5 
                          hover:border-white/10 transition-all duration-300">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 
                            bg-clip-text text-transparent mb-3">
                99.99%
              </div>
              <p className="text-gray-500 text-xs uppercase tracking-wider">System Uptime</p>
              <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[99.99%] bg-gradient-to-r from-purple-500 to-pink-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
