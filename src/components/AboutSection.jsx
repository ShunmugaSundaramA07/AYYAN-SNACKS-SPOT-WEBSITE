import React, { useState } from 'react';
import { Utensils, Heart, Clock, ShieldCheck, MapPin, Phone, Award } from 'lucide-react';
import ContactQueryForm from './ContactQueryForm';

export default function AboutSection() {
  const candidateImages = [
    '/founder.png',
    '/founder_AYYAN SNACKS SPOT.png',
    '/founder_ayyan.png',
    '/founder.jpg',
    '/founder.jpeg'
  ];

  const [imgIndex, setImgIndex] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  const handleImgError = () => {
    if (imgIndex < candidateImages.length - 1) {
      setImgIndex(prev => prev + 1);
    } else {
      setImgFailed(true);
    }
  };

  const featureCards = [
    {
      icon: Utensils,
      title: 'Traditional Taste',
      desc: 'Authentic South Indian favourites inspired by traditional flavours and food culture.',
    },
    {
      icon: Heart,
      title: 'Wholesome Choices',
      desc: 'Traditional food made with a focus on wholesome and satisfying choices.',
    },
    {
      icon: Clock,
      title: 'Freshly Prepared',
      desc: 'Freshly prepared food served with care and attention to quality.',
    },
    {
      icon: ShieldCheck,
      title: '27 Years of Trust',
      desc: 'Serving customers since 1999 with consistency, dedication and a passion for traditional food.',
    },
  ];

  return (
    <>
      <section id="about-section" className="py-14 sm:py-20 bg-[#FAF7F2]/80 backdrop-blur-xs scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header: Our Story Intro */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-[14px] font-bold uppercase tracking-widest text-[#D12F24] bg-rose-50 px-3 py-1 rounded-full inline-block mb-3 border border-rose-100">
            OUR STORY
          </span>
          <h2 className="text-[32px] font-bold text-[#1A1A1A] tracking-tight mb-4">
            27 Years of Tradition, Taste &amp; Trust
          </h2>
          <p className="text-[16px] text-[#2C241F] font-normal leading-relaxed">
            Since 1999, AYYAN SNACKS SPOT has been serving traditional South Indian favourites with a passion for authentic taste and wholesome food. What began with a simple love for traditional flavours has grown into a journey built on quality, consistency and the trust of our customers.
          </p>
        </div>

        {/* Founder Section (Two-column on desktop, stacked on mobile) */}
        <div className="relative group mb-16 transition-transform duration-500 ease-out hover:scale-[1.01] motion-reduce:hover:scale-100">
          {/* Ambient brand glow along the border, elevated on hover */}
          <div
            className="absolute -inset-[2px] rounded-[26px] query-form-glow opacity-30 group-hover:opacity-75 blur-[10px] transition-opacity duration-500 pointer-events-none -z-10"
            aria-hidden="true"
          />

          {/* Refined Animated Warm-Gold & Deep-Red Shimmering Border Frame */}
          <div className="relative p-[2px] rounded-[26px] query-form-animated-border shadow-[0_4px_24px_-4px_rgba(40,20,10,0.06),0_2px_8px_-2px_rgba(40,20,10,0.04)] group-hover:shadow-[0_16px_36px_-6px_rgba(209,47,36,0.18),0_8px_24px_-4px_rgba(209,160,58,0.22)] transition-shadow duration-500">
            {/* Inner Founder Content Card */}
            <div className="bg-[#F5EDE2] rounded-[24px] p-6 sm:p-10 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Founder Image Column */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-[340px] sm:max-w-[380px] p-2.5 bg-[#ffffff] rounded-[24px] shadow-[0_16px_40px_rgba(44,36,31,0.08)] border border-[#ffffff]">
                    <div className="relative w-full aspect-[3/4] rounded-[20px] overflow-hidden bg-[#EAE2D5] flex items-center justify-center">
                      {!imgFailed ? (
                        <img
                          src="/founder.png"
                          alt="Founder & Driving Force Behind AYYAN SNACKS SPOT"
                          referrerPolicy="no-referrer"
                          onError={handleImgError}
                          className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center h-full">
                          <img
                            src="/ayyan_official_logo.jpg"
                            alt="AYYAN SNACKS SPOT"
                            referrerPolicy="no-referrer"
                            className="w-28 h-28 rounded-full shadow-md mb-4 border-2 border-white"
                          />
                          <span className="text-[14px] font-bold text-[#1A1A1A]">Founder &amp; Driving Force</span>
                          <span className="text-[12px] text-[#776E65]">AYYAN SNACKS SPOT • Since 1999</span>
                        </div>
                      )}
                      
                      {/* Subtle Founder Badge Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 bg-[#1A1A1A]/85 backdrop-blur-md rounded-[12px] p-2.5 border border-white/10 text-white flex items-center justify-between z-10">
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">AYYAPAN S</div>
                          <div className="text-[13px] font-semibold">FOUNDER - AYYAN SNACKS SPOT</div>
                        </div>
                        <span className="text-[11px] font-medium bg-white/15 px-2 py-0.5 rounded-full text-stone-200 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#D12F24]" />
                          Tirunelveli
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Founder Story Column */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <span className="text-[14px] font-bold uppercase tracking-wider text-[#D12F24] mb-2">
                    Meet Our Founder
                  </span>
                  <h3 className="text-[24px] sm:text-[28px] font-bold text-[#1A1A1A] tracking-tight mb-2">
                    Founder &amp; Driving Force Behind AYYAN SNACKS SPOT
                  </h3>
                  <p className="text-[16px] text-[#2C241F] font-normal leading-relaxed mb-6">
                    For 26 years, our founder has been at the heart of AYYAN SNACKS SPOT, carrying forward a passion for traditional South Indian food and authentic flavours. With dedication and consistency, he has helped build the shop around a simple belief — good food should be wholesome, freshly prepared and true to its roots.
                  </p>

                  {/* Highlight Box: 27 Years of Experience / Since 1999 */}
                  <div className="inline-flex items-center gap-6 p-4 sm:p-5 bg-white rounded-[16px] border border-[#E8DFD3] shadow-xs w-fit hover:scale-[1.015] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out motion-reduce:hover:scale-100">
                    <div className="flex items-center gap-3">
                      <span className="text-[32px] font-bold text-[#D12F24] leading-none">26+</span>
                      <div className="border-l border-stone-200 pl-3">
                        <div className="text-[14px] font-bold text-[#1A1A1A] leading-tight">Years of Experience</div>
                        <div className="text-[13px] text-[#776E65]">Serving Traditional Taste</div>
                      </div>
                    </div>
                    <div className="border-l border-stone-200 pl-6 flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#D1A03A]" />
                      <span className="text-[14px] font-bold text-[#1A1A1A]">Since 1999</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Our Philosophy Section */}
        <div className="relative group max-w-3xl mx-auto mb-16 transition-transform duration-500 ease-out hover:scale-[1.01] motion-reduce:hover:scale-100">
          {/* Ambient brand glow along the border, elevated on hover */}
          <div
            className="absolute -inset-[2px] rounded-[22px] query-form-glow opacity-30 group-hover:opacity-75 blur-[10px] transition-opacity duration-500 pointer-events-none -z-10"
            aria-hidden="true"
          />

          {/* Refined Animated Warm-Gold & Deep-Red Shimmering Border Frame */}
          <div className="relative p-[2px] rounded-[22px] query-form-animated-border shadow-[0_4px_24px_-4px_rgba(40,20,10,0.06),0_2px_8px_-2px_rgba(40,20,10,0.04)] group-hover:shadow-[0_16px_36px_-6px_rgba(209,47,36,0.18),0_8px_24px_-4px_rgba(209,160,58,0.22)] transition-shadow duration-500">
            {/* Inner Philosophy Content Card */}
            <div className="bg-[#FAF6F0] rounded-[20px] p-6 sm:p-8 text-center relative overflow-hidden">
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#D12F24] bg-rose-50 px-3 py-1 rounded-full inline-block mb-3 border border-rose-100">
                OUR PHILOSOPHY
              </span>
              <p className="text-[16px] sm:text-[18px] text-[#2C241F] font-medium leading-relaxed italic">
                &quot;At AYYAN SNACKS SPOT, we believe that traditional food is more than just a meal — it is a part of our everyday life and heritage. Our aim is to bring wholesome, traditional favourites to our customers while keeping the authentic taste at the heart of everything we serve.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                id={`feature-card-${idx}`}
                className="relative group cursor-pointer h-full transition-transform duration-500 ease-out hover:scale-[1.015] motion-reduce:hover:scale-100"
              >
                {/* Ambient brand glow along the border, elevated on hover */}
                <div
                  className="absolute -inset-[2px] rounded-[22px] query-form-glow opacity-25 group-hover:opacity-75 blur-[8px] transition-opacity duration-500 pointer-events-none -z-10"
                  aria-hidden="true"
                />

                {/* Refined Animated Warm-Gold & Deep-Red Shimmering Border Frame */}
                <div className="relative p-[2px] rounded-[22px] h-full query-form-animated-border shadow-[0_4px_20px_-4px_rgba(40,20,10,0.06),0_2px_8px_-2px_rgba(40,20,10,0.04)] group-hover:shadow-[0_12px_28px_-6px_rgba(209,47,36,0.18),0_6px_20px_-4px_rgba(209,160,58,0.2)] transition-shadow duration-500">
                  {/* Inner Card Content */}
                  <div className="bg-[#F9F5F0] p-6 rounded-[20px] h-full flex flex-col items-start relative overflow-hidden">
                    <div className="w-12 h-12 rounded-[10px] bg-white text-[#D12F24] border border-[#F2EDE9] flex items-center justify-center mb-4 shadow-xs">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[14px] text-[#554D46] font-normal leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>

    {/* Contact Section */}
    <section id="contact-section" className="py-14 sm:py-20 bg-[#FAF7F2]/80 backdrop-blur-xs border-t border-[#E8E0D5]/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Kitchen Location & Hours Banner */}
        <div className="bg-[#1A1A1A] text-white rounded-[20px] p-8 sm:p-10 relative overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            
            <div className="flex items-start gap-4 p-4 rounded-[16px] bg-white/[0.04] border border-white/5 hover:border-white/20 hover:scale-[1.015] hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out motion-reduce:hover:scale-100">
              <div className="w-10 h-10 rounded-[10px] bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-white mb-1">Hours</h4>
                <p className="text-[14px] text-stone-300">Monday – Sunday</p>
                <p className="text-[14px] text-stone-300">Morning 5:00 AM – 9:30 AM</p>
                <p className="text-[14px] text-stone-300">Evening 5:00 PM – 9:30 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-[16px] bg-white/[0.04] border border-white/5 hover:border-white/20 hover:scale-[1.015] hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out motion-reduce:hover:scale-100">
              <div className="w-10 h-10 rounded-[10px] bg-white/10 flex items-center justify-center shrink-0 text-rose-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-white mb-1">AYYAN SNACKS SPOT</h4>
                <p className="text-[14px] text-stone-300">Authentic South Indian Traditional Spot</p>
                <p className="text-[14px] text-stone-300">Tirunelveli-Town • Palayamkottai</p>
              </div>
            </div>

            <a
              href="tel:+918072431120"
              className="flex items-start gap-4 p-4 rounded-[16px] bg-white/[0.04] border border-white/5 hover:border-white/20 hover:scale-[1.015] hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out cursor-pointer group motion-reduce:hover:scale-100"
            >
              <div className="w-10 h-10 rounded-[10px] bg-white/10 flex items-center justify-center shrink-0 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">Direct Helpline</h4>
                <p className="text-[14px] text-stone-300 group-hover:text-white transition-colors">+91 8072431120</p>
                <p className="text-[14px] text-stone-300 group-hover:text-white transition-colors">ayyansnacksspottvl@gmail.com</p>
                <p className="text-[13px] text-stone-400">Freshly Prepared Daily</p>
              </div>
            </a>

          </div>
        </div>

        {/* Query / Contact Form Section */}
        <ContactQueryForm />

      </div>
    </section>
  </>
  );
}
