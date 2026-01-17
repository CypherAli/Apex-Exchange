"use client";
import { useState } from "react";
import Link from "next/link";

export default function PremiumPricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Starter",
      description: "Perfect for beginners starting their trading journey",
      price: { monthly: 0, yearly: 0 },
      gradient: "from-gray-500 to-gray-600",
      features: [
        "Real-time market data",
        "Basic charting tools",
        "5 active positions",
        "Email support",
        "Mobile app access",
        "Community access"
      ],
      popular: false,
      cta: "Get Started Free"
    },
    {
      name: "Professional",
      description: "For serious traders who need advanced tools",
      price: { monthly: 49, yearly: 490 },
      gradient: "from-blue-500 to-purple-500",
      features: [
        "Everything in Starter",
        "Advanced analytics",
        "Unlimited positions",
        "Priority support 24/7",
        "API access",
        "Custom indicators",
        "Trade automation",
        "Portfolio insights"
      ],
      popular: true,
      cta: "Start 14-day Trial"
    },
    {
      name: "Enterprise",
      description: "Custom solutions for institutions and teams",
      price: { monthly: "Custom", yearly: "Custom" },
      gradient: "from-purple-500 to-pink-500",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "White-label solution",
        "Custom integrations",
        "SLA guarantee",
        "Advanced security",
        "Training & onboarding",
        "Multi-user accounts"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  return (
    <div className="relative z-10 py-32 border-t border-white/5 overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(139, 92, 246, 0.2) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(139, 92, 246, 0.2) 1px, transparent 1px)
               `,
               backgroundSize: '40px 40px'
             }} />
      </div>

      <div className="container mx-auto px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-purple-400 tracking-wider uppercase">
                Transparent Pricing
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Choose Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                Perfect Plan
              </span>
            </h2>
            <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-8">
              Start free, upgrade when you&apos;re ready. All plans include a 14-day money-back guarantee.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-1 rounded-full bg-white/[0.02] border border-white/[0.05]">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  billingPeriod === "monthly"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 relative ${
                  billingPeriod === "yearly"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative group ${plan.popular ? 'md:scale-110 z-10' : ''}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-sm font-bold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${plan.gradient} rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Card */}
                <div className={`relative p-8 rounded-3xl backdrop-blur-xl transition-all duration-500 ${
                  plan.popular 
                    ? 'bg-white/[0.05] border-2 border-white/10' 
                    : 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10'
                }`}>
                  {/* Plan Header */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      {typeof plan.price[billingPeriod] === "number" ? (
                        <>
                          <span className="text-5xl font-black text-white">
                            ${plan.price[billingPeriod]}
                          </span>
                          <span className="text-gray-400 text-sm">
                            /{billingPeriod === "monthly" ? "month" : "year"}
                          </span>
                        </>
                      ) : (
                        <span className="text-5xl font-black text-white">
                          {plan.price[billingPeriod]}
                        </span>
                      )}
                    </div>
                    {billingPeriod === "yearly" && typeof plan.price.yearly === "number" && typeof plan.price.monthly === "number" && (
                      <p className="text-green-400 text-sm mt-2">
                        Save ${(plan.price.monthly * 12) - plan.price.yearly} per year
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={plan.name === "Enterprise" ? "/contact" : "/register"}
                    className={`block w-full py-4 rounded-xl font-bold text-center transition-all duration-300 mb-8 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  {/* Features */}
                  <div className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'text-blue-400' : 'text-gray-400'
                        }`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300 text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 text-center">
            <h3 className="text-3xl font-black text-white mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-400 mb-8">
              Have questions? We&apos;re here to help.
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all border border-white/10"
            >
              <span>View All FAQs</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
