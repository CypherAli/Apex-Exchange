"use client";

export default function SecurityCompliance() {
  const securityFeatures = [
    {
      title: "Military-Grade Encryption",
      description: "All data encrypted with AES-256 encryption standard. End-to-end encryption for all communications.",
      stats: [
        { label: "Encryption Level", value: "256-bit" },
        { label: "Key Rotation", value: "90 days" }
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Multi-Layer Security",
      description: "Hardware security modules (HSM), DDoS protection, and advanced firewall systems protect against threats.",
      stats: [
        { label: "Security Layers", value: "7+" },
        { label: "Threat Detection", value: "Real-time" }
      ],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Cold Storage Custody",
      description: "Majority of assets stored offline in geographically distributed cold storage vaults with multi-signature access.",
      stats: [
        { label: "Offline Storage", value: "95%" },
        { label: "Multi-Sig", value: "Required" }
      ],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Regulatory Compliance",
      description: "SOC 2 Type II certified, GDPR compliant, and regularly audited by independent security firms.",
      stats: [
        { label: "Certifications", value: "5+" },
        { label: "Audit Frequency", value: "Quarterly" }
      ],
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const certifications = [
    { name: "SOC 2 Type II", issuer: "AICPA", year: "2025" },
    { name: "ISO 27001", issuer: "ISO", year: "2025" },
    { name: "PCI DSS", issuer: "PCI SSC", year: "2025" },
    { name: "GDPR", issuer: "EU", year: "2025" },
    { name: "CCPA", issuer: "California", year: "2025" },
    { name: "FinCEN", issuer: "US Treasury", year: "2025" }
  ];

  return (
    <div className="relative z-10 py-32 border-t border-white/5 overflow-hidden bg-gradient-to-b from-transparent to-blue-950/10">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" 
             style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full 
                          bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 
                          border border-white/10 backdrop-blur-xl mb-8">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 
                             bg-clip-text text-transparent tracking-wider uppercase">
                Security & Compliance
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Bank-Grade
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent 
                             animate-gradient-x">
                Security Infrastructure
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Multi-layered security architecture protecting your assets and data with institutional-grade protocols.
            </p>
          </div>

          {/* Security Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative glass-strong p-8 rounded-2xl border border-white/10 
                         hover:border-white/20 transition-all duration-500"
              >
                {/* Title with Icon */}
                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} 
                                bg-opacity-10 flex items-center justify-center mb-4
                                group-hover:scale-110 transition-transform duration-500`}>
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${feature.gradient}`} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {feature.stats.map((stat, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className={`text-2xl font-black bg-gradient-to-r ${feature.gradient} 
                                    bg-clip-text text-transparent mb-1`}>
                        {stat.value}
                      </div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} 
                               opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500 -z-10`} />
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="glass-strong p-12 rounded-2xl border border-white/10">
            <h3 className="text-3xl font-black text-white mb-8 text-center">
              Certified & Compliant
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-white/5 border border-white/5 
                           hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                                flex items-center justify-center mx-auto mb-3 border border-white/10">
                    <div className="text-2xl font-black text-white/50">
                      {cert.name.substring(0, 2)}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{cert.name}</h4>
                  <p className="text-xs text-gray-500">{cert.issuer}</p>
                  <p className="text-xs text-gray-600 mt-1">{cert.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Statement */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm leading-relaxed max-w-3xl mx-auto">
              Your security is our top priority. We employ the same security standards used by major financial 
              institutions and undergo regular third-party security audits to ensure compliance with the highest 
              industry standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
