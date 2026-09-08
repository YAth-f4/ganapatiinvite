import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function InteractiveDiya({
  height = 180,
  isLit = true,
  className = '',
  onToggle = null,
  style = {}
}) {
  const [lit, setLit] = useState(isLit);

  const handleClick = () => {
    const next = !lit;
    setLit(next);
    if (onToggle) onToggle(next);
  };

  return (
    <div
      className={`interactive-diya select-none cursor-pointer ${className}`}
      onClick={handleClick}
      title={lit ? "दिवा मालवा / Click to toggle flame" : "दिवा लावा / Click to light diya"}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        filter: lit ? 'drop-shadow(0 0 15px rgba(255, 180, 50, 0.45))' : 'none',
        transition: 'filter 0.5s ease',
        ...style,
      }}
    >
      <svg
        width={height * 0.45}
        height={height}
        viewBox="0 0 90 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="brassGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="30%" stopColor="#E5B842" />
            <stop offset="75%" stopColor="#B3861B" />
            <stop offset="100%" stopColor="#6C4E0B" />
          </linearGradient>

          <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF9E6" />
            <stop offset="35%" stopColor="#FFC83B" />
            <stop offset="70%" stopColor="#FF6B00" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Animated Flame if lit */}
        {lit && (
          <motion.g
            animate={{
              scale: [1, 1.08, 0.96, 1.05, 1],
              opacity: [0.95, 1, 0.9, 1, 0.95],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Outer warmth halo */}
            <circle cx="45" cy="22" r="22" fill="url(#flameGlow)" opacity="0.38" />

            {/* Main flame teardrop */}
            <path
              d="M45 4 C53 14 55 24 49 28 C45 31 41 29 41 25 C41 20 40 12 45 4 Z"
              fill="#FF5E00"
            />
            {/* Middle golden flame */}
            <path
              d="M45 8 C50 16 51 23 47 26 C44 28 42 26 43 23 C43 19 42 13 45 8 Z"
              fill="#FFB703"
            />
            {/* Core white-hot wick flame */}
            <ellipse cx="45" cy="23" rx="2.5" ry="5" fill="#FFFDF0" />
          </motion.g>
        )}

        {/* Wick */}
        <line x1="45" y1="26" x2="45" y2="34" stroke="#2B1A04" strokeWidth="2.5" />

        {/* Top oil cup / lamp bowl */}
        <ellipse cx="45" cy="34" rx="28" ry="7" fill="url(#brassGold)" />
        <path
          d="M17 34 C17 48 30 52 45 52 C60 52 73 48 73 34 Z"
          fill="url(#brassGold)"
        />

        {/* Upper decorative pillar neck */}
        <ellipse cx="45" cy="52" rx="14" ry="4" fill="url(#brassGold)" />
        <rect x="41" y="52" width="8" height="20" fill="url(#brassGold)" />

        {/* Mid orb / kalash sphere */}
        <circle cx="45" cy="80" r="10" fill="url(#brassGold)" />
        <circle cx="45" cy="80" r="12" stroke="#8C6B16" strokeWidth="1.5" fill="none" />

        {/* Lower stepped central column */}
        <path d="M42 90 H48 L49 135 H41 Z" fill="url(#brassGold)" />
        
        {/* Ornate lower bowl tiers */}
        <ellipse cx="45" cy="135" rx="16" ry="5" fill="url(#brassGold)" />
        <ellipse cx="45" cy="144" rx="20" ry="6" fill="url(#brassGold)" />

        {/* Flared pedestal base */}
        <path
          d="M32 148 C32 170 18 185 10 192 H80 C72 185 58 170 58 148 Z"
          fill="url(#brassGold)"
        />
        {/* Base bottom disc */}
        <rect x="8" y="192" width="74" height="6" rx="3" fill="url(#brassGold)" />
      </svg>
    </div>
  );
}
