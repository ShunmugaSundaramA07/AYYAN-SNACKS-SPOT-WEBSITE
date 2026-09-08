import React, { useState, useEffect, useRef } from 'react';

/**
 * Premium Cinematic Splash Screen for AYYAN SNACKS SPOT
 * 
 * Flow:
 * - 0 to 2s: Realistic metallic bronze/gold coin rises from bottom with 3D depth, reflections & shadow.
 * - 2 to 5s: Soft swirling smoke/haze appears with warm golden volumetric light and floating particles;
 *            the official AYYAN SNACKS SPOT logo reveals through the smoke with all details preserved.
 * - 5 to 7s: Smoke dissipates; logo becomes razor-sharp in the center; golden light sweep passes across.
 * - ~7s: Smooth cinematic fade out revealing the existing website with the exact same cream background.
 */
export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('rising'); // 'rising' (0-2s) -> 'reveal' (2-5s) -> 'final' (5-7s) -> 'fadeout' (>7s)
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(onComplete, 600);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  // Preload logo and background image
  useEffect(() => {
    const bgImg = new Image();
    bgImg.src = '/warm_cream_bg.jpg';

    const logoImg = new Image();
    logoImg.src = '/ayyan_logo_coin.jpg';
    logoImg.onload = () => setImageLoaded(true);
    logoImg.onerror = () => setImageLoaded(true); // Fail-safe
  }, []);

  // Main cinematic timeline
  useEffect(() => {
    // 2s: Coin reaches center, smoke and reveal begins
    const timer1 = setTimeout(() => {
      setPhase('reveal');
    }, 2000);

    // 5s: Smoke dissipates, final sharp state with light sweep
    const timer2 = setTimeout(() => {
      setPhase('final');
    }, 5000);

    // 6.9s: Begin smooth fade out
    const timer3 = setTimeout(() => {
      setIsFadingOut(true);
    }, 6900);

    // 7.6s: Complete splash screen and unmount
    const timer4 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 7600);

    // Safety fallback: guaranteed unblock after 8 seconds
    const safetyTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 8500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(safetyTimer);
    };
  }, [onComplete]);

  // Canvas particle system for realistic volumetric smoke & golden dust
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate smoke puffs
    const smokePuffs = Array.from({ length: 18 }, () => ({
      x: width / 2 + (Math.random() - 0.5) * 140,
      y: height / 2 + (Math.random() - 0.5) * 100,
      radius: 60 + Math.random() * 80,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.2 - Math.random() * 0.3,
      alpha: 0,
      maxAlpha: 0.12 + Math.random() * 0.14,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.005,
      growRate: 0.15 + Math.random() * 0.15,
    }));

    // Generate golden dust motes
    const dustParticles = Array.from({ length: 35 }, () => ({
      x: width / 2 + (Math.random() - 0.5) * 360,
      y: height / 2 + (Math.random() - 0.5) * 360,
      size: 1 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.3 - Math.random() * 0.5,
      alpha: 0.2 + Math.random() * 0.6,
      pulse: Math.random() * Math.PI,
    }));

    let startTime = performance.now();

    const render = (now) => {
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      // Render smoke during reveal phase (from 1.8s to 5.8s)
      if (elapsed >= 1.6 && elapsed <= 6.2) {
        const smokeFade =
          elapsed < 2.5
            ? (elapsed - 1.6) / 0.9 // Fade in
            : elapsed > 4.8
            ? Math.max(0, 1 - (elapsed - 4.8) / 1.2) // Dissipate
            : 1;

        smokePuffs.forEach((puff) => {
          puff.x += puff.vx;
          puff.y += puff.vy;
          puff.radius += puff.growRate * 0.2;
          puff.rotation += puff.vRot;

          const currentAlpha = puff.maxAlpha * smokeFade;
          if (currentAlpha > 0.005) {
            const grad = ctx.createRadialGradient(
              puff.x,
              puff.y,
              puff.radius * 0.1,
              puff.x,
              puff.y,
              puff.radius
            );
            // Warm aromatic culinary haze
            grad.addColorStop(0, `rgba(255, 235, 205, ${currentAlpha})`);
            grad.addColorStop(0.4, `rgba(245, 215, 175, ${currentAlpha * 0.7})`);
            grad.addColorStop(0.8, `rgba(230, 195, 150, ${currentAlpha * 0.2})`);
            grad.addColorStop(1, 'rgba(230, 195, 150, 0)');

            ctx.save();
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(puff.x, puff.y, puff.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });
      }

      // Render floating golden dust particles
      if (elapsed >= 1.8 && elapsed <= 6.5) {
        const dustFade =
          elapsed < 2.8
            ? (elapsed - 1.8) / 1.0
            : elapsed > 5.2
            ? Math.max(0, 1 - (elapsed - 5.2) / 1.2)
            : 1;

        dustParticles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.pulse += 0.03;

          const alpha = (p.alpha + Math.sin(p.pulse) * 0.2) * dustFade;
          if (alpha > 0.01) {
            ctx.save();
            ctx.fillStyle = `rgba(235, 175, 75, ${alpha})`;
            ctx.shadowColor = 'rgba(255, 200, 100, 0.8)';
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }

          // Wrap boundaries
          if (p.y < height / 2 - 220) p.y = height / 2 + 200;
          if (p.x < width / 2 - 220) p.x = width / 2 + 220;
          if (p.x > width / 2 + 220) p.x = width / 2 - 220;
        });
      }

      if (elapsed < 7.5) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div
      id="cinematic-splash-screen"
      role="status"
      aria-label="Ayyan Snacks Spot loading"
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-opacity duration-800 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: "url('/warm_cream_bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Subtle warm ambient vignette to accentuate cinematic depth */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#4A2600]/5 to-[#241300]/15 pointer-events-none" />

      {/* Atmospheric Canvas for Smoke & Floating Golden Dust */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Volumetric Soft Golden Light behind the medallion */}
      <div
        className={`absolute w-[450px] h-[450px] rounded-full pointer-events-none blur-3xl transition-opacity duration-1000 z-0 ${
          phase === 'rising'
            ? 'opacity-20 scale-75'
            : phase === 'reveal'
            ? 'opacity-70 scale-110'
            : 'opacity-40 scale-100'
        }`}
        style={{
          background:
            'radial-gradient(circle, rgba(235, 160, 60, 0.45) 0%, rgba(210, 120, 30, 0.2) 45%, transparent 70%)',
        }}
      />

      {/* Center Stage: The Metallic Medallion & Coin */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        
        {/* Dynamic Cast Shadow on the cream canvas */}
        <div
          className={`absolute -bottom-16 w-48 h-8 rounded-full bg-[#3d2314]/30 blur-md transition-all duration-700 ease-out ${
            phase === 'rising'
              ? 'scale-50 opacity-20 translate-y-32'
              : 'scale-100 opacity-60 translate-y-0'
          }`}
        />

        {/* 3D Coin & Logo Medallion */}
        <div
          className={`relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full transition-transform duration-1000 ease-out drop-shadow-[0_25px_45px_rgba(50,25,10,0.45)] ${
            phase === 'rising' ? 'animate-coin-rise' : 'animate-coin-hover'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1200px',
          }}
        >
          {/* Official Ayyan Snacks Spot Logo Asset Image */}
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
            <img
              src="/ayyan_logo_coin.jpg"
              alt="AYYAN SNACKS SPOT - SINCE 2000"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-contain rounded-full transition-all duration-1000 ${
                phase === 'rising'
                  ? 'filter brightness-90 contrast-105'
                  : phase === 'reveal'
                  ? 'filter brightness-105 contrast-100'
                  : 'filter brightness-100 contrast-105'
              }`}
            />

            {/* Dynamic Specular Shimmer / Metallic Reflection */}
            <div
              className={`absolute inset-0 pointer-events-none rounded-full transition-opacity duration-700 ${
                phase === 'rising' ? 'opacity-35 animate-specular-sweep' : 'opacity-15'
              }`}
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.25) 100%)',
              }}
            />

            {/* Final Golden Light Sweep across the logo (5.2s to 6.2s) */}
            <div
              className={`absolute inset-0 pointer-events-none rounded-full ${
                phase === 'final' ? 'animate-golden-light-sweep' : 'opacity-0'
              }`}
            />
          </div>
        </div>

        {/* Brand Caption & Heritage Badge below Coin */}
        <div
          className={`mt-7 text-center transition-all duration-1000 ${
            phase === 'rising'
              ? 'opacity-0 translate-y-4'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <h1 className="text-[20px] sm:text-[22px] font-bold tracking-[0.2em] text-[#3D2614] uppercase">
            AYYAN SNACKS SPOT
          </h1>
          <p className="text-[13px] sm:text-[14px] font-medium tracking-[0.25em] text-[#8C6030] uppercase mt-1">
            SINCE 2000 • TRADITIONAL ARTISAN FLAVORS
          </p>
        </div>
      </div>
    </div>
  );
}
