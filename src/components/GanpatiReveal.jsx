import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import InteractiveBell from './InteractiveBell';
import InteractiveDiya from './InteractiveDiya';
import ShowerFlowers from './ShowerFlowers';
import { audioService } from '../utils/audioService';

export default function GanpatiReveal({ onNext }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Devotional chime on reveal
    const timer = setTimeout(() => {
      setRevealed(true);
      audioService.playDevotionalChime();
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 py-8 overflow-hidden select-none">
      {/* Top Floral Arch Garland inspired by previous year decor */}
      <div className="w-full flex justify-between items-start px-2 sm:px-8 max-w-5xl mx-auto z-20">
        <div className="flex flex-col items-center">
          <InteractiveBell chainLength={45} size={34} pitch={0.9} />
          <span className="text-[10px] text-maroon-deep/50 font-body mt-1">स्पर्श करा 🔔</span>
        </div>

        {/* Top Header Shloka */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center pt-2"
        >
          <p className="text-xs sm:text-sm font-serif font-bold text-wine-magenta tracking-widest uppercase">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-rozha text-maroon-deep mt-1">
            गणेश चतुर्थीच्या हार्दिक शुभेच्छा
          </h2>
        </motion.div>

        <div className="flex flex-col items-center">
          <InteractiveBell chainLength={45} size={34} pitch={1.2} />
          <span className="text-[10px] text-maroon-deep/50 font-body mt-1">स्पर्श करा 🔔</span>
        </div>
      </div>

      {/* Main Altar Composition */}
      <div className="relative w-full max-w-4xl mx-auto my-auto flex items-center justify-center py-4">
        {/* Left Brass Samai Lamp */}
        <div className="hidden sm:flex flex-col items-center justify-end z-20 mr-2 md:mr-6">
          <InteractiveDiya height={220} />
          <span className="text-[11px] font-body text-maroon-deep/60 mt-1">दीप प्रज्वलन</span>
        </div>

        {/* Center Bappa Idol Shrine */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Expanding Radiant Golden Aura */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={revealed ? { scale: [1, 1.25, 1.1], opacity: [0.4, 0.85, 0.6] } : {}}
            transition={{ duration: 3.5, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute w-[300px] sm:w-[420px] md:w-[500px] h-[300px] sm:h-[420px] md:h-[500px] rounded-full bg-gradient-radial from-amber-300/60 via-pink-200/40 to-transparent blur-2xl pointer-events-none -z-10"
          />

          {/* Halo Light Sweep Beams */}
          <motion.div
            initial={{ rotate: 0, opacity: 0 }}
            animate={revealed ? { rotate: 360, opacity: 0.35 } : {}}
            transition={{ rotate: { duration: 45, repeat: Infinity, ease: 'linear' }, opacity: { duration: 1.5 } }}
            className="absolute w-[360px] sm:w-[480px] md:w-[560px] h-[360px] sm:h-[480px] md:h-[560px] rounded-full pointer-events-none -z-10"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255, 215, 0, 0.4) 30deg, transparent 60deg, rgba(255, 180, 50, 0.3) 120deg, transparent 180deg, rgba(255, 215, 0, 0.4) 240deg, transparent 300deg)',
            }}
          />

          {/* Divine Ganpati Idol Image Frame */}
          <motion.div
            initial={{ scale: 0.78, opacity: 0, filter: 'blur(10px)' }}
            animate={revealed ? { scale: 1, opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden shadow-2xl p-2.5 max-w-[290px] sm:max-w-[340px] md:max-w-[380px]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,248,235,0.95) 0%, rgba(254,235,242,0.95) 100%)',
              border: '2px solid rgba(212, 175, 55, 0.8)',
              boxShadow: '0 20px 50px rgba(128, 20, 56, 0.22), 0 0 35px rgba(212, 175, 55, 0.35)',
            }}
          >
            {/* The Actual Idol Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-cream-soft">
              <img
                src="/assets/ganpati_idol.jpg"
                alt="गणेश दर्शन - पिंपळे कुटुंब"
                className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
              />

              {/* Light sweep overlay on reveal */}
              <motion.div
                initial={{ x: '-100%', opacity: 0.8 }}
                animate={revealed ? { x: '200%', opacity: 0 } : {}}
                transition={{ duration: 2, delay: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none transform -skew-x-12"
              />

              {/* Bottom Sacred Glow Ribbon */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-maroon-deep/90 via-maroon-deep/40 to-transparent p-3 text-center">
                <p className="text-gold-light font-rozha text-sm sm:text-base tracking-widest">
                  ॥ मोरया मज पाव रे ॥
                </p>
              </div>
            </div>
          </motion.div>

          {/* Interactive Flower Offering Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-4 flex flex-col items-center gap-2"
          >
            <ShowerFlowers label="बाप्पाच्या चरणी फुले अर्पण करा" />
          </motion.div>
        </div>

        {/* Right Brass Samai Lamp */}
        <div className="hidden sm:flex flex-col items-center justify-end z-20 ml-2 md:mr-6">
          <InteractiveDiya height={220} />
          <span className="text-[11px] font-body text-maroon-deep/60 mt-1">दीप प्रज्वलन</span>
        </div>
      </div>

      {/* Mobile Diyas Row */}
      <div className="flex sm:hidden items-center justify-around w-full max-w-xs my-2 z-20">
        <InteractiveDiya height={110} />
        <InteractiveDiya height={110} />
      </div>

      {/* Bottom Navigation CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="w-full max-w-md mx-auto flex flex-col items-center gap-2 z-20 pb-2"
      >
        <button
          onClick={onNext}
          className="group flex items-center gap-2 px-7 py-3 rounded-full text-sm sm:text-base font-body font-bold text-cream-ivory shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #801438 0%, #A23386 100%)',
            border: '1.5px solid rgba(212, 175, 55, 0.7)',
          }}
        >
          <span>पिंपळे कुटुंबाला भेटा</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">➔</span>
        </button>
      </motion.div>
    </div>
  );
}
