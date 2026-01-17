"use client";
import Link from "next/link";

const footerLinks = {
  products: [
    { name: "Supercharts", href: "#" },
    { name: "Trading Terminal", href: "#" },
    { name: "Advanced Charts", href: "#" },
    { name: "Market Data", href: "#" },
    { name: "Mobile App", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press Kit", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#" },
  ],
  resources: [
    { name: "Help Center", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "API Reference", href: "#" },
    { name: "Status Page", href: "#" },
    { name: "Security", href: "#" },
  ],
  legal: [
    { name: "Terms of Use", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Disclaimer", href: "#" },
    { name: "Licenses", href: "#" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: "𝕏", href: "#" },
  { name: "Discord", icon: "💬", href: "#" },
  { name: "Telegram", icon: "✈️", href: "#" },
  { name: "YouTube", icon: "▶️", href: "#" },
  { name: "LinkedIn", icon: "💼", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-black">
      <div className="container mx-auto px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl font-bold">A</span>
                </div>
                <span className="text-2xl font-bold text-white">APEX</span>
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The world&apos;s most advanced trading platform. Built for traders, by traders.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110 border border-white/10 hover:border-blue-400/30"
                    aria-label={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h3 className="text-white font-bold mb-4">Products</h3>
              <ul className="space-y-3">
                {footerLinks.products.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © 2026 APEX Trading Platform. All rights reserved.
              </div>
              <div className="flex items-center gap-6 text-sm">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  English
                </Link>
                <span className="text-gray-600">|</span>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  USD
                </Link>
                <span className="text-gray-600">|</span>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  All systems operational
                </Link>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-6 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <p className="text-xs text-gray-500 leading-relaxed">
              <strong className="text-gray-400">Risk Warning:</strong> Trading involves substantial risk and is not suitable for every investor. 
              Past performance is not indicative of future results. Only risk capital you can afford to lose. 
              This website is provided for informational purposes only and does not constitute investment advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
