"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, Play } from 'lucide-react';

export default function ZooxSite() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(index);
        }
      });
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold tracking-tight">ZOOX</div>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium">
            <button onClick={() => scrollToSection('hero')} className="hover:text-gray-600 transition-colors">Home</button>
            <button onClick={() => scrollToSection('vehicle')} className="hover:text-gray-600 transition-colors">Vehicle</button>
            <button onClick={() => scrollToSection('technology')} className="hover:text-gray-600 transition-colors">Technology</button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-gray-600 transition-colors">Experience</button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 sm:px-6 py-4 space-y-4">
            <button onClick={() => scrollToSection('hero')} className="block w-full text-left hover:text-gray-600 transition-colors">Home</button>
            <button onClick={() => scrollToSection('vehicle')} className="block w-full text-left hover:text-gray-600 transition-colors">Vehicle</button>
            <button onClick={() => scrollToSection('technology')} className="block w-full text-left hover:text-gray-600 transition-colors">Technology</button>
            <button onClick={() => scrollToSection('experience')} className="block w-full text-left hover:text-gray-600 transition-colors">Experience</button>
          </div>
        )}
      </nav>

      {/* Hero Section with Video Background */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50">
        {/* Video Background */}
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Hero Text Overlay */}
        <div 
          className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto"
          style={{ 
            opacity: Math.max(0, 1 - scrollY / 600),
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight text-white drop-shadow-lg">
            It's not a car.
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-8 sm:mb-12 text-white font-light drop-shadow-lg">
            It's a robotaxi designed around you.
          </p>
          
          <div className="inline-block">
            <ChevronDown 
              size={40}
              className="animate-bounce text-white drop-shadow-lg sm:w-12 sm:h-12"
            />
          </div>
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
      <footer className="bg-black text-white py-10 sm:py-14 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-10 md:mb-12">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">ZOOX</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                An Amazon company reimagining transportation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">News</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Technology</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Vehicle</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Autonomy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Connect</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-gray-500 text-xs sm:text-sm">
            <p>&copy; 2024 Zoox, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}