// app/page.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function ZooxSite() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="bg-white text-black font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-200 bg-opacity-95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-2 border-black rounded-lg hover:bg-gray-300 transition"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12 text-xs font-bold uppercase tracking-wider">
            <button onClick={() => scrollToSection('hero')} className="hover:text-gray-600 transition">How to Ride</button>
            <button onClick={() => scrollToSection('vehicle')} className="hover:text-gray-600 transition">Where to Ride</button>
            <div className="text-3xl font-bold tracking-widest mx-8">ZOOX</div>
            <button onClick={() => scrollToSection('technology')} className="hover:text-gray-600 transition">Know Your Ride</button>
            <Link href="/support" className="hover:text-gray-600 transition">Support</Link>
          </div>

          <div className="md:hidden text-2xl font-bold tracking-widest">ZOOX</div>

          <Link
            href="#"
            className="hidden md:block px-6 py-2 bg-gray-800 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-700 transition"
          >
            Get the App
          </Link>
          <div className="md:hidden w-12" />
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-20 px-6 overflow-y-auto">
          <div className="space-y-4 pb-10">
            {[
              { text: 'How To Ride', section: 'hero' },
              { text: 'Where to Ride', section: 'vehicle' },
              { text: 'Know Your Ride', section: 'technology' },
              { text: 'Support', href: '/support' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if ('href' in item && typeof item.href === 'string') {
                    window.location.href = item.href;
                  } else if ('section' in item && typeof item.section === 'string') {
                    scrollToSection(item.section);
                  }
                  setMenuOpen(false);
                }}
                className="flex w-full justify-between items-center text-2xl py-4 border-b border-gray-200 hover:text-gray-600 group"
              >
                <span>{item.text}</span>
                <ChevronDown className="transform -rotate-90 group-hover:translate-x-2 transition" size={28} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50">
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
          style={{ opacity: Math.max(0, 1 - scrollY / 600), transform: `translateY(${scrollY * 0.4}px)` }}
        >
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white drop-shadow-2xl mb-6">
            It's not a car.
          </h1>
          <p className="text-2xl sm:text-4xl lg:text-6xl text-white font-light drop-shadow-lg">
            It's a robotaxi designed around you.
          </p>
          <ChevronDown className="mx-auto mt-12 animate-bounce text-white" size={48} />
        </div>
      </section>

      {/* Full Width Image Section */}
      <section className="relative overflow-hidden">
        <div 
          className="h-[60vh] sm:h-[70vh] md:h-screen relative"
          style={{
            transform: `scale(${1 + scrollY * 0.0001})`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Image */}
          <div className="w-full h-full">
            <img src="/images/home.png" alt="Zoox Vehicle" className="w-full h-full object-cover" />
          </div>

          {/* Floating Text Overlay */}
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none px-4"
            style={{
              opacity: Math.max(0, 1 - (scrollY - 800) / 400)
            }}
          >
            <div className="text-center text-white bg-black bg-opacity-50 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl backdrop-blur-sm">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">Purpose-Built</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Details Section */}
      <section id="vehicle" className="py-12 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-20 md:mb-28 lg:mb-32">
            <div 
              className="space-y-4 sm:space-y-6"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 1200) / 300)),
                transform: `translateX(${Math.max(-50, -50 + (scrollY - 1200) / 10)}px)`
              }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Symmetrical by design
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                No front. No back. Our vehicle is bidirectional, allowing it to navigate city streets with unprecedented efficiency.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                Built from the ground up for autonomous driving, with no steering wheel or pedals. Every element serves the passenger experience.
              </p>
            </div>
            
            {/* Image */}
            <div 
              className="relative"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 1200) / 300)),
                transform: `translateX(${Math.max(50, 50 - (scrollY - 1200) / 10)}px)`
              }}
            >
              <div className="aspect-square bg-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img src="/images/side.webp" alt="Vehicle Side View" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Reverse Layout */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Video */}
            <div 
              className="relative order-2 md:order-1"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 1800) / 300)),
                transform: `translateX(${Math.max(-50, -50 + (scrollY - 1800) / 10)}px)`
              }}
            >
              <div className="aspect-video bg-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <video src="/videos/video2.mp4" controls className="w-full h-full object-cover" />
              </div>
            </div>

            <div 
              className="space-y-4 sm:space-y-6 order-1 md:order-2"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 1800) / 300)),
                transform: `translateX(${Math.max(50, 50 - (scrollY - 1800) / 10)}px)`
              }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Designed for comfort
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                Four seats facing each other create a social space for conversation and connection during your ride.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                Large sliding doors on both sides provide easy entry and exit, making every journey effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section with Parallax */}
      <section id="technology" className="relative py-12 sm:py-20 md:py-28 lg:py-32 overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <img src="/images/side.webp" alt="Tech background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-white">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-10 sm:mb-16 md:mb-20 text-center"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 2400) / 300))
            }}
          >
            Built for autonomy
          </h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {[
              { title: 'Sensor Suite', desc: 'Camera, lidar, and radar systems provide 360-degree awareness in all conditions.' },
              { title: 'AI Driving', desc: 'Machine learning models trained on millions of miles of real-world driving data.' },
              { title: 'Redundancy', desc: 'Multiple backup systems ensure safe operation even if primary systems fail.' }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="text-center"
                style={{
                  opacity: Math.min(1, Math.max(0, (scrollY - 2600 - idx * 100) / 300)),
                  transform: `translateY(${Math.max(30, 30 - (scrollY - 2600 - idx * 100) / 10)}px)`
                }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{item.title}</h3>
                <p className="text-gray-200 text-base sm:text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 sm:mb-12 md:mb-16 text-center">
            See it in action
          </h2>
          
          <div className="aspect-video bg-gray-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl relative">
            <video src="/videos/video2.mp4" controls className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Experience Gallery */}
      <section id="experience" className="py-12 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-10 sm:mb-16 md:mb-20 text-center">
            The ride experience
          </h2>

          {/* Image Gallery Grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
            <div className="aspect-square bg-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
              <img src="/images/interior.webp" alt="Interior View 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="aspect-square bg-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
              <img src="/images/side.webp" alt="Seating Layout" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="aspect-video bg-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
              <img src="/images/Las.webp" alt="Las Vegas" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="aspect-video bg-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
              <img src="/images/san.webp" alt="San Francisco" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="aspect-video bg-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
              <img src="/images/out view.webp" alt="Exterior View" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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