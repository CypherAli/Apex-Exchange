"use client";
import { useState } from "react";

export default function InstitutionalPricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      tier: "01",
      name: "Retail Trader",
      price: 0,
      period: "Free Forever",
      description: "Essential tools for individual traders",
      features: [
        "Real-time Level 1 market data",
        "Basic charting and indicators",
        "Up to 100 trades per month",
        "Standard execution speed",
        "Email support (48hr response)",
        "Mobile and web access"
      ],
      gradient: "from-gray-500 to-gray-600",
      popular: false
    },
    {
      tier: "02",
      name: "Professional",
      price: isYearly ? 490 : 49,
      period: isYearly ? "/year" : "/month",
      description: "Advanced features for serious traders",
      features: [
        "Real-time Level 2 market depth",
        "Advanced charting suite (50+ indicators)",
        "Unlimited trade execution",
        "Priority order routing",
        "RESTful & WebSocket API (100 req/sec)",
        "Priority support (4hr response)",
        "Custom alerts and automation",
        "Advanced risk management tools"
      ],
      gradient: "from-blue-500 to-purple-500",
      popular: true
    },
    {
      tier: "03",
      name: "Institutional",
      price: null,
      period: "Custom",
      description: "Enterprise-grade infrastructure",
      features: [
        "Dedicated infrastructure & co-location",
        "Unlimited API rate limits",
        "Custom integration support",
        "Dedicated account manager",
        "24/7 priority support",
        "White-label solutions",
        "Compliance and reporting tools",
        "Multi-user account management"
      ],
      gradient: "from-purple-500 to-pink-500",
      popular: false
    }
  ];

  const savings = isYearly && plans[1].price && typeof plans[1].price === 'number' 
    ? ((plans[1].price / 12) * 12 * 2 - plans[1].price).toFixed(0) 
    : 0;

  return (
    <div className="relative z-10 py-32 border-t border-white/5 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
               `,
               backgroundSize: '40px 40px'
             }} />
      </div>

      <div className="container mx-auto px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full 
                          bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 
                          border border-white/10 backdrop-blur-xl mb-8">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 
                             bg-clip-text text-transparent tracking-wider uppercase">
                Transparent Pricing
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Choose Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent 
                             animate-gradient-x">
                Trading Tier
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Scalable solutions from retail to institutional-grade infrastructure.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-white' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-16 h-8 rounded-full bg-white/10 border border-white/20 transition-all"
              >
                <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 
                               transition-transform duration-300 ${isYearly ? 'translate-x-8' : 'translate-x-0'}`} />
              </button>
              <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-white' : 'text-gray-500'}`}>
                Yearly
              </span>
              {isYearly && typeof savings === 'number' && savings > 0 && (
                <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                  <span className="text-xs text-green-400 font-medium uppercase tracking-wider">
                    Save ${savings} annually
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 
                          ${plan.popular ? 'transform scale-105 lg:scale-110' : 'hover:scale-105'}`}
              >
                {/* Glow Effect */}
                {plan.popular && (
                  <div className={`absolute -inset-1 bg-gradient-to-br ${plan.gradient} blur-xl opacity-50 
                                 group-hover:opacity-75 transition-opacity`} />
                )}

                <div className={`relative glass-strong p-8 rounded-2xl border h-full flex flex-col
                               ${plan.popular ? 'border-white/20' : 'border-white/10'} 
                               hover:border-white/30 transition-all duration-500`}>
                  
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 
                                  bg-gradient-to-r from-blue-600 to-purple-600 rounded-full 
                                  shadow-lg shadow-blue-500/50">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Tier Number */}
                  <div className="mb-6">
                    <div className={`text-8xl font-black opacity-10 leading-none 
                                   bg-gradient-to-br ${plan.gradient} bg-clip-text text-transparent`}>
                      {plan.tier}
                    </div>
                  </div>

                  {/* Plan Info */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    {plan.price !== null ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-semibold text-gray-400">$</span>
                        <span className="text-6xl font-black text-white">{plan.price}</span>
                        <span className="text-gray-400 text-lg">{plan.period}</span>
                      </div>
                    ) : (
                      <div className="text-4xl font-black text-white">Contact Sales</div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                                      flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-blue-400" />
                        </div>
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
                                    ${plan.popular 
                                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25' 
                                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
                    {plan.price === null ? 'Contact Sales' : plan.price === 0 ? 'Get Started' : 'Start Free Trial'}
                  </button>

                  {/* Bottom Accent Line */}
                  <div className={`mt-6 h-1 w-full rounded-full bg-gradient-to-r ${plan.gradient} opacity-50`} />
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise Contact CTA */}
          <div className="text-center">
            <p className="text-gray-400 mb-6">
              Need a custom solution? Our team can build infrastructure tailored to your requirements.
            </p>
            <button className="group relative inline-flex">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 
                            rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 
                            animate-gradient-x" />
              <div className="relative px-12 py-5 bg-white hover:bg-gray-50 text-black rounded-full 
                            font-bold text-lg transition-all duration-300 flex items-center gap-3">
                <span>Schedule Enterprise Consultation</span>
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
