import React, { useMemo } from 'react';
import FoodCard from './FoodCard.jsx';
import { Search, X, Sparkles, Leaf } from 'lucide-react';

export default function FoodGrid({
  items,
  searchQuery,
  onSearchChange,
}) {
  // Filter by search query (name, description, options, ingredients)
  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return items;

    return items.filter((item) => {
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchBadge = item.badge?.toLowerCase().includes(q);
      const matchLabel = item.additionalLabel?.toLowerCase().includes(q);
      const matchCombo = item.comboItems?.some((c) =>
        c.toLowerCase().includes(q)
      );
      const matchOptions = item.options?.some(
        (opt) =>
          opt.label.toLowerCase().includes(q) ||
          opt.details?.toLowerCase().includes(q)
      );
      const matchIngredients = item.ingredients?.some((ing) =>
        ing.toLowerCase().includes(q)
      );
      const matchFilling = item.filling?.toLowerCase().includes(q);

      return (
        matchName ||
        matchDesc ||
        matchBadge ||
        matchLabel ||
        matchCombo ||
        matchOptions ||
        matchIngredients ||
        matchFilling
      );
    });
  }, [items, searchQuery]);

  return (
    <section id="menu-section" className="py-12 sm:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Menu Heading & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E8DFD3]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-widest text-[#D12F24] bg-rose-50 border border-rose-100 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D1A03A]" />
              <span>OUR MENU</span>
            </div>
            <h2 className="text-[32px] font-bold text-[#1A1A1A] tracking-tight">
              Traditional South Indian Favourites
            </h2>
            <p className="text-[16px] text-[#554D46] font-normal mt-2 leading-relaxed max-w-2xl">
              Wholesome traditional favourites, freshly prepared with authentic taste.
            </p>
          </div>

          {/* Clean Embedded Search & Wholesome Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-[#FAF5EE] border border-[#E8DFD3] text-[13px] font-semibold text-[#15803D]">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>100% Traditional &amp; Vegetarian</span>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="search-input-grid"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search menu..."
                className="w-full bg-white border border-[#E8DFD3] rounded-[10px] pl-9 pr-8 py-2.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888] focus:outline-none focus:border-[#D12F24]/40 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Responsive Food Grid */}
        {filteredItems.length > 0 ? (
          <div
            id="food-items-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        ) : (
          /* Clean Empty State */
          <div
            id="empty-food-state"
            className="bg-white rounded-[20px] border border-[#F0EDE6] p-12 text-center max-w-lg mx-auto my-8 shadow-xs"
          >
            <div className="w-16 h-16 rounded-full bg-rose-50 text-[#D12F24] flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-rose-500" />
            </div>
            <h3 className="text-[20px] font-semibold text-[#1C1917] mb-2">
              No dishes found
            </h3>
            <p className="text-[15px] text-stone-500 mb-6">
              We couldn't find anything matching "{searchQuery}".
            </p>
            <div className="bg-[#FAF7F2] p-4 rounded-[12px] border border-[#E8DFD3] text-stone-600 text-[14px] mb-6">
              <span className="font-semibold text-stone-700 block mb-1">Try searching for:</span>
              <div className="flex flex-wrap gap-2 justify-center pt-1">
                {['Puttu', 'Kadala Curry', 'Idiyappam', 'Paniyaram', 'Bozhi', 'Chapati'].map((term) => (
                  <button
                    key={term}
                    onClick={() => onSearchChange(term)}
                    className="px-3 py-1 rounded-[6px] bg-white border border-stone-200 text-[13px] hover:border-[#D12F24] hover:text-[#D12F24] transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => onSearchChange('')}
              className="px-6 py-2.5 rounded-[10px] bg-[#1A1A1A] hover:bg-[#D12F24] text-white font-semibold text-[14px] transition-colors"
            >
              Reset Search
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
