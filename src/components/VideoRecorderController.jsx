import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, X, CheckCircle, Loader2 } from 'lucide-react';
import { audioService } from '../utils/audioService';
import { ensureRealMp4 } from '../utils/mp4Converter';

const VideoRecorderController = forwardRef(function VideoRecorderController({
  isRecording,
  currentChapter,
  onStartRecordingFlow,
  onStopRecording,
}, ref) {
  const [showPostModal, setShowPostModal] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const streamRef = useRef(null);

  // Directly start recording when user clicks the existing button
  useImperativeHandle(ref, () => ({
    startDirectRecording: () => {
      initiateRecording();
    },
  }));

  const initiateRecording = async () => {
    setErrorMessage(null);

    try {
      // Direct screen/tab capture request
      const displayMediaOptions = {
        video: {
          displaySurface: 'browser',
          width: { ideal: 1080 },
          height: { ideal: 1920 },
          frameRate: { ideal: 30, max: 60 },
        },
        audio: true,
        preferCurrentTab: true,
        selfBrowserSurface: 'include',
      };

      let stream;
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      } else {
        throw new Error('आपल्या ब्राउझरमध्ये स्क्रीन रेकॉर्डिंग सुविधा उपलब्ध नाही.');
      }

      // Mix Web Audio synth if available
      const synthStream = audioService.getAudioStreamDestination();
      if (synthStream) {
        synthStream.getAudioTracks().forEach((track) => {
          stream.addTrack(track);
        });
      }

      streamRef.current = stream;

      // Handle user stopping stream from browser chrome bar
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.onended = () => {
          stopRecordingInternal();
        };
      }

      // Prioritize authentic native MP4 container
      const mp4Mimes = [
        'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
        'video/mp4;codecs=avc1,mp4a.40.2',
        'video/mp4;codecs=avc1',
        'video/mp4;codecs=h264,aac',
        'video/mp4',
        'video/webm;codecs=vp9,opus',
        'video/webm',
      ];
      let selectedMime = mp4Mimes.find((type) => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(type)) || '';

      const recorder = new MediaRecorder(
        stream,
        selectedMime
          ? {
              mimeType: selectedMime,
              videoBitsPerSecond: 5_000_000,
            }
          : {}
      );

      mediaRecorderRef.current = recorder;
      recordedChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        setIsConverting(true);
        setShowPostModal(true);

        const rawBlob = new Blob(recordedChunksRef.current, {
          type: selectedMime || 'video/mp4',
        });

        // Ensure genuine MP4 format (H.264/AAC ISO container)
        const genuineMp4Blob = await ensureRealMp4(rawBlob);

        setRecordedBlob(genuineMp4Blob);
        const url = URL.createObjectURL(genuineMp4Blob);
        setRecordedVideoUrl(url);
        setIsConverting(false);

        // Stop all media tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }

        if (onStopRecording) onStopRecording();
      };

      recorder.start(500);
      audioService.startAmbience();

      // Trigger automatic deterministic story timeline starting at Scene 1 ("गणराया परतले...")
      if (onStartRecordingFlow) {
        onStartRecordingFlow(stopRecordingInternal);
      }
    } catch (err) {
      console.warn('Recording permission cancelled/denied:', err);
      if (onStopRecording) onStopRecording();
    }
  };

  const stopRecordingInternal = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        console.warn('Recorder stop error:', e);
      }
    }
  };

  const downloadVideo = () => {
    if (!recordedBlob) return;
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = recordedVideoUrl;
    // Exactly as requested: Ganpati_Invitation_2024.mp4
    a.download = 'Ganpati_Invitation_2024.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleRestartRecording = () => {
    setShowPostModal(false);
    if (recordedVideoUrl) {
      URL.revokeObjectURL(recordedVideoUrl);
      setRecordedVideoUrl(null);
    }
    setRecordedBlob(null);
    initiateRecording();
  };

  const handleClosePostModal = () => {
    setShowPostModal(false);
  };

  return (
    <>
      {/* NO in-screen recording indicator or REC text is rendered during recording!
          The captured video looks 100% like the normal website experience. */}

      {/* Hidden button trigger for programmatic invocation */}
      <button
        id="open-record-modal-trigger"
        className="hidden"
        onClick={initiateRecording}
      />

      {/* Post-Recording Completed Modal (Displayed only AFTER recording stops, outside the video) */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-xl rounded-3xl p-5 sm:p-8 text-center bg-cream-ivory border-2 border-gold-primary shadow-2xl max-h-[95vh] overflow-y-auto"
          >
            <button
              onClick={handleClosePostModal}
              className="absolute top-4 right-4 p-2 text-maroon-deep/60 hover:text-maroon-deep"
              title="बंद करा"
            >
              <X className="w-5 h-5" />
            </button>

            {isConverting ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-10 h-10 text-wine-magenta animate-spin" />
                <p className="font-rozha text-lg text-wine-magenta">
                  MP4 व्हिडिओ तयार होत आहे...
                </p>
                <p className="text-xs text-maroon-deep/70 font-body">
                  कृपया काही क्षण वाट पहा.
                </p>
              </div>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>यशस्वीरित्या रेकॉर्ड झाले!</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-rozha text-wine-magenta my-2">
                  आपले आमंत्रण तयार आहे! ❤️
                </h3>

                <p className="text-xs sm:text-sm font-body text-maroon-deep/80 mb-4">
                  खालील व्हिडिओ पहा आणि थेट आपल्या फोनमध्ये डाउनलोड करून WhatsApp व Instagram वर पाठवा.
                </p>

                {/* Video Player Preview */}
                {recordedVideoUrl && (
                  <div className="relative rounded-2xl overflow-hidden aspect-[9/16] max-h-[420px] mx-auto bg-black shadow-inner mb-6 border border-gold-primary/40">
                    <video
                      src={recordedVideoUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={downloadVideo}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-wine-magenta text-gold-light font-body font-bold text-sm sm:text-base shadow-xl hover:bg-maroon-deep transition-all active:scale-95 flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #801438 0%, #A23386 100%)',
                      border: '1.5px solid rgba(212, 175, 55, 0.8)',
                    }}
                  >
                    <Download className="w-5 h-5 text-gold-light" />
                    <span>⬇️ व्हिडिओ जतन करा (Ganpati_Invitation_2024.mp4)</span>
                  </button>

                  <button
                    onClick={handleRestartRecording}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-cream-soft border border-gold-primary text-maroon-deep font-body font-semibold text-sm hover:bg-gold-light/40 transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4 text-wine-magenta" />
                    <span>🔄 पुन्हा तयार करा</span>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
});

export default VideoRecorderController;
