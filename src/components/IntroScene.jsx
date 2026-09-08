import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Video } from 'lucide-react';
import InteractiveBell from './InteractiveBell';

export default function IntroScene({ onStart, onOpenRecordModal }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 text-center select-none overflow-hidden">
      {/* Decorative Traditional Temple Toran Arch at the top */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-start px-6 md:px-16 pointer-events-none z-10">
        <div className="pointer-events-auto">
          <InteractiveBell chainLength={50} size={32} pitch={1.0} />
        </div>
        
        {/* Center top auspicious shloka banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="pt-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-soft/80 border border-gold-primary/40 shadow-sm backdrop-blur-sm">
            <span className="text-gold-rich text-xs md:text-sm tracking-widest font-serif font-bold">
              ॥ श्री गणेशाय नमः ॥
            </span>
          </div>
        </motion.div>

        <div className="pointer-events-auto">
          <InteractiveBell chainLength={65} size={36} pitch={1.25} />
        </div>
      </div>

      {/* Central Expanding Warm Golden Glow */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.9, 1.15, 1], opacity: [0.3, 0.65, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="absolute w-[320px] md:w-[600px] h-[320px] md:h-[600px] rounded-full bg-gradient-radial from-amber-200/50 via-pink-100/30 to-transparent pointer-events-none blur-3xl -z-10"
      />

      {/* Traditional Marigold Garland Frame Ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="relative z-10 max-w-2xl mx-auto flex flex-col items-center"
      >
        {/* Auspicious Modak / Kalash Golden Motif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-gold-light via-gold-primary to-gold-dark p-0.5 shadow-xl"
        >
          <div className="w-full h-full rounded-full bg-cream-ivory flex items-center justify-center">
            <span className="text-3xl md:text-4xl text-wine-magenta filter drop-shadow">ॐ</span>
          </div>
        </motion.div>

        {/* Shloka from the poster */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-xs md:text-sm font-tiro text-maroon-deep/75 tracking-wider uppercase mb-3 max-w-md px-4"
        >
          ॥ वक्रतुंड महाकाय सूर्यकोटि समप्रभ ॥
          <br />
          ॥ निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
        </motion.p>

        {/* Primary Calligraphic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.9, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rozha text-wine-magenta tracking-wide drop-shadow-sm my-3"
          style={{ textShadow: '0 2px 14px rgba(128, 20, 56, 0.15)' }}
        >
          गणराया परतले...
        </motion.h1>

        {/* Subtitle with slight upward motion */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="text-lg sm:text-xl md:text-2xl font-tiro text-maroon-deep italic tracking-wider my-2"
        >
          आपल्या घरी... आपल्या मनात...
        </motion.p>

        {/* Elegant divider with ornamental gold diamond */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.7 }}
          className="flex items-center gap-3 my-6 w-64 md:w-80 justify-center"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
          <div className="w-2.5 h-2.5 rotate-45 border border-gold-primary bg-gold-light" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
        </motion.div>

        {/* Family Greeting Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.0 }}
          className="text-sm md:text-base font-body text-maroon-deep/80 max-w-md px-6 mb-8 font-medium"
        >
          पिंपळे परिवारातर्फे श्री गणेशोत्सवाचे मंगल निमंत्रण
        </motion.p>

        {/* Luxurious "Open Invitation" Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.3 }}
          className="flex flex-col items-center gap-4 w-full max-w-md px-2"
        >
          {/* Prominent Invitation Video Recording Button */}
          <button
            onClick={onOpenRecordModal}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-body font-bold text-wine-magenta shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FFF9EB 0%, #FEE8B0 50%, #FDD985 100%)',
              border: '2px solid rgba(212, 175, 55, 0.95)',
              boxShadow: '0 8px 25px rgba(212, 175, 55, 0.35), 0 0 15px rgba(128, 20, 56, 0.15)',
            }}
            title="आमंत्रणाचा व्हिडिओ तयार करा आणि WhatsApp वर शेअर करा"
          >
            <span className="text-xl animate-bounce">🎥</span>
            <span className="tracking-wide text-wine-magenta font-extrabold">
              आमंत्रणाचा व्हिडिओ तयार करा
            </span>
            <Sparkles className="w-4 h-4 text-wine-magenta" />
          </button>

          {/* Interactive Digital Invitation Entry Button */}
          <button
            onClick={onStart}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full text-base sm:text-lg font-body font-bold text-cream-ivory shadow-xl transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #801438 0%, #A23386 50%, #801438 100%)',
              border: '2px solid rgba(212, 175, 55, 0.8)',
              boxShadow: '0 10px 30px rgba(128, 20, 56, 0.35), 0 0 20px rgba(212, 175, 55, 0.25)',
            }}
          >
            {/* Shimmer line passing through */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            <Sparkles className="w-4 h-4 text-gold-light animate-spin-slow" />
            <span className="tracking-wide">निमंत्रण उघडा • दर्शन घ्या</span>
            <ChevronDown className="w-4 h-4 text-gold-light transition-transform duration-300 group-hover:translate-y-1" />
          </button>

          <span className="text-xs text-maroon-deep/65 font-body text-center">
            (व्हिडिओ डाउनलोड करा किंवा डिजिटल पत्रिका थेट अनुभवा)
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
