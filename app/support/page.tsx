// app/support/page.tsx
"use client";

import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function SupportPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  return (
    <div className="bg-white text-black font-sans min-h-screen">
      {/* Navigation – identical style to homepage */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-200 bg-opacity-95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-2 border-black rounded-lg hover:bg-gray-300 transition"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-8 lg:gap-12 text-xs font-bold uppercase tracking-wider">
            <Link href="/" className="hover:text-gray-600 transition">How to Ride</Link>
            <Link href="/" className="hover:text-gray-600 transition">Where to Ride</Link>
            <div className="text-3xl font-bold tracking-widest mx-8">ZOOX</div>
            <Link href="/" className="hover:text-gray-600 transition">Know Your Ride</Link>
            <Link href="/support" className="font-black">SUPPORT</Link>
          </div>

          <div className="md:hidden text-2xl font-bold tracking-widest">ZOOX</div>

          <Link href="#" className="hidden md:block px-6 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded-full hover:bg-gray-700 transition">
            Get the App
          </Link>
          <div className="md:hidden w-12" />
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-20 px-6">
          <div className="space-y-4">
            {['How To Ride', 'Where to Ride', 'Know Your Ride', 'Support'].map((item) => (
              <Link
                key={item}
                href={item === 'Support' ? '/support' : '/'}
                onClick={() => setMenuOpen(false)}
                className="flex justify-between items-center w-full text-2xl py-4 border-b border-gray-200 hover:text-gray-600"
              >
                <span>{item}</span>
                <ChevronDown className="transform -rotate-90" size={28} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-600 mb-4">GET IN TOUCH</p>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">We’re here to help.</h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the issue you’d like us to address below.
        </p>
      </section>

      {/* Support Cards */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {[
            { title: "Share your feedback", desc: "We’d love to hear about your experience.", btn: "SHARE YOUR THOUGHTS" },
            { title: "Lose an item?", desc: "Left something behind? We’re on it.", btn: "REPORT LOST ITEM" },
            { title: "Submit a complaint", desc: "Something went wrong? Let us help.", btn: "REPORT AN ISSUE" },
          ].map((c, i) => (
            <div key={i} className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">{c.title}</h3>
              <p className="text-gray-600 mb-8">{c.desc}</p>
              <button className="px-8 py-3 bg-gray-800 text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-gray-700 transition">
                {c.btn}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-xs uppercase tracking-widest text-gray-600 mb-4">FIND OUT MORE</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              { q: "How do I join the waitlist?", a: "Download the Zoox app, create an account, and complete the survey we send you." },
              { q: "How will I know when I can ride?", a: "We’ll notify you via email and in the app when your account is activated." },
              { q: "What are the ride rules?", a: "No eating/drinking/smoking. Seatbelts required. Max 4 passengers." },
              { q: "When will Zoox come to my city?", a: "We’re currently in Las Vegas, San Francisco, and expanding soon. Join the newsletter for updates." },
            ].map((faq, i) => (
              <div key={i} className="bg-gray-800 text-white rounded-2xl overflow-hidden shadow-lg">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-gray-700 transition"
                >
                  <span className="text-lg font-medium pr-8">{faq.q}</span>
                  <ChevronDown className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`} size={28} />
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-6 text-gray-300 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
    <footer className="relative bg-black text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/car image.png" 
            alt="Footer Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Footer Content */}
        <div className="relative z-10 py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Navigation Links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-12 md:mb-16">
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Site Map</h4>
                <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                  <li><a href="#" className="hover:text-white transition-colors">How To Ride</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Where to Ride</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Know Your Ride</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Where to Ride</h4>
                <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                  <li><a href="#" className="hover:text-white transition-colors">Las Vegas</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">San Francisco</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Austin (Coming Soon)</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Miami (Coming Soon)</a></li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-2">
                <h4 className="font-semibold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Get Up To Speed</h4>
                <p className="text-gray-300 text-sm sm:text-base mb-4">
                  Sign up for our newsletter to see where we're headed next.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <input 
                    type="email" 
                    placeholder="Email Address *" 
                    className="flex-1 px-4 py-2 sm:py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                  />
                  <input 
                    type="text" 
                    placeholder="Zip Code *" 
                    className="w-full sm:w-32 px-4 py-2 sm:py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                  />
                </div>
                <button className="w-full sm:w-auto px-6 py-2 sm:py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 transition-colors text-sm sm:text-base font-medium">
                  JOIN THE NEWSLETTER
                </button>
                <p className="text-xs text-gray-400 mt-3">
                  By submitting, you give Zoox permission to store and process your personal information so we can provide you with the content you've requested. For more information, please see our{' '}
                  <a href="#" className="underline hover:text-white">privacy policy</a>.
                </p>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-white/20 pt-6 sm:pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
                  <a href="#" className="text-gray-300 hover:text-white transition-colors uppercase tracking-wider">Privacy Policy</a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors uppercase tracking-wider">Supply Chain Standards</a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors uppercase tracking-wider">Terms of Use</a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors uppercase tracking-wider">Manage Cookies</a>
                </div>
                <div className="flex gap-4 sm:gap-5">
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">SOCIALS</a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-xs sm:text-sm text-gray-400">
                  <p>Copyright Zoox, Inc. 2025</p>
                  <p>All Rights Reserved.</p>
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider">
                  ZOOX
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}