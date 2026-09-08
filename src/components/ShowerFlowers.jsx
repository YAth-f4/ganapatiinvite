import React from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { audioService } from '../utils/audioService';

export default function ShowerFlowers({ label = "बाप्पाला फुले अर्पण करा", className = "" }) {
  const triggerFlowerShower = (e) => {
    // Play bell sound
    audioService.playTempleBell(1.15);

    // Confetti burst shaped like petals
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // Floral colors
    const colors = ['#E11D48', '#FFB703', '#FB7185', '#F59E0B', '#D946EF', '#FFFBEB'];

    confetti({
      particleCount: 55,
      spread: 80,
      origin: { x, y: Math.max(0.2, y - 0.1) },
      colors,
      scalar: 1.3,
      ticks: 200,
      gravity: 0.8,
      shapes: ['circle'],
    });

    // Secondary shower from top
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 100,
        origin: { x: 0.5, y: 0.1 },
        colors,
        scalar: 1.4,
        ticks: 260,
        gravity: 0.6,
      });
    }, 200);
  };

  return (
    <button
      onClick={triggerFlowerShower}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-semibold text-sm transition-all duration-300 shadow-md active:scale-95 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #FFF6F8 0%, #FEE2E9 100%)',
        border: '1.5px solid #E11D48',
        color: '#9F1239',
        boxShadow: '0 4px 15px rgba(225, 29, 72, 0.18)',
      }}
      title="गणरायाच्या चरणी फुले अर्पण करा"
    >
      <span className="text-base animate-bounce">🌸</span>
      <span>{label}</span>
      <Sparkles className="w-4 h-4 text-gold-rich" />
    </button>
  );
}
