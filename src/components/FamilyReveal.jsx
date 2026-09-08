import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, UserCheck } from 'lucide-react';
import { audioService } from '../utils/audioService';

export default function FamilyReveal({ onNext }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Step-by-step sequential family entrance
    const timers = [
      setTimeout(() => { setActiveStep(1); audioService.playTempleBell(1.0); }, 300),   // Father enters
      setTimeout(() => { setActiveStep(2); audioService.playTempleBell(1.2); }, 1400),  // Mother enters
      setTimeout(() => { setActiveStep(3); audioService.playTempleBell(1.4); }, 2500),  // Child enters
      setTimeout(() => { setActiveStep(4); }, 3600),                                   // Welcome text reveal
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const familyMembers = [
    {
      role: 'Father',
      nameMarathi: 'श्री. मयुरेश पिंपळे',
      desc: 'पूजेचे ताट घेऊन स्वागतास सज्ज',
      image: '/assets/father_mayuresh.jpg',
      step: 1,
      direction: -40, // enters from left
    },
    {
      role: 'Mother',
      nameMarathi: 'श्रीमती. हर्षा पिंपळे',
      desc: 'शुभ दीप व मंगल फुले घेऊन उपस्थित',
      image: '/assets/mother_harsha.jpg',
      step: 2,
      direction: 40, // enters from right
    },
    {
      role: 'Son',
      nameMarathi: 'कु. कुमार पिंपळे',
      desc: 'बाप्पाचे आवडते मोदक घेऊन सज्ज',
      image: '/assets/child_aarush.jpg',
      step: 3,
      direction: 0, // enters with bounce from bottom
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 py-8 overflow-hidden select-none">
      {/* Background Subtle Warmth */}
      <div className="absolute inset-0 bg-gradient-radial from-amber-100/40 via-cream-ivory to-cream-soft -z-10" />

      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-2 max-w-lg mx-auto"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-wine-magenta/10 border border-wine-magenta/20 text-wine-magenta text-xs font-semibold font-body tracking-wider">
          <Heart className="w-3.5 h-3.5 fill-current text-wine-magenta" />
          स्नेहसंमेलन व स्वागत
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-rozha text-maroon-deep mt-2">
          आमचे कुटुंब
        </h2>
      </motion.div>

      {/* Three Family Members Grid / Showcase */}
      <div className="w-full max-w-4xl mx-auto my-auto py-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-6 items-end justify-items-center">
          {familyMembers.map((member) => {
            const isVisible = activeStep >= member.step;
            return (
              <motion.div
                key={member.role}
                initial={{
                  opacity: 0,
                  x: member.direction,
                  y: member.direction === 0 ? 50 : 0,
                  scale: 0.9,
                }}
                animate={
                  isVisible
                    ? { opacity: 1, x: 0, y: 0, scale: 1 }
                    : {}
                }
                transition={{
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center w-full max-w-[240px] sm:max-w-none group"
              >
                {/* Character Portrait Card with Royal Arch Border */}
                <div
                  className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl p-2 transition-transform duration-500 hover:-translate-y-1.5"
                  style={{
                    background: 'linear-gradient(135deg, #FFFDF9 0%, #FDF4F6 100%)',
                    border: '1.5px solid rgba(212, 175, 55, 0.7)',
                    boxShadow: '0 12px 30px rgba(128, 20, 56, 0.12), 0 0 15px rgba(212, 175, 55, 0.2)',
                  }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-cream-soft">
                    <img
                      src={member.image}
                      alt={member.nameMarathi}
                      className="w-full h-full object-cover object-top"
                    />

                    {/* Subtle Golden Sheen on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/75 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Bottom Floating Tag */}
                    <div className="absolute bottom-2 inset-x-2 text-center">
                      <p className="text-gold-light text-xs font-body font-semibold tracking-wide drop-shadow">
                        {member.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Member Name with Ornate Typography */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-center mt-3"
                >
                  <h3 className="text-lg sm:text-xl font-rozha text-maroon-deep font-bold tracking-wide">
                    {member.nameMarathi}
                  </h3>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Text Reveal Section after all 3 members appear */}
        <AnimatePresence>
          {activeStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="text-center mt-8 px-4"
            >
              <div className="inline-block p-4 sm:p-6 rounded-2xl bg-cream-soft/90 border border-gold-primary/40 shadow-xl backdrop-blur-sm max-w-xl mx-auto">
                <motion.p
                  initial={{ opacity: 0, letterSpacing: '0.01em' }}
                  animate={{ opacity: 1, letterSpacing: '0.04em' }}
                  transition={{ duration: 1.2 }}
                  className="text-lg sm:text-xl md:text-2xl font-rozha text-wine-magenta leading-relaxed"
                >
                  "पिंपळे कुटुंब आपल्या स्वागतासाठी सज्ज आहे..."
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, letterSpacing: '0.01em' }}
                  animate={{ opacity: 1, letterSpacing: '0.05em' }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  className="text-base sm:text-lg md:text-xl font-tiro text-maroon-deep font-bold mt-2"
                >
                  आपली आतुरतेने वाट पाहत आहे!
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation to Invitation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.8, duration: 0.8 }}
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
          <span>निमंत्रण पत्रिका पहा</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">➔</span>
        </button>
      </motion.div>
    </div>
  );
}
