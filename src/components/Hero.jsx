import React, { useState } from 'react';
import { Flame, Clock, Star, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { HEALTHY_COMBO_ITEM } from '../data/foodData.js';

export default function Hero({ onViewMenu, onExploreStory, onOrderNow, onExploreMenu, onPreBook }) {
  const [currentSlide, setCurrentSlide] = useState(0); // 0 = Regular Hero, 1 = Diwali Hero

  const handleViewMenu = onViewMenu || onOrderNow;
  const handleExploreStory = onExploreStory || onExploreMenu;
  const handlePreBookOrder = onPreBook || onViewMenu || onOrderNow;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <section id="hero-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 relative">
      <div className="bg-[#FAF7F2]/85 backdrop-blur-sm rounded-[24px] border border-[#E8E0D5] overflow-hidden p-5 sm:p-10 lg:p-14 shadow-sm relative">
        
        {/* Left-Side Center Toggle Arrow Button */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-[45%] -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 border border-[#E8E0D5] shadow-md flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 cursor-pointer group"
          title="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        {/* Right-Side Center Toggle Arrow Button (Reduced Size) */}
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-[45%] -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 border border-[#E8E0D5] shadow-md flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 cursor-pointer group"
          title="Next Slide"
        >
          <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        {/* SLIDE 0: Regular Hero Content */}
        {currentSlide === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-opacity duration-300 px-2 sm:px-0">
            
            <div className="lg:col-span-7 flex flex-col items-start gap-4 pr-6 sm:pr-0">
              <span className="text-[#D12F24] font-semibold text-[13px] sm:text-[14px] uppercase tracking-widest flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#D12F24] shrink-0" />
                <span>The Authentic Taste with Healthy mixed menu you must try</span>
              </span>

              <h1 className="text-[32px] sm:text-[46px] lg:text-[56px] font-bold leading-[1.1] tracking-tight text-[#1A1A1A]">
                AYYAN HEALTHY SPOT'S <br />
                <span className="text-[#D12F24] italic">{HEALTHY_COMBO_ITEM.name}.</span>
              </h1>

              <p className="text-[15px] sm:text-[16px] text-[#555] max-w-[460px] leading-relaxed">
                Discover wholesome South Indian favourites thoughtfully combined into delicious, healthy combos. Traditional flavours, fresh preparation, and goodness in every bite
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                <button
                  id="btn-hero-view-menu"
                  onClick={handleViewMenu}
                  className="w-full sm:w-auto bg-[#1A1A1A] text-white px-8 h-[52px] rounded-[10px] text-[16px] font-semibold hover:bg-black transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>View Menu</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="btn-hero-our-story"
                  onClick={handleExploreStory}
                  className="w-full sm:w-auto bg-transparent border border-[#1A1A1A] text-[#1A1A1A] px-8 h-[52px] rounded-[10px] text-[16px] font-semibold hover:bg-white transition-colors text-center cursor-pointer"
                >
                  Our Story
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-5 border-t border-[#E8E0D5] w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mt-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-[8px] bg-white border border-[#E8E0D5] text-amber-600 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#1A1A1A]">Since 2000</div>
                    <div className="text-[12px] text-[#777]">26 Yrs of Trust</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-[8px] bg-white border border-[#E8E0D5] text-emerald-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#1A1A1A]">Fresh Daily</div>
                    <div className="text-[12px] text-[#777]">Morning &amp; Evening</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-[8px] bg-white border border-[#E8E0D5] text-[#D12F24] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#D12F24]" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#1A1A1A]">100% Authentic</div>
                    <div className="text-[12px] text-[#777]">Traditional Taste</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex items-center justify-center py-4 lg:py-0">
              <div className="relative flex items-center justify-center w-[280px] h-[280px] sm:w-[420px] sm:h-[420px]">
                <div className="absolute w-[270px] h-[270px] sm:w-[400px] sm:h-[400px] bg-[#EBE4DA] rounded-full" />

                <button
                  type="button"
                  onClick={handleViewMenu}
                  title="View Healthy Combo in Menu"
                  className="relative z-10 w-[220px] h-[220px] sm:w-[340px] sm:h-[340px] bg-[#D1D1D1] rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-8 border-white group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#222] to-transparent opacity-10 z-10 pointer-events-none" />
                  <img
                    src={HEALTHY_COMBO_ITEM.image}
                    alt={HEALTHY_COMBO_ITEM.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                </button>

                <button
                  type="button"
                  onClick={handleViewMenu}
                  className="absolute top-2 right-0 sm:right-2 bg-white rounded-[14px] p-2.5 sm:p-3 shadow-lg border border-[#F2EDE9] flex items-center gap-2.5 z-20 hover:scale-[1.02] transition-all cursor-pointer text-left"
                >
                  <div className="w-8 h-8 rounded-[8px] bg-rose-50 text-[#D12F24] flex items-center justify-center font-bold text-[14px]">
                    ✨
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#888] font-bold">Featured</div>
                    <div className="text-[13px] font-bold text-[#1A1A1A]">{HEALTHY_COMBO_ITEM.name}</div>
                  </div>
                </button>

                <div className="absolute bottom-2 left-0 sm:left-2 bg-white rounded-[14px] p-2.5 sm:p-3 shadow-lg border border-[#F2EDE9] flex items-center gap-2.5 z-20">
                  <div className="w-8 h-8 rounded-[8px] bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[14px]">
                    ★
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#888] font-bold">Traditional</div>
                    <div className="text-[13px] font-bold text-[#1A1A1A]">Fresh & Steamed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 1: Diwali Pre-Booking Hero Content */}
        {currentSlide === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-opacity duration-300 px-2 sm:px-0">
            
            <div className="lg:col-span-7 flex flex-col items-start gap-4 pr-6 sm:pr-0">
              <span className="text-[#D12F24] font-semibold text-[13px] sm:text-[14px] uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D12F24] shrink-0" />
                <span>Diwali Festival Special Pre-Orders Open</span>
              </span>

              <h1 className="text-[32px] sm:text-[46px] lg:text-[56px] font-bold leading-[1.1] tracking-tight text-[#1A1A1A]">
                CELEBRATE DIWALI <br />
                <span className="text-[#D12F24] italic">WITH US.</span>
              </h1>

              <p className="text-[15px] sm:text-[16px] text-[#555] max-w-[460px] leading-relaxed">
                Enjoy authentic, freshly prepared traditional sweet pieces this Diwali. Pre-book your favorite sweets today!
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                <button
                  id="btn-hero-pre-book"
                  onClick={handlePreBookOrder}
                  className="w-full sm:w-auto bg-[#D12F24] text-white px-8 h-[52px] rounded-[10px] text-[16px] font-semibold hover:bg-[#b8251b] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>PRE BOOK YOUR ORDER</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="btn-hero-our-story"
                  onClick={handleExploreStory}
                  className="w-full sm:w-auto bg-transparent border border-[#1A1A1A] text-[#1A1A1A] px-8 h-[52px] rounded-[10px] text-[16px] font-semibold hover:bg-white transition-colors text-center cursor-pointer"
                >
                  Our Story
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-5 border-t border-[#E8E0D5] w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mt-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-[8px] bg-white border border-[#E8E0D5] text-amber-600 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#1A1A1A]">Since 2000</div>
                    <div className="text-[12px] text-[#777]">26 Yrs of Trust</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-[8px] bg-white border border-[#E8E0D5] text-emerald-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#1A1A1A]">Fresh Daily</div>
                    <div className="text-[12px] text-[#777]">Morning &amp; Evening</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-[8px] bg-white border border-[#E8E0D5] text-[#D12F24] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#D12F24]" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#1A1A1A]">100% Authentic</div>
                    <div className="text-[12px] text-[#777]">Traditional Taste</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex items-center justify-center py-4 lg:py-0">
              <div className="relative flex items-center justify-center w-[280px] h-[280px] sm:w-[420px] sm:h-[420px]">
                <div className="absolute w-[270px] h-[270px] sm:w-[400px] sm:h-[400px] bg-[#EBE4DA] rounded-full" />

                <button
                  type="button"
                  onClick={handlePreBookOrder}
                  title="Pre-Book Sweet Pieces"
                  className="relative z-10 w-[220px] h-[220px] sm:w-[340px] sm:h-[340px] bg-[#D1D1D1] rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-8 border-white group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#222] to-transparent opacity-10 z-10 pointer-events-none" />
                  <img
                    src={HEALTHY_COMBO_ITEM.image}
                    alt="Diwali Special Sweets"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                </button>

                <div className="absolute top-2 right-0 sm:right-2 bg-white rounded-[14px] p-2.5 sm:p-3 shadow-lg border border-[#F2EDE9] flex items-center gap-2.5 z-20">
                  <div className="w-8 h-8 rounded-[8px] bg-rose-50 text-[#D12F24] flex items-center justify-center font-bold text-[14px]">
                    🪔
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#888] font-bold">Diwali Special</div>
                    <div className="text-[13px] font-bold text-[#1A1A1A]">Sweet Pieces Open</div>
                  </div>
                </div>

                <div className="absolute bottom-2 left-0 sm:left-2 bg-white rounded-[14px] p-2.5 sm:p-3 shadow-lg border border-[#F2EDE9] flex items-center gap-2.5 z-20">
                  <div className="w-8 h
                  
