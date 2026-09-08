import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Bell } from 'lucide-react';
import { audioService } from '../utils/audioService';

export default function MusicToggle({ onUserInteract }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleSound = () => {
    const active = audioService.toggleAudio();
    setIsPlaying(active);
    if (onUserInteract) onUserInteract();
  };

  const ringChime = (e) => {
    e.stopPropagation();
    audioService.playTempleBell(1.1);
    if (!isPlaying) {
      // Prompt user that sound works
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      {/* Temple bell quick chime button */}
      <button
        onClick={ringChime}
        className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-cream-soft/90 backdrop-blur-md border border-gold-primary/60 shadow-lg text-wine-magenta hover:text-gold-primary hover:border-gold-primary transition-all duration-300 active:scale-95"
        title="मंदिराची घंटी वाजवा / Ring Temple Bell"
      >
        <Bell className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
        <span className="sr-only">Ring Bell</span>
      </button>

      {/* Main Ambient Audio Toggle */}
      <button
        onClick={toggleSound}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 active:scale-95 ${
          isPlaying
            ? 'bg-wine-magenta text-gold-light border-gold-primary/80 shadow-wine-magenta/30'
            : 'bg-cream-soft/90 text-maroon-deep border-gold-primary/50 hover:border-gold-primary'
        }`}
        title={isPlaying ? "संगीत बंद करा / Mute Ambience" : "मंगल संगीत सुरू करा / Play Devotional Ambience"}
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-4">
              <span className="w-1 bg-gold-primary rounded-full animate-music-bar-1 h-2" />
              <span className="w-1 bg-gold-primary rounded-full animate-music-bar-2 h-4" />
              <span className="w-1 bg-gold-primary rounded-full animate-music-bar-3 h-3" />
            </div>
            <Volume2 className="w-4 h-4 text-gold-light" />
            <span className="text-xs font-semibold tracking-wider font-body">मंगल ध्वनी</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-maroon-deep/70" />
            <span className="text-xs font-medium tracking-wide font-body">संगीत ऐका</span>
          </>
        )}
      </button>

      {showTooltip && (
        <div className="absolute top-14 right-0 px-3 py-1.5 bg-maroon-deep text-gold-light text-xs rounded-lg shadow-xl whitespace-nowrap animate-fade-in font-body border border-gold-primary/50">
          घंटीचा नाद! संगीत ऐकण्यासाठी बाजूचे बटण दाबा.
        </div>
      )}
    </div>
  );
}
