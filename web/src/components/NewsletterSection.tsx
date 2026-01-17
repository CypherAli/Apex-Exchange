"use client";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <div className="relative z-10 py-24 border-t border-white/5 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      
      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-xl">
            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto">
              📬
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              Never miss a trade
            </h2>
            <p className="text-xl text-gray-300 text-center mb-8 max-w-2xl mx-auto">
              Get real-time market alerts, trading insights, and exclusive strategies delivered to your inbox
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {status === "loading" ? "Subscribing..." : status === "success" ? "✓ Subscribed!" : "Subscribe"}
                </button>
              </div>
              <p className="text-sm text-gray-400 text-center mt-4">
                By subscribing, you agree to our Terms & Privacy Policy. Unsubscribe anytime.
              </p>
            </form>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <div className="text-sm font-semibold text-white mb-1">Daily Market Analysis</div>
                <div className="text-xs text-gray-400">Expert insights every morning</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-sm font-semibold text-white mb-1">Real-Time Alerts</div>
                <div className="text-xs text-gray-400">Never miss opportunities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎓</div>
                <div className="text-sm font-semibold text-white mb-1">Trading Education</div>
                <div className="text-xs text-gray-400">Free courses & webinars</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
