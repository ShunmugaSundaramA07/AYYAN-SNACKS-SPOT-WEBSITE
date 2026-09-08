import React from 'react';
import { Flame, Clock, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { HEALTHY_COMBO_ITEM } from '../data/foodData.js';

export default function Hero({ onViewMenu, onExploreStory, onOrderNow, onExploreMenu }) {
  const handleViewMenu = onViewMenu || onOrderNow;
  const handleExploreStory = onExploreStory || onExploreMenu;

  return (
    <section id="hero-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10">
      <div className="bg-[#FAF7F2]/85 backdrop-blur-sm rounded-[24px] border border-[#E8E0D5] overflow-hidden p-6 sm:p-10 lg:p-14 shadow-sm">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bold Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            
            {/* Small Brand Eyebrow Statement */}
            <span className="text-[#D12F24] font-semibold text-[14px] uppercase tracking-widest flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#D12F24]" />
              The Authentic Taste with Healthy mixed menu you must try
            </span>

            {/* Huge Bold Headline from Bold Typography theme */}
            <h1 className="text-[36px] sm:text-[46px] lg:text-[56px] font-bold leading-[1.1] tracking-tight text-[#1A1A1A]">
              AYYAN HEALTHY SPOT'S <br />
              <span className="text-[#D12F24] italic">{HEALTHY_COMBO_ITEM.name}.</span>
            </h1>

            {/* Short Description */}
            <p className="text-[16px] text-[#555] max-w-[460px] leading-relaxed">
              Discover wholesome South Indian favourites thoughtfully combined into delicious, healthy combos. Traditional flavours, fresh preparation, and goodness in every bite
            </p>

            {/* CTA Hierarchy */}
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

            {/* Trust Badges in Bold Typography theme */}
            <div className="pt-5 border-t border-[#E8E0D5] w-full grid grid-cols-3 gap-3 sm:gap-6 mt-2">
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

          {/* Right Column: Circular Layered Food Imagery (Design Spec) */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-4 lg:py-0">
            <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[420px] sm:h-[420px]">
              
              {/* Outer circular ambient ring from Bold Typography design */}
              <div className="absolute w-[290px] h-[290px] sm:w-[400px] sm:h-[400px] bg-[#EBE4DA] rounded-full" />

              {/* Inner Circular Food Frame with 8px white border */}
              <button
                type="button"
                onClick={handleViewMenu}
                title="View Healthy Combo in Menu"
                className="relative z-10 w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] bg-[#D1D1D1] rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-8 border-white group cursor-pointer"
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

              {/* Floating Badge 1: Top Right */}
              <button
                type="button"
                onClick={handleViewMenu}
                title="View Healthy Combo in Menu"
                className="absolute top-2 -right-2 sm:right-2 bg-white rounded-[14px] p-2.5 sm:p-3 shadow-lg border border-[#F2EDE9] flex items-center gap-2.5 z-20 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out cursor-pointer text-left motion-reduce:hover:scale-100"
              >
                <div className="w-8 h-8 rounded-[8px] bg-rose-50 text-[#D12F24] flex items-center justify-center font-bold text-[14px]">
                  ✨
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#888] font-bold">Featured</div>
                  <div className="text-[13px] font-bold text-[#1A1A1A]">{HEALTHY_COMBO_ITEM.name}</div>
                </div>
              </button>

              {/* Floating Badge 2: Bottom Left */}
              <div className="absolute bottom-2 -left-2 sm:left-2 bg-white rounded-[14px] p-2.5 sm:p-3 shadow-lg border border-[#F2EDE9] flex items-center gap-2.5 z-20 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out motion-reduce:hover:scale-100">
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

      </div>
    </section>
  );
}
