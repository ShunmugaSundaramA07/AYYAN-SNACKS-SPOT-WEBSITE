import React, { useState, useEffect, useRef } from 'react';
import SplashScreen from './components/SplashScreen.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import FoodGrid from './components/FoodGrid.jsx';
import AboutSection from './components/AboutSection.jsx';
import Footer from './components/Footer.jsx';
import { FOOD_ITEMS } from './data/foodData.js';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef(null);

  // Scroll spy with IntersectionObserver to automatically update active navbar item
  useEffect(() => {
    const sectionIds = [
      { id: 'hero-section', name: 'home' },
      { id: 'menu-section', name: 'menu' },
      { id: 'about-section', name: 'about' },
      { id: 'contact-section', name: 'contact' },
    ];

    const sectionVisibility = {};

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -40% 0px',
      threshold: [0, 0.15, 0.35, 0.6],
    };

    const observer = new IntersectionObserver((entries) => {
      if (isNavigatingRef.current) return;

      entries.forEach((entry) => {
        sectionVisibility[entry.target.id] = {
          isIntersecting: entry.isIntersecting,
          ratio: entry.intersectionRatio,
        };
      });

      // Edge condition: top of page is always home
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      // Edge condition: bottom of page is always contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('contact');
        return;
      }

      // Active section is the intersecting section with highest visibility ratio
      const intersecting = sectionIds.filter((s) => sectionVisibility[s.id]?.isIntersecting);
      if (intersecting.length > 0) {
        intersecting.sort(
          (a, b) => (sectionVisibility[b.id]?.ratio || 0) - (sectionVisibility[a.id]?.ratio || 0)
        );
        setActiveSection(intersecting[0].name);
      }
    }, observerOptions);

    sectionIds.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Scroll listener for back-to-top button & top/bottom viewport edges
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      if (isNavigatingRef.current) return;

      if (window.scrollY < 100) {
        setActiveSection('home');
      } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  // Navigation smoothly scrolls to target sections without intermediate state flickering
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    isNavigatingRef.current = true;

    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }
    navigationTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 850);

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'menu' || sectionId === 'categories') {
      const el = document.getElementById('menu-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (sectionId === 'about') {
      const el = document.getElementById('about-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (sectionId === 'contact') {
      const el = document.getElementById('contact-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-transparent text-[#1A1A1A] relative"
      style={{
        backgroundImage: "url('/warm_cream_bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Cinematic Splash Screen Overlay */}
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}

      {/* Navigation Header */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Banner Section */}
        <Hero
          onViewMenu={() => handleNavigate('menu')}
          onExploreStory={() => handleNavigate('about')}
        />

        {/* Dynamic Food Grid with Clean Menu Heading */}
        <FoodGrid
          items={FOOD_ITEMS}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Subtle Animated Separator with Traveling Highlight */}
        <div 
          id="menu-about-separator" 
          className="relative w-full h-[1.5px] bg-[#E8E0D5] overflow-hidden"
          aria-hidden="true"
        >
          <div className="navbar-highlight-glow" />
        </div>

        {/* Kitchen Story, Philosophy & Contact Hub */}
        <AboutSection />
      </main>

      {/* Brand Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Smooth Back to Top Button */}
      {showBackToTop && (
        <button
          id="btn-back-to-top"
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-30 w-11 h-11 rounded-[10px] bg-white border border-[#E8E0D5] text-[#1A1A1A] shadow-md flex items-center justify-center hover:bg-[#FAF7F2] hover:text-[#D12F24] transition-all cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
