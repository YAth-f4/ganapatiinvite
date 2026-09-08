import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { audioService } from '../utils/audioService';

export default function InteractiveBell({
  chainLength = 80,
  size = 40,
  pitch = 1.0,
  className = '',
  style = {}
}) {
  const [isRinging, setIsRinging] = useState(false);
  const controls = useAnimation();

  const ringBell = () => {
    audioService.playTempleBell(pitch);
    setIsRinging(true);

    // Dynamic pendulum decay swing
    controls.start({
      rotate: [0, 18, -14, 10, -6, 3, -1, 0],
      transition: {
        duration: 1.6,
        ease: 'easeOut',
      },
    }).then(() => {
      setIsRinging(false);
    });
  };

  return (
    <div
      className={`interactive-bell-container select-none cursor-pointer ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        transformOrigin: 'top center',
        ...style,
      }}
      onClick={ringBell}
      onMouseEnter={() => !isRinging && ringBell()}
      title="घंटी वाजवा / Ring Bell"
    >
      {/* Brass hanging chain with links */}
      <div
        style={{
          width: '2px',
          height: `${chainLength}px`,
          backgroundImage: 'radial-gradient(circle, #D4AF37 40%, #8C6B16 100%)',
          backgroundSize: '4px 8px',
          boxShadow: '0 0 4px rgba(212,175,55,0.4)',
        }}
      />

      {/* Bell Head & Clapper */}
      <motion.div
        animate={controls}
        style={{
          transformOrigin: 'top center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <svg
          width={size}
          height={size * 1.25}
          viewBox="0 0 100 125"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: isRinging
              ? 'drop-shadow(0 0 12px rgba(255, 215, 0, 0.8))'
              : 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))',
            transition: 'filter 0.3s ease',
          }}
        >
          <defs>
            <linearGradient id="bellGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="35%" stopColor="#E5B842" />
              <stop offset="70%" stopColor="#C59B27" />
              <stop offset="100%" stopColor="#7E5F12" />
            </linearGradient>
            <radialGradient id="bellGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF9D2" />
              <stop offset="100%" stopColor="#D4AF37" />
            </radialGradient>
          </defs>

          {/* Top hanging ring */}
          <circle cx="50" cy="14" r="8" stroke="url(#bellGoldGrad)" strokeWidth="4" />
          
          {/* Ornate bell cap / crown */}
          <ellipse cx="50" cy="28" rx="14" ry="6" fill="url(#bellGoldGrad)" />
          <path d="M42 24 H58 V30 H42 Z" fill="#9A7720" />

          {/* Main Bell Body Dome */}
          <path
            d="M36 30 C36 45 20 75 14 90 C22 96 78 96 86 90 C80 75 64 45 64 30 Z"
            fill="url(#bellGoldGrad)"
          />

          {/* Decorative engraved rings */}
          <path d="M22 80 C32 85 68 85 78 80" stroke="#7A5A10" strokeWidth="2.5" />
          <path d="M26 73 C34 78 66 78 74 73" stroke="#FFF3A8" strokeWidth="1.5" />

          {/* Bell Bottom Rim */}
          <ellipse cx="50" cy="90" rx="36" ry="8" fill="url(#bellGoldGrad)" stroke="#684A06" strokeWidth="2" />
          
          {/* Bell Clapper hanging underneath */}
          <motion.g
            animate={
              isRinging
                ? { x: [-3, 3, -2, 2, 0], transition: { duration: 1.2 } }
                : { x: 0 }
            }
          >
            <line x1="50" y1="90" x2="50" y2="108" stroke="#A88120" strokeWidth="3" />
            <circle cx="50" cy="112" r="7" fill="url(#bellGlow)" stroke="#684A06" strokeWidth="1.5" />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
