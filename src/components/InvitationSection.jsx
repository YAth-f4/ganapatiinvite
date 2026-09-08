import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Sparkles, Navigation, Clock, Phone } from 'lucide-react';
import { audioService } from '../utils/audioService';

export default function InvitationSection({ onNext }) {
  const [glowFlash, setGlowFlash] = useState(true);

  useEffect(() => {
    // Brief golden flash then chime
    audioService.playTempleBell(1.1);
    const timer = setTimeout(() => {
      setGlowFlash(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const openGoogleMaps = () => {
    const address = encodeURIComponent("Ram Krishna Garden, Near Philia Hospital, Tembhode Road, Palghar West");
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  const addToCalendar = () => {
    // September 14, 2026 Ganesh Chaturthi celebration
    const title = encodeURIComponent("श्री गणेश दर्शन - पिंपळे कुटुंब");
    const details = encodeURIComponent("आपणांस व आपल्या परिवारास गणेश दर्शनासाठी व महाप्रसादासाठी आग्रहाचे निमंत्रण!");
    const location = encodeURIComponent("राम कृष्ण गार्डन, फिलिया हॉस्पिटलच्या मागे, टेंबोडे रोड, पालघर पश्चिम");
    // Google Calendar URL format
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20260914T043000Z/20260915T163000Z`;
    window.open(gCalUrl, '_blank');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 py-8 overflow-hidden select-none">
      {/* Golden Flash Overlay on transition */}
      {glowFlash && (
        <motion.div
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="fixed inset-0 bg-gradient-radial from-amber-200 via-amber-100 to-transparent pointer-events-none z-40"
        />
      )}

      {/* Background Ornate Paisley Arch */}
      <div className="absolute inset-0 bg-gradient-radial from-pink-100/30 via-cream-ivory to-cream-soft -z-10" />

      {/* Top Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center pt-2 max-w-lg mx-auto"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cream-soft border border-gold-primary/50 text-wine-magenta text-xs md:text-sm font-bold tracking-widest font-serif shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-rich" />
          ॥ सस्नेह निमंत्रण ॥
        </span>
      </motion.div>

      {/* Main Invitation Letter Parchment */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative w-full max-w-2xl mx-auto my-auto p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #FFFDF8 0%, #FCF5EE 50%, #FFF8FA 100%)',
          border: '2px solid rgba(212, 175, 55, 0.85)',
          boxShadow: '0 20px 60px rgba(128, 20, 56, 0.16), 0 0 30px rgba(212, 175, 55, 0.25)',
        }}
      >
        {/* Golden Filigree Corner Ornaments */}
        <div className="absolute top-2 left-2 text-gold-primary/60 text-lg">✦</div>
        <div className="absolute top-2 right-2 text-gold-primary/60 text-lg">✦</div>
        <div className="absolute bottom-2 left-2 text-gold-primary/60 text-lg">✦</div>
        <div className="absolute bottom-2 right-2 text-gold-primary/60 text-lg">✦</div>

        {/* Center Marathi Title "गणेश दर्शन" matching the exact calligraphy style */}
        <div className="text-center mb-6">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-rozha text-wine-magenta tracking-wide drop-shadow-sm"
            style={{
              textShadow: '0 2px 10px rgba(128, 20, 56, 0.15)',
            }}
          >
            गणेश दर्शन
          </h1>
          {/* Filigree Underline Divider */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-gold-primary" />
            <span className="text-gold-rich text-xs">✤ ✤ ✤</span>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-gold-primary" />
          </div>
        </div>

        {/* The Host Names */}
        <div className="flex flex-col items-center gap-1.5 my-5 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl font-rozha text-maroon-deep font-bold"
          >
            श्री. मयुरेश पिंपळे
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl sm:text-2xl md:text-3xl font-rozha text-maroon-deep font-bold"
          >
            श्रीमती. हर्षा पिंपळे
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl sm:text-2xl md:text-3xl font-rozha text-maroon-deep font-bold"
          >
            कु. आरुष पिंपळे
          </motion.p>
        </div>

        {/* The Personal Invitation Phrasing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="text-center my-6 max-w-lg mx-auto"
        >
          <p className="text-base sm:text-lg md:text-xl font-tiro text-maroon-deep leading-relaxed">
            आपणांस व आपल्या परिवारास
            <br />
            <strong className="text-wine-magenta font-semibold text-lg sm:text-xl md:text-2xl">
              गणेश दर्शनासाठी
            </strong>
            <br />
            आग्रहाचे निमंत्रण.
          </p>
        </motion.div>

        {/* Event Date & Location Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-4 border-t border-gold-primary/30">
          {/* Date Card */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-gold-primary/40 flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-wine-magenta text-gold-light shadow-md">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-wine-magenta tracking-wider uppercase font-body">
                  दिनांक
                </span>
                <p className="text-base sm:text-lg font-bold font-rozha text-maroon-deep mt-0.5">
                  १४ व १५ सप्टेंबर २०२६
                </p>
                <p className="text-xs text-maroon-deep/70 font-body">
                  शनिवार व रविवार
                </p>
              </div>
            </div>
            <button
              onClick={addToCalendar}
              className="mt-3 text-xs font-semibold text-wine-magenta hover:text-gold-rich flex items-center gap-1.5 transition-colors font-body"
            >
              <Clock className="w-3.5 h-3.5" />
              कॅलेंडरमध्ये जोडा (Add to Calendar)
            </button>
          </div>

          {/* Venue Card */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-gold-primary/40 flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-wine-magenta text-gold-light shadow-md">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-wine-magenta tracking-wider uppercase font-body">
                  स्थळ
                </span>
                <p className="text-xs sm:text-sm font-semibold font-body text-maroon-deep mt-0.5 leading-snug">
                  बिल्डिंग नं. ८, फ्लॅट नं. २०५,
                  <br />
                  राम कृष्ण गार्डन, फिलिया हॉस्पिटलच्या मागे,
                  <br />
                  टेंबोडे रोड, पालघर पश्चिम.
                </p>
              </div>
            </div>
            <button
              onClick={openGoogleMaps}
              className="mt-3 text-xs font-semibold text-wine-magenta hover:text-gold-rich flex items-center gap-1.5 transition-colors font-body"
            >
              <Navigation className="w-3.5 h-3.5" />
              गुगल मॅप्सवर दिशा पहा (Google Maps)
            </button>
          </div>
        </div>

        {/* Contact Numbers Bar */}
        <div className="mt-4 pt-3 border-t border-gold-primary/30 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs font-bold text-wine-magenta font-body flex items-center gap-1.5 uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5" />
            संपर्क :
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <a
              href="tel:9322096273"
              className="px-2.5 py-1 rounded-lg bg-amber-50 border border-gold-primary/50 text-maroon-deep text-xs font-semibold hover:border-wine-magenta hover:text-wine-magenta transition-colors"
            >
              ९३२२०९६२७३
            </a>
            <span className="text-gold-rich text-xs">/</span>
            <a
              href="tel:9764210543"
              className="px-2.5 py-1 rounded-lg bg-amber-50 border border-gold-primary/50 text-maroon-deep text-xs font-semibold hover:border-wine-magenta hover:text-wine-magenta transition-colors"
            >
              ९७६४२१०५४३
            </a>
            <span className="text-gold-rich text-xs">/</span>
            <a
              href="tel:9322632446"
              className="px-2.5 py-1 rounded-lg bg-amber-50 border border-gold-primary/50 text-maroon-deep text-xs font-semibold hover:border-wine-magenta hover:text-wine-magenta transition-colors"
            >
              ९३२२६३२४४६
            </a>
          </div>
        </div>
      </motion.div>

      {/* Navigation to Lunch Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
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
          <span>दुपारच्या भोजनाचे निमंत्रण</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">➔</span>
        </button>
      </motion.div>
    </div>
  );
}
