import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Download,
  Share2,
  Calendar,
  Sparkles,
  ExternalLink,
  ZoomIn
} from 'lucide-react';
import ShowerFlowers from './ShowerFlowers';
import { audioService } from '../utils/audioService';

export default function FinalPoster({ onRestart }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    // Physical reveal sequence: starts blurred, comes forward, light sweeps, then becomes crisp
    audioService.playTempleBell(1.2);
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const phoneNumbers = [
    { number: '9322096273', display: '९३२२०९६२७३' },
    { number: '9764210543', display: '९७६४२१०५४३' },
    { number: '9322632446', display: '९३२२६३२४४६' },
  ];

  const handleWhatsAppRSVP = () => {
    const text = encodeURIComponent(
      "जय गणेश! आम्ही श्री. मयुरेश पिंपळे आणि परिवाराच्या श्री गणेश दर्शनासाठी नक्की उपस्थित राहणार आहोत. आमचे सस्नेह वंदन! गणपती बाप्पा मोरया!"
    );
    window.open(`https://wa.me/919322096273?text=${text}`, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '॥ श्री गणेश दर्शन ॥ पिंपळे कुटुंब निमंत्रण',
          text: 'पिंपळे कुटुंबातर्फे गणेश दर्शनाचे सस्नेह व आग्रहाचे निमंत्रण. १४ व १५ सप्टेंबर २०२६, पालघर पश्चिम.',
          url: window.location.href,
        });
      } catch (err) {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('निमंत्रण लिंक कॉपी झाली आहे!');
    }
  };

  const openGoogleMaps = () => {
    const address = encodeURIComponent("Ram Krishna Garden, Near Philia Hospital, Tembhode Road, Palghar West");
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center px-4 py-8 select-none">
      {/* Top Auspicious Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-2 mb-6 max-w-lg mx-auto"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cream-soft border border-gold-primary/50 text-wine-magenta text-xs sm:text-sm font-bold tracking-widest font-serif shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-rich" />
          ॥ संपूर्ण निमंत्रण पत्रिका ॥
        </span>
        <h2 className="text-2xl sm:text-3xl font-rozha text-maroon-deep mt-2">
          गणेश दर्शन आमंत्रण
        </h2>
        <p className="text-xs sm:text-sm font-body text-maroon-deep/75 mt-1">
          (खालील पत्रिका पूर्ण पाहण्यासाठी स्क्रोल करा किंवा डाउनलोड करा)
        </p>
      </motion.div>

      {/* The Physical Poster Card Reveal */}
      <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{
            scale: 0.88,
            filter: 'blur(16px)',
            opacity: 0,
            y: 40,
          }}
          animate={
            isRevealed
              ? {
                  scale: 1,
                  filter: 'blur(0px)',
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative w-full rounded-3xl overflow-hidden shadow-2xl p-2 sm:p-3"
          style={{
            background: 'linear-gradient(135deg, #FFFDF8 0%, #FEECEF 100%)',
            border: '2px solid rgba(212, 175, 55, 0.85)',
            boxShadow: '0 25px 70px rgba(128, 20, 56, 0.22), 0 0 35px rgba(212, 175, 55, 0.35)',
          }}
        >
          {/* Light Sweep Passing Over Poster */}
          <motion.div
            initial={{ x: '-100%', opacity: 0.9 }}
            animate={isRevealed ? { x: '250%', opacity: 0 } : {}}
            transition={{ duration: 2.2, delay: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none transform -skew-x-12 z-20"
          />

          {/* Actual Poster Container */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-cream-soft shadow-inner">
            <img
              src="/assets/invitation_poster.jpg"
              alt="गणेश दर्शन निमंत्रण पत्रिका - पिंपळे कुटुंब"
              className="w-full h-auto object-contain block cursor-pointer"
              onClick={() => setIsZoomed(true)}
              title="मोठे करून पाहण्यासाठी क्लिक करा"
            />

            {/* Quick Zoom Pill */}
            <button
              onClick={() => setIsZoomed(true)}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-soft/90 border border-gold-primary/60 text-maroon-deep text-xs font-semibold shadow-md backdrop-blur-sm hover:bg-wine-magenta hover:text-gold-light transition-all"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>झूम करा</span>
            </button>
          </div>
        </motion.div>

        {/* Flower Shower directly onto Poster */}
        <div className="mt-4">
          <ShowerFlowers label="निमंत्रणावर फुले उधळा 🌸" />
        </div>
      </div>

      {/* Action Buttons Hub */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="w-full max-w-2xl mx-auto my-8 flex flex-col gap-4"
      >
        {/* Row 1: Maps & WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={openGoogleMaps}
            className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-cream-soft border border-gold-primary/60 text-maroon-deep font-body font-semibold text-sm shadow-md hover:bg-wine-magenta hover:text-gold-light transition-all duration-300 active:scale-95"
          >
            <MapPin className="w-4 h-4 text-wine-magenta group-hover:text-gold-light" />
            <span>गुगल मॅप्स लोकेशन (Palghar)</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </button>

          <button
            onClick={handleWhatsAppRSVP}
            className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-emerald-700 text-white font-body font-semibold text-sm shadow-md hover:bg-emerald-800 transition-all duration-300 active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>व्हॉट्सअ‍ॅप RSVP पाठवा</span>
          </button>
        </div>

        {/* Row 2: Phone Calling Quick Shortcuts */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-gold-primary/40 flex flex-col gap-2">
          <span className="text-xs font-bold text-wine-magenta font-body flex items-center gap-1.5 uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5" />
            थेट संपर्क साधा (Click to Call) :
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {phoneNumbers.map((p) => (
              <a
                key={p.number}
                href={`tel:${p.number}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gold-primary/50 text-maroon-deep text-xs font-semibold hover:border-wine-magenta hover:text-wine-magenta transition-colors shadow-sm"
              >
                <Phone className="w-3 h-3 text-gold-rich" />
                <span>{p.display}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Row 3: Download & Share */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="/assets/invitation_poster.jpg"
            download="Ganpati_Invitation_Pimple_Family.jpg"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-wine-magenta text-gold-light font-body font-semibold text-xs sm:text-sm shadow-md hover:bg-maroon-deep transition-all"
          >
            <Download className="w-4 h-4" />
            <span>पत्रिका डाउनलोड करा (Save Poster)</span>
          </a>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cream-soft border border-gold-primary text-maroon-deep font-body font-semibold text-xs sm:text-sm shadow-md hover:bg-gold-light/40 transition-all"
          >
            <Share2 className="w-4 h-4 text-wine-magenta" />
            <span>मित्रांना शेअर करा</span>
          </button>

          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cream-soft border border-maroon-deep/30 text-maroon-deep/70 font-body font-medium text-xs sm:text-sm hover:text-maroon-deep transition-all"
          >
            <span>पुन्हा सुरुवातीपासून अनुभवा ↺</span>
          </button>
        </div>
      </motion.div>

      {/* Full Screen Image Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-2xl max-h-[90vh] overflow-auto rounded-xl">
            <img
              src="/assets/invitation_poster.jpg"
              alt="संपूर्ण पत्रिका झूम"
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
          <button
            onClick={() => setIsZoomed(false)}
            className="mt-4 px-6 py-2 rounded-full bg-white text-black font-body font-semibold text-sm shadow-lg"
          >
            बंद करा (Close) ✕
          </button>
        </div>
      )}
    </div>
  );
}
