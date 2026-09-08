import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingPetals from './components/FloatingPetals';
import GoldenParticles from './components/GoldenParticles';
import MusicToggle from './components/MusicToggle';
import StoryNavigation from './components/StoryNavigation';
import VideoRecorderController from './components/VideoRecorderController';

import IntroScene from './components/IntroScene';
import GanpatiReveal from './components/GanpatiReveal';
import FamilyReveal from './components/FamilyReveal';
import InvitationSection from './components/InvitationSection';
import LunchSection from './components/LunchSection';
import FinalPoster from './components/FinalPoster';

import { audioService } from './utils/audioService';

export default function App() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [viewMode, setViewMode] = useState('story'); // 'story' | 'scroll'
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(null);

  const videoControllerRef = useRef(null);
  const recordingTimersRef = useRef([]);
  const recordingIntervalRef = useRef(null);

  const totalChapters = 6;

  // Handle user starting the experience from Chapter 0
  const handleStartExperience = () => {
    audioService.startAmbience();
    audioService.playTempleBell(1.0);
    setCurrentChapter(1);
  };

  // Chapter navigation handlers
  const handleNext = () => {
    if (currentChapter < totalChapters - 1) {
      setCurrentChapter((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentChapter > 0) {
      setCurrentChapter((prev) => prev - 1);
    }
  };

  const handleSelectChapter = (index) => {
    setCurrentChapter(index);
    if (viewMode === 'scroll') {
      const el = document.getElementById(`chapter-${index}`);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay((prev) => !prev);
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'story' ? 'scroll' : 'story'));
  };

  const handleRestart = () => {
    setCurrentChapter(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Automated Deterministic Recording Flow (38 Seconds Total)
  const startRecordingFlow = (stopRecordingCallback) => {
    setIsRecording(true);
    setViewMode('story');
    setCurrentChapter(0);

    // Clear any previous timers
    recordingTimersRef.current.forEach(clearTimeout);
    recordingTimersRef.current = [];
    if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);

    const totalSeconds = 38;
    let elapsed = 0;

    const sceneNames = [
      'प्रारंभ',
      'गणपती आगमन',
      'कुटुंब परिचय',
      'सस्नेह निमंत्रण',
      'दुपारचे जेवण',
      'मूळ पत्रिका',
    ];

    const updateProgress = () => {
      elapsed++;
      const currentChapterIdx =
        elapsed < 5.5
          ? 0
          : elapsed < 12.0
          ? 1
          : elapsed < 19.5
          ? 2
          : elapsed < 26.0
          ? 3
          : elapsed < 32.0
          ? 4
          : 5;

      const formatTime = (sec) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
      };

      setRecordingProgress({
        sceneName: sceneNames[currentChapterIdx],
        currentTime: formatTime(elapsed),
        totalTime: formatTime(totalSeconds),
      });

      if (elapsed >= totalSeconds) {
        clearInterval(recordingIntervalRef.current);
      }
    };

    recordingIntervalRef.current = setInterval(updateProgress, 1000);
    updateProgress();

    // Deterministic Scene Transitions
    recordingTimersRef.current = [
      // 5.5s -> Scene 2: Ganpati Reveal
      setTimeout(() => {
        setCurrentChapter(1);
      }, 5500),

      // 12.0s -> Scene 3: Family Reveal
      setTimeout(() => {
        setCurrentChapter(2);
      }, 12000),

      // 19.5s -> Scene 4: Invitation Section
      setTimeout(() => {
        setCurrentChapter(3);
      }, 19500),

      // 26.0s -> Scene 5: Lunch Invitation
      setTimeout(() => {
        setCurrentChapter(4);
      }, 26000),

      // 32.0s -> Scene 6: Final Poster Reveal
      setTimeout(() => {
        setCurrentChapter(5);
      }, 32000),

      // 38.5s -> Stop Recording & Show Download
      setTimeout(() => {
        setIsRecording(false);
        if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
        if (stopRecordingCallback) stopRecordingCallback();
      }, 38500),
    ];
  };

  const stopRecording = () => {
    setIsRecording(false);
    recordingTimersRef.current.forEach(clearTimeout);
    recordingTimersRef.current = [];
    if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    setRecordingProgress(null);
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      recordingTimersRef.current.forEach(clearTimeout);
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    };
  }, []);

  // Auto-play timer for story mode (when not recording)
  useEffect(() => {
    if (!isAutoPlay || viewMode !== 'story' || isRecording) return;

    const durations = [7000, 8500, 9000, 8500, 8000, 15000];
    const duration = durations[currentChapter] || 8000;

    const timer = setTimeout(() => {
      if (currentChapter < totalChapters - 1) {
        setCurrentChapter((prev) => prev + 1);
      } else {
        setIsAutoPlay(false);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [isAutoPlay, currentChapter, viewMode, isRecording]);

  // Page transition variants for cinematic storytelling
  const pageVariants = {
    initial: { opacity: 0, scale: 0.97, y: 15 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 1.02, y: -15, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  return (
    <div className="relative min-h-screen w-full bg-cream-ivory text-maroon-deep overflow-x-hidden selection:bg-wine-magenta selection:text-cream-ivory font-body pb-20">
      {/* Background Layers */}
      <GoldenParticles count={36} />
      <FloatingPetals count={26} />

      {/* Top Floating Music Controller (hidden during video recording) */}
      {!isRecording && <MusicToggle />}

      {/* Video Recorder Controller & Modals */}
      <VideoRecorderController
        ref={videoControllerRef}
        isRecording={isRecording}
        currentChapter={currentChapter}
        onStartRecordingFlow={startRecordingFlow}
        onStopRecording={stopRecording}
        recordingProgress={recordingProgress}
      />

      {/* MAIN CONTENT AREA */}
      {viewMode === 'story' ? (
        // Cinematic Chapter Story Mode
        <main className="relative z-10 w-full min-h-screen flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentChapter === 0 && (
              <motion.div
                key="chapter-0"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                <IntroScene
                  onStart={handleStartExperience}
                  onOpenRecordModal={() => {
                    // Trigger pre-modal in VideoRecorderController
                    const triggerBtn = document.getElementById('open-record-modal-trigger');
                    if (triggerBtn) triggerBtn.click();
                  }}
                />
              </motion.div>
            )}

            {currentChapter === 1 && (
              <motion.div
                key="chapter-1"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                <GanpatiReveal onNext={handleNext} />
              </motion.div>
            )}

            {currentChapter === 2 && (
              <motion.div
                key="chapter-2"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                <FamilyReveal onNext={handleNext} />
              </motion.div>
            )}

            {currentChapter === 3 && (
              <motion.div
                key="chapter-3"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                <InvitationSection onNext={handleNext} />
              </motion.div>
            )}

            {currentChapter === 4 && (
              <motion.div
                key="chapter-4"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                <LunchSection onNext={handleNext} />
              </motion.div>
            )}

            {currentChapter === 5 && (
              <motion.div
                key="chapter-5"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                <FinalPoster onRestart={handleRestart} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      ) : (
        // Continuous Scroll View Mode
        <main className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-16 py-10">
          <section id="chapter-0">
            <IntroScene
              onStart={() => handleSelectChapter(1)}
              onOpenRecordModal={() => {
                const triggerBtn = document.getElementById('open-record-modal-trigger');
                if (triggerBtn) triggerBtn.click();
              }}
            />
          </section>
          <div className="w-full flex items-center justify-center gap-4 text-gold-rich">
            <span className="h-px w-24 bg-gradient-to-r from-transparent to-gold-primary" />
            <span>✤ ✤ ✤</span>
            <span className="h-px w-24 bg-gradient-to-l from-transparent to-gold-primary" />
          </div>
          <section id="chapter-1">
            <GanpatiReveal onNext={() => handleSelectChapter(2)} />
          </section>
          <div className="w-full flex items-center justify-center gap-4 text-gold-rich">
            <span className="h-px w-24 bg-gradient-to-r from-transparent to-gold-primary" />
            <span>✤ ✤ ✤</span>
            <span className="h-px w-24 bg-gradient-to-l from-transparent to-gold-primary" />
          </div>
          <section id="chapter-2">
            <FamilyReveal onNext={() => handleSelectChapter(3)} />
          </section>
          <div className="w-full flex items-center justify-center gap-4 text-gold-rich">
            <span className="h-px w-24 bg-gradient-to-r from-transparent to-gold-primary" />
            <span>✤ ✤ ✤</span>
            <span className="h-px w-24 bg-gradient-to-l from-transparent to-gold-primary" />
          </div>
          <section id="chapter-3">
            <InvitationSection onNext={() => handleSelectChapter(4)} />
          </section>
          <div className="w-full flex items-center justify-center gap-4 text-gold-rich">
            <span className="h-px w-24 bg-gradient-to-r from-transparent to-gold-primary" />
            <span>✤ ✤ ✤</span>
            <span className="h-px w-24 bg-gradient-to-l from-transparent to-gold-primary" />
          </div>
          <section id="chapter-4">
            <LunchSection onNext={() => handleSelectChapter(5)} />
          </section>
          <div className="w-full flex items-center justify-center gap-4 text-gold-rich">
            <span className="h-px w-24 bg-gradient-to-r from-transparent to-gold-primary" />
            <span>✤ ✤ ✤</span>
            <span className="h-px w-24 bg-gradient-to-l from-transparent to-gold-primary" />
          </div>
          <section id="chapter-5">
            <FinalPoster onRestart={handleRestart} />
          </section>
        </main>
      )}

      {/* Floating Bottom Navigation (hidden during video recording) */}
      {!isRecording && (
        <StoryNavigation
          currentChapter={currentChapter}
          totalChapters={totalChapters}
          onSelectChapter={handleSelectChapter}
          onNext={handleNext}
          onPrev={handlePrev}
          isAutoPlay={isAutoPlay}
          onToggleAutoPlay={toggleAutoPlay}
          viewMode={viewMode}
          onToggleViewMode={toggleViewMode}
        />
      )}
    </div>
  );
}
