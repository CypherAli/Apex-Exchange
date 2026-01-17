"use client";
import AnimatedCounter from "./AnimatedCounter";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Day Trader",
    company: "Independent",
    avatar: "👩‍💼",
    rating: 5,
    text: "The execution speed is incredible. I've been trading for 10 years and this is hands down the fastest platform I've used. Zero slippage on most trades.",
  },
  {
    name: "Michael Rodriguez",
    role: "Portfolio Manager",
    company: "Alpha Capital",
    avatar: "👨‍💼",
    rating: 5,
    text: "Advanced charting tools rival TradingView, but with the added benefit of direct execution. Game changer for institutional trading.",
  },
  {
    name: "Emily Watson",
    role: "Crypto Trader",
    company: "Blockchain Ventures",
    avatar: "👩‍🔬",
    rating: 5,
    text: "Finally, a platform that understands crypto traders. Real-time data, multiple exchanges, and lightning-fast execution. Absolutely love it!",
  },
  {
    name: "David Kim",
    role: "Quantitative Analyst",
    company: "HFT Solutions",
    avatar: "👨‍💻",
    rating: 5,
    text: "The API is robust and well-documented. We've integrated our algorithmic strategies seamlessly. Latency is impressive for a retail platform.",
  },
];

export default function TestimonialsSection() {
  return (
    <div className="relative z-10 py-20 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              Trusted by <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">100M+</span> traders
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join millions of traders who trust our platform for their daily trading needs
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] hover:border-blue-400/30 transition-all hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 text-lg mb-6 leading-relaxed italic">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center text-3xl border-2 border-blue-400/20 group-hover:scale-110 transition-transform">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter end={100} suffix="M+" />
              </div>
              <div className="text-gray-400">Active Traders</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                $<AnimatedCounter end={500} suffix="B+" />
              </div>
              <div className="text-gray-400">Daily Volume</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter end={195} suffix="+" />
              </div>
              <div className="text-gray-400">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter end={4.8} decimals={1} suffix="★" />
              </div>
              <div className="text-gray-400">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
