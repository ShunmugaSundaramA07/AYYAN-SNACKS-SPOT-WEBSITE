import React, { useState } from 'react';
import { Clock, Sparkles } from 'lucide-react';

export default function FoodCard({ item }) {
  const [selectedOption, setSelectedOption] = useState(
    item.hasOptions ? (item.defaultOption || item.options[0]?.id) : null
  );
  const [imgFailed, setImgFailed] = useState(false);

  // Active option label
  const activeOptionObj = item.hasOptions
    ? item.options?.find((o) => o.id === selectedOption) || item.options?.[0]
    : null;

  const currentImage = (item.hasOptions && activeOptionObj?.image) || item.image;

  const isSpecialFeatured = item.isFeatured || item.isCombo;

  return (
    <div
      id={`food-card-${item.id}`}
      className={`bg-[#FAF7F2]/90 backdrop-blur-xs rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border transition-all duration-300 ease-out flex flex-col justify-between group hover:scale-[1.015] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] motion-reduce:hover:scale-100 motion-reduce:transition-none ${
        isSpecialFeatured
          ? 'border-[#D12F24]/40 ring-1 ring-[#D12F24]/20 hover:border-[#D12F24]'
          : 'border-[#E8E0D5] hover:border-[#D1A03A]/50'
      }`}
    >
      <div>
        {/* Card Visual / Real Image or Clean Authentic Placeholder */}
        <div className="h-[170px] sm:h-[185px] rounded-[16px] overflow-hidden mb-4 bg-[#F2EAE0] relative border border-[#E8E0D5] flex items-center justify-center">
          {currentImage && !imgFailed ? (
            <img
              src={currentImage}
              alt={item.name}
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            /* Clean Authentic Placeholder (No generic AI stock photos) */
            <div className="w-full h-full bg-gradient-to-br from-[#FAF5EE] via-[#F3E9DA] to-[#E9DEC9] p-5 flex flex-col justify-between relative">
              {/* Subtle Coin Watermark */}
              <div className="absolute right-3 bottom-2 opacity-15 pointer-events-none">
                <img
                  src="/ayyan_logo_coin.jpg"
                  alt="AYYAN SNACKS SPOT"
                  className="w-20 h-20 rounded-full object-contain"
                />
              </div>

              <div className="flex items-center justify-between z-10">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#D12F24] bg-rose-50 border border-rose-100/80 px-2.5 py-0.5 rounded-full">
                  Traditional Taste
                </span>
                <span className="text-[11px] font-medium text-stone-500">
                  Since 2000
                </span>
              </div>

              <div className="z-10 text-center my-auto">
                <div className="text-[18px] sm:text-[20px] font-bold text-[#1A1A1A] leading-tight mb-1">
                  {item.name}
                </div>
                <div className="text-[12px] text-[#7A6E63] font-medium">
                  AYYAN SNACKS SPOT • Tirunelveli
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-600 z-10">
                <span className="flex items-center gap-1 font-semibold text-[#15803D]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Wholesome
                </span>
                <span className="text-stone-500 italic">Authentic Recipe</span>
              </div>
            </div>
          )}

          {/* Veg Indicator Badge */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-1 rounded-[6px] shadow-xs flex items-center justify-center z-20">
            <div
              title="100% Vegetarian"
              className="w-4 h-4 border border-emerald-600 flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-600" />
            </div>
          </div>

          {/* Featured Badge (Top Right) */}
          {item.badge && (
            <div className="absolute top-3 right-3 bg-[#D12F24] text-white px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 z-20 text-[11px] font-bold tracking-wide">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{item.badge}</span>
            </div>
          )}

          {/* Preparation Status Pill */}
          <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-[6px] bg-[#1A1A1A]/80 backdrop-blur-xs text-white text-[11px] font-medium flex items-center gap-1 z-20">
            <Clock className="w-3 h-3 text-amber-300" />
            <span>{item.prepTime}</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="mb-3">
          {item.additionalLabel && (
            <div className="text-[11px] sm:text-[12px] font-semibold text-[#D12F24] tracking-wide mb-1 flex items-center gap-1">
              <span>{item.additionalLabel}</span>
            </div>
          )}
          <h3 className="text-[20px] font-bold text-[#1A1A1A] leading-snug group-hover:text-[#D12F24] transition-colors mb-1.5">
            {item.name}
          </h3>
          <p className="text-[14px] text-[#554D46] font-normal leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Variants / Serving Choices UI */}
        {item.hasOptions && item.options && (
          <div className="mt-3 pt-3 border-t border-[#EDE4D8]">
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#D12F24] mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D1A03A]" />
              <span>
                {item.optionType === 'variant' ? 'Select Variant:' : 'Serving Choice:'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {item.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedOption(opt.id)}
                    className={`px-3 py-2 rounded-[10px] text-[13px] font-semibold border transition-all text-left flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                        : 'bg-white/80 text-[#2C241F] border-[#E8DFD3] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-white bg-[#D12F24]'
                          : 'border-stone-400 bg-transparent'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <span className="truncate">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Single-style specific badge (e.g., Sweet Bozhi filling or Idiyappam / Chapati combo) */}
        {!item.hasOptions && item.filling && (
          <div className="mt-3 pt-2.5 border-t border-[#EDE4D8] flex items-center gap-2">
            <span className="text-[12px] font-semibold text-[#6E645A]">Filling:</span>
            <span className="text-[12px] font-bold text-[#1A1A1A] bg-white px-2.5 py-0.5 rounded-full border border-[#E8DFD3]">
              {item.filling}
            </span>
          </div>
        )}

        {!item.hasOptions && item.ingredients && (
          <div className="mt-3 pt-2.5 border-t border-[#EDE4D8] flex flex-wrap items-center gap-1.5">
            <span className="text-[12px] font-semibold text-[#6E645A]">Includes:</span>
            {item.ingredients.map((ing, idx) => (
              <span
                key={idx}
                className="text-[12px] font-medium text-[#1A1A1A] bg-white px-2 py-0.5 rounded-md border border-[#E8DFD3]"
              >
                {ing}
              </span>
            ))}
          </div>
        )}

        {/* Combo Items Representation */}
        {item.comboItems && (
          <div className="mt-3 pt-2.5 border-t border-[#EDE4D8]">
            <span className="text-[12px] font-semibold text-[#6E645A] block mb-1.5">
              Traditional combination includes:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {item.comboItems.map((dish, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium text-[#1A1A1A] bg-white px-2 py-0.5 rounded-md border border-[#E8DFD3]"
                >
                  {dish}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Row: Balanced Informational Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#EDE4D8] mt-4">
        {item.isCombo ? (
          <span className="text-[12px] font-semibold text-[#8B5E3C] bg-amber-50/90 border border-amber-200/70 px-2.5 py-1 rounded-md flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D1A03A]" />
            <span>Featured Combo</span>
          </span>
        ) : (
          <span className="text-[12px] font-semibold text-[#15803D] bg-emerald-50/90 border border-emerald-200/60 px-2.5 py-1 rounded-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>Authentic Recipe</span>
          </span>
        )}
        <span className="text-[12px] text-stone-500 font-medium">
          Fresh Daily
        </span>
      </div>
    </div>
  );
}
