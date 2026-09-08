import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, List, Sparkles } from 'lucide-react';

export default function StoryNavigation({
  currentChapter,
  totalChapters = 6,
  onSelectChapter,
  onNext,
  onPrev,
  isAutoPlay,
  onToggleAutoPlay,
  viewMode,
  onToggleViewMode,
}) {
  const chapterNames = [
    'प्रारंभ',
    'गणपती आगमन',
    'कुटुंब परिचय',
    'सस्नेह निमंत्रण',
    'दुपारचे जेवण',
    'मूळ पत्रिका',
  ];

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 flex flex-col items-center pointer-events-none px-4">
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 px-4 py-2.5 rounded-full bg-cream-ivory/95 border border-gold-primary/70 shadow-2xl backdrop-blur-md max-w-full overflow-x-auto">
        {/* Previous Chapter Button */}
        {viewMode === 'story' && (
          <button
            onClick={onPrev}
            disabled={currentChapter === 0}
            className={`p-2 rounded-full transition-all ${
              currentChapter === 0
                ? 'opacity-30 cursor-not-allowed text-maroon-deep/40'
                : 'text-maroon-deep hover:bg-wine-magenta hover:text-gold-light active:scale-90'
            }`}
            title="मागे जा (Previous)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Chapter Progress Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-1">
          {Array.from({ length: totalChapters }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => onSelectChapter(idx)}
              className="group relative flex items-center justify-center p-1"
              title={`${idx + 1}. ${chapterNames[idx]}`}
            >
              <span
                className={`transition-all duration-300 rounded-full ${
                  currentChapter === idx
                    ? 'w-7 sm:w-8 h-2.5 bg-wine-magenta ring-2 ring-gold-primary/70'
                    : 'w-2.5 h-2.5 bg-gold-rich/40 hover:bg-gold-rich/70'
                }`}
              />
              <span className="hidden sm:group-hover:block absolute -top-8 px-2 py-0.5 rounded bg-maroon-deep text-gold-light text-[10px] font-body whitespace-nowrap shadow-md">
                {chapterNames[idx]}
              </span>
            </button>
          ))}
        </div>

        {/* Next Chapter Button */}
        {viewMode === 'story' && (
          <button
            onClick={onNext}
            disabled={currentChapter === totalChapters - 1}
            className={`p-2 rounded-full transition-all ${
              currentChapter === totalChapters - 1
                ? 'opacity-30 cursor-not-allowed text-maroon-deep/40'
                : 'text-maroon-deep hover:bg-wine-magenta hover:text-gold-light active:scale-90'
            }`}
            title="पुढे जा (Next)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        <div className="w-px h-5 bg-gold-primary/40 mx-1 hidden sm:block" />

        {/* Auto-Play Story Button */}
        {viewMode === 'story' && (
          <button
            onClick={onToggleAutoPlay}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-body font-semibold transition-all ${
              isAutoPlay
                ? 'bg-wine-magenta text-gold-light shadow-sm'
                : 'text-maroon-deep hover:bg-amber-100/70'
            }`}
            title={isAutoPlay ? "ऑटो-प्ले थांबवा" : "ऑटो-प्ले सुरू करा"}
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">ऑटो-प्ले</span>
          </button>
        )}

        {/* Toggle between Story Mode and Continuous Scroll View */}
        <button
          onClick={onToggleViewMode}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold bg-gold-light/60 border border-gold-primary/50 text-maroon-deep hover:bg-gold-light transition-all"
          title={viewMode === 'story' ? "पूर्ण पान सलग पहा (Scroll View)" : "कथा स्वरूपात पहा (Story Mode)"}
        >
          {viewMode === 'story' ? (
            <>
              <List className="w-3.5 h-3.5 text-wine-magenta" />
              <span className="hidden sm:inline">सलग स्क्रोल</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-wine-magenta" />
              <span className="hidden sm:inline">कथा स्वरूप</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
