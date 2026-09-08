import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, 
  X, 
  Phone, 
  MapPin, 
  Sparkles 
} from 'lucide-react';

export default function Navbar({ 
  activeSection, 
  onNavigate
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Our Menu', id: 'menu' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      id="main-header" 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled 
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)]' 
          : 'bg-[#FAF7F2]/85 backdrop-blur-sm'
      }`}
    >
      {/* Top micro-bar */}
<div className="bg-[#1A1A1A] text-[#FDFCFB] text-[13px] py-1.5 px-4 hidden md:block">
  <div className="max-w-7xl mx-auto relative flex items-center justify-between">

    {/* Left message */}
    <div className="flex items-center">
      <span className="flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-[#D1A03A]" />
        <span>Traditional South Indian Taste • Freshly Prepared Daily</span>
      </span>
    </div>

    {/* True center message */}
    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 text-stone-300 whitespace-nowrap">
      <MapPin className="w-3.5 h-3.5 text-[#D12F24]" />
      <span>Ayyan Snacks Spot • Authentic & Wholesome</span>
    </div>

    {/* Right phone */}
    <div className="flex items-center text-stone-300">
      <a
        href="tel:+918072431120"
        className="hover:text-white flex items-center gap-1 transition-colors"
      >
        <Phone className="w-3 h-3 text-emerald-400" />
        <span>+91 8072431120</span>
      </a>
    </div>

  </div>
</div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[80px]">
          
          {/* Logo with Ayyan Snacks Spot branding */}
          <div 
            id="brand-logo" 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img
                src="/ayyan_logo_coin.jpg"
                alt="AYYAN SNACKS SPOT"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] sm:text-[19px] font-bold tracking-tight text-[#1A1A1A] leading-tight">
                AYYAN <span className="text-[#D12F24]">SNACKS SPOT</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#8C6030] tracking-widest uppercase">
                SINCE 2000
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-[16px] transition-colors cursor-pointer relative py-1 ${
                    isActive ? 'text-[#1A1A1A] font-semibold' : 'text-[#666] font-normal hover:text-[#D12F24]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D12F24] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-[10px] flex items-center justify-center text-stone-700 hover:bg-[#F5F1EE] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-panel" className="md:hidden bg-white border-b border-[#F2EDE9] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-[16px] font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-rose-50 text-[#D12F24] font-semibold'
                    : 'text-[#1A1A1A] hover:bg-[#F5F1EE]'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#F2EDE9] flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2 text-[13px] text-[#666] pt-1">
              <Phone className="w-3.5 h-3.5 text-[#D12F24]" />
              <span>Direct kitchen: +91 8072431120</span>
            </div>
          </div>
        </div>
      )}

      {/* Subtle Animated Bottom Line with Traveling Highlight */}
      <div 
        id="navbar-bottom-border" 
        className="relative w-full h-[1.5px] bg-[#E8E0D5] overflow-hidden"
      >
        <div className="navbar-highlight-glow" />
      </div>
    </header>
  );
}
