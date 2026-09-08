import React from 'react';
import { Heart, Leaf } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#1A1A1A] text-[#FDFCFB] pt-14 pb-8 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#262626]">

          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">

            {/* Logo + Brand Name */}
            <div className="flex items-center gap-3">
              <img
                src="/ayyan_logo_coin.jpg"
                alt="AYYAN SNACKS SPOT Logo"
                className="w-12 h-12 object-contain rounded-full"
              />

              <div>
                <span className="text-[24px] font-bold text-[#D12F24] tracking-tight">
                  AYYAN<span className="text-white"> SNACKS SPOT</span>
                </span>

                <p className="text-[11px] font-semibold tracking-[0.15em] text-stone-400">
                  SINCE 2000
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-[14px] text-stone-400 max-w-sm leading-relaxed">
              Serving traditional South Indian favourites with authentic taste,
              wholesome choices, and freshly prepared food. Bringing the goodness
              of traditional flavours to every meal.
            </p>

            {/* Brand Values */}
            <div className="flex items-center gap-2 text-[13px] text-emerald-400">
              <Leaf className="w-4 h-4" />
              <span>Traditional • Wholesome • Freshly Prepared</span>
            </div>

          </div>


          {/* Explore */}
          <div className="md:col-span-3 space-y-3">

            <h4 className="text-[16px] font-bold text-white">
              Explore
            </h4>

            <ul className="space-y-2 text-[14px] text-stone-400">

              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Menu
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Categories
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>

          </div>


          {/* Our Specialities */}
          <div className="md:col-span-4 space-y-3">

            <h4 className="text-[16px] font-bold text-white">
              Our Specialities
            </h4>

            <ul className="space-y-2 text-[14px] text-stone-400">

              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kuzhi Paniyaram
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Poli
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Samba Puttu
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  White & Keppai Puttu
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Idiyappam & Kadala Curry
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Chapathi & Kadala Curry
                </button>
              </li>

            </ul>

          </div>

        </div>


        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[13px] text-stone-500 gap-4">

          <p>
            © {new Date().getFullYear()} AYYAN SNACKS SPOT. All rights reserved.
          </p>

          <p className="flex items-center gap-1">
            <span>Made with</span>

            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />

            <span>for traditional food lovers</span>
          </p>

        </div>

      </div>
    </footer>
  );
}