// app/page.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function ZooxSite() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile to reduce heavy parallax on low-end devices
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Reduced motion for mobile / prefers-reduced-motion
  const reducedMotion = isMobile || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  return (
    <div className="bg-white text-black font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-200 bg-opacity-95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex justify-between items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-2 border-black rounded-lg hover:bg-gray-300 transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-12 text-xs font-bold uppercase tracking-wider">
            <button onClick={() => scrollToSection('hero')} className="hover:text-gray-600 transition">How to Ride</button>
            <button onClick={() => scrollToSection('vehicle')} className="hover:text-gray-600 transition">Where to Ride</button>
            <div className="text-3xl lg:text-4xl font-bold tracking-widest mx-8">ZOOX</div>
            <button onClick={() => scrollToSection('technology')} className="hover:text-gray-600 transition">Know Your Ride</button>
            <Link href="/support" className="hover:text-gray-600 transition">Support</Link>
          </div>

          <div className="md:hidden text-2xl sm:text-3xl font-bold tracking-widest">ZOOX</div>

          <Link
            href="#"
            className="hidden md:block px-6 py-3 bg-gray-800 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-700 transition"
          >
            Get the App
          </Link>
          <div className="md:hidden w-12" />
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-20 px-6 overflow-y-auto">
          <div className="space-y-4 pb-20">
            {[
              { text: 'How To Ride', section: 'hero' },
              { text: 'Where to Ride', section: 'vehicle' },
              { text: 'Know Your Ride', section: 'technology' },
              { text: 'Support', href: '/support' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if ('href' in item && item.href) {
                    window.location.href = item.href;
                  } else {
                    scrollToSection(item.section!);
                  }
                  setMenuOpen(false);
                }}
                className="flex w-full justify-between items-center text-3xl sm:text-4xl py-5 border-b border-gray-200 hover:text-gray-600 group transition"
              >
                <span>{item.text}</span>
                <ChevronDown className="transform -rotate-90 group-hover:translate-x-3 transition" size={36} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">
        <video
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
          style={{
            opacity: reducedMotion ? 1 : Math.max(0, 1 - scrollY / 600),
            transform: reducedMotion ? 'none' : `translateY(${scrollY * 0.4}px)`,
          }}
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-white drop-shadow-2xl leading-tight">
            It's not a car.
          </h1>
          <p className="mt-6 text-2xl sm:text-4xl lg:text-6xl text-white font-light drop-shadow-lg">
            It's a robotaxi designed around you.
          </p>
          <ChevronDown className="mx-auto mt-16 animate-bounce text-white" size={56} />
        </div>
      </section>

      {/* Full Width Image Section */}
      <section className="relative overflow-hidden">
        <div 
          className="relative h-[70vh] sm:h-[80vh] md:h-screen"
          style={{
            transform: reducedMotion ? 'none' : `scale(${1 + scrollY * 0.00015})`,
          }}
        >
          <img src="/images/home.png" alt="Zoox Vehicle" className="w-full h-full object-cover" />
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none px-6"
            style={{
              opacity: Math.max(0, 1 - (scrollY - 800) / 500),
            }}
          >
            <div className="text-center text-white bg-black/60 px-8 py-6 rounded-2xl backdrop-blur-md">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">Purpose-Built</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Details Section */}
      <section id="vehicle" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Symmetrical by design */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
            <div 
              className="space-y-6 lg:space-y-8 order-2 md:order-1"
              style={{
                opacity: reducedMotion ? 1 : Math.min(1, Math.max(0, (scrollY - 1000) / 400)),
                transform: reducedMotion ? 'none' : `translateX(${Math.max(-80, -(scrollY - 1000) / 8)}px)`,
              }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Symmetrical by design
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed">
                No front. No back. Our vehicle is bidirectional, allowing it to navigate city streets with unprecedented efficiency.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed">
                Built from the ground up for autonomous driving, with no steering wheel or pedals. Every element serves the passenger experience.
              </p>
            </div>
            <div 
              className="order-1 md:order-2"
              style={{
                opacity: reducedMotion ? 1 : Math.min(1, Math.max(0, (scrollY - 1000) / 400)),
                transform: reducedMotion ? 'none' : `translateX(${Math.min(80, (scrollY - 1000) / 8)}px)`,
              }}
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img src="/images/side.webp" alt="Vehicle Side View" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Designed for comfort */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div 
              className="order-2 md:order-1"
              style={{
                opacity: reducedMotion ? 1 : Math.min(1, Math.max(0, (scrollY - 1600) / 400)),
                transform: reducedMotion ? 'none' : `translateX(${Math.max(-80, -(scrollY - 1600) / 8)}px)`,
              }}
            >
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <video src="/videos/video2.mp4" controls className="w-full h-full object-cover" />
              </div>
            </div>
            <div 
              className="space-y-6 lg:space-y-8 order-1 md:order-2"
              style={{
                opacity: reducedMotion ? 1 : Math.min(1, Math.max(0, (scrollY - 1600) / 400)),
                transform: reducedMotion ? 'none' : `translateX(${Math.min(80, (scrollY - 1600) / 8)}px)`,
              }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Designed for comfort
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed">
                Four seats facing each other create a social space for conversation and connection during your ride.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed">
                Large sliding doors on both sides provide easy entry and exit, making every journey effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="relative py-24 lg:py-40 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ transform: reducedMotion ? 'none' : `translateY(${scrollY * 0.35}px)` }}
        >
          <img src="/images/side.webp" alt="Tech background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-white">
          <h2 
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-center mb-20"
            style={{ opacity: reducedMotion ? 1 : Math.min(1, Math.max(0, (scrollY - 2400) / 500)) }}
          >
            Built for autonomy
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {[
              { title: 'Sensor Suite', desc: 'Camera, lidar, and radar systems provide 360-degree awareness in all conditions.' },
              { title: 'AI Driving', desc: 'Machine learning models trained on millions of miles of real-world driving data.' },
              { title: 'Redundancy', desc: 'Multiple backup systems ensure safe operation even if primary systems fail.' }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="text-center"
                style={{
                  opacity: reducedMotion ? 1 : Math.min(1, Math.max(0, (scrollY - 2600 - idx * 150) / 400)),
                  transform: reducedMotion ? 'none' : `translateY(${Math.max(40, 40 - (scrollY - 2600 - idx * 150) / 10)}px)`,
                }}
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="w-12 h-12 bg-white rounded-full" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-200 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-16">
            See it in action
          </h2>
          <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <video src="/videos/video2.mp4" controls className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Experience Gallery */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-center mb-16">
            The ride experience
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 mb-10">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
              <img src="/images/interior.webp" alt="Interior" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
              <img src="/images/side.webp" alt="Seating" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
            <div className="aspect-video rounded-3xl overflow-hidden shadow-xl">
              <img src="/images/Las.webp" alt="Las Vegas" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="aspect-video rounded-3xl overflow-hidden shadow-xl">
              <img src="/images/san.webp" alt="San Francisco" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="aspect-video rounded-3xl overflow-hidden shadow-xl">
              <img src="/images/out view.webp" alt="Exterior" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black text-white">
        <div className="absolute inset-0">
          <img src="/images/car image.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 py-16 lg:py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-16">
              {/* Site Map */}
              <div>
                <h4 className="font-semibold uppercase tracking-wider mb-4 text-sm">Site Map</h4>
                <ul className="space-y-3 text-gray-300">
                  {['How To Ride', 'Where to Ride', 'Know Your Ride', 'Support'].map((item) => (
                    <li key={item}><a href="#" className="hover:text-white transition">{item}</a></li>
                  ))}
                </ul>
              </div>

              {/* Where to Ride */}
              <div>
                <h4 className="font-semibold uppercase tracking-wider mb-4 text-sm">Where to Ride</h4>
                <ul className="space-y-3 text-gray-300">
                  <li><a href="#" className="hover:text-white transition">Las Vegas</a></li>
                  <li><a href="#" className="hover:text-white transition">San Francisco</a></li>
                  <li><a href="#" className="hover:text-white transition">Austin (Coming Soon)</a></li>
                  <li><a href="#" className="hover:text-white transition">Miami (Coming Soon)</a></li>
                </ul>
              </div>

              {/* Newsletter – takes full width on mobile */}
              <div className="col-span-2 lg:col-span-2">
                <h4 className="font-semibold uppercase tracking-wider mb-4 text-sm">Get Up To Speed</h4>
                <p className="text-gray-300 mb-6 max-w-lg">
                  Sign up for our newsletter to see where we're headed next.
                </p>
                <form className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <input type="email" placeholder="Email Address *" className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50" required />
                  <input type="text" placeholder="Zip Code *" className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50" required />
                  <button type="submit" className="px-6 py-3 bg-white/10 border border-white/30 rounded-lg hover:bg-white/20 transition font-medium">
                    JOIN THE NEWSLETTER
                  </button>
                </form>
                <p className="text-xs text-gray-400">
                  By submitting, you give Zoox permission to store and process your personal information. See our <a href="#" className="underline hover:text-white">privacy policy</a>.
                </p>
              </div>
            </div>

            <div className="border-t border-white/20 pt-8">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div className="text-xs sm:text-sm text-gray-400 text-center lg:text-left">
                  <p>Copyright © Zoox, Inc. 2025</p>
                  <p>All Rights Reserved.</p>
                </div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest">ZOOX</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}