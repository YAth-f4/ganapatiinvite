import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Heart, Sparkles } from 'lucide-react';
import ShowerFlowers from './ShowerFlowers';

export default function LunchSection({ onNext }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 py-8 overflow-hidden select-none">
      {/* Warm Golden Backdrop with Festive Sunlight Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-amber-100/50 via-cream-ivory to-cream-soft -z-10" />

      {/* Top Auspicious Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-2 max-w-lg mx-auto"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50 border border-gold-primary/50 text-wine-magenta text-xs md:text-sm font-bold tracking-widest font-body shadow-sm">
          <Utensils className="w-3.5 h-3.5 text-gold-rich" />
          महाप्रसाद व स्नेहभोजन
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-rozha text-maroon-deep mt-2">
          दुपारचे स्नेहभोजन
        </h2>
      </motion.div>

      {/* Center Feast Presentation Card */}
      <div className="w-full max-w-3xl mx-auto my-auto py-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="relative w-full rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
          style={{
            background: 'linear-gradient(135deg, #FFFDF8 0%, #FFF5ED 50%, #FCF1F4 100%)',
            border: '2px solid rgba(212, 175, 55, 0.75)',
            boxShadow: '0 20px 60px rgba(128, 20, 56, 0.14), 0 0 25px rgba(212, 175, 55, 0.25)',
          }}
        >
          {/* Main Visual Feast: The Maharashtrian Prasadam Thali */}
          <div className="relative w-full rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] shadow-inner mb-6 bg-amber-50">
            <img
              src="/assets/lunch_thali.jpg"
              alt="महाप्रसाद व उकडीचे मोदक थाळी"
              className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
            />
            {/* Soft Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/80 via-transparent to-transparent" />
            
            {/* Overlay Tag on image */}
            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-gold-light text-xs sm:text-sm font-body font-semibold px-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-gold-primary" />
                केळीच्या पानावरील पारंपारिक मेजवानी
              </span>
              <span className="hidden sm:inline-block">साजूक तूप व केशरयुक्त उकडीचे मोदक</span>
            </div>
          </div>

          {/* Warm Personal Hospitality Text */}
          <div className="text-center px-2 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-block px-5 py-2.5 rounded-2xl bg-gradient-to-r from-wine-magenta/10 via-amber-100/40 to-wine-magenta/10 border border-gold-primary/40 mb-4"
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-rozha text-wine-magenta leading-snug">
                "आपण सर्वजण दुपारच्या जेवणासाठी
                <br />
                आग्रहाचे निमंत्रित आहात !"
              </h3>
            </motion.div>

            {/* Touching line from poster */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl font-tiro text-maroon-deep font-semibold tracking-wide flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 text-wine-magenta fill-current inline-block" />
              <span>आपली उपस्थिती हीच आमच्यासाठी आनंदाची बाब आहे !</span>
              <Heart className="w-4 h-4 text-wine-magenta fill-current inline-block" />
            </motion.p>

            {/* Prasadam Delicacies Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 text-xs sm:text-sm font-body text-maroon-deep font-medium"
            >
              <span className="px-3 py-1 rounded-full bg-amber-100/80 border border-gold-primary/30">
                🥟 गरम उकडीचे मोदक
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-100/80 border border-gold-primary/30">
                🍯 पुरणपोळी व साजूक तूप
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-100/80 border border-gold-primary/30">
                🍚 वरण-भात व मसालेभात
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-100/80 border border-gold-primary/30">
                🥗 पंचपक्वान्न महाप्रसाद
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Navigation to Final Poster */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
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
          <span>मूळ निमंत्रण पत्रिका पहा</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">➔</span>
        </button>
      </motion.div>
    </div>
  );
}
