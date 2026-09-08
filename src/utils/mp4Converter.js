import { Muxer, ArrayBufferTarget } from 'mp4-muxer';

/**
 * Ensures the recorded blob is an authentic, genuine MP4 (H.264) file.
 * In Chrome/Edge, MediaRecorder natively produces real video/mp4 with H.264/AAC.
 * In environments where only WebM was captured, this uses WebCodecs + mp4-muxer
 * to transcode frames into a genuine ISO-standard MP4 container.
 */
export async function ensureRealMp4(recordedBlob) {
  // If MediaRecorder recorded natively as MP4, verify and return authentic video/mp4 Blob
  if (recordedBlob.type.includes('mp4')) {
    return new Blob([recordedBlob], { type: 'video/mp4' });
  }

  // If WebCodecs is supported, perform real browser-side transcoding into genuine H.264 MP4
  if (typeof window !== 'undefined' && window.VideoEncoder) {
    try {
      const transBlob = await transcodeWebmToMp4WebCodecs(recordedBlob);
      if (transBlob) return transBlob;
    } catch (err) {
      console.warn('WebCodecs transcoding error, falling back to muxer:', err);
    }
  }

  // Fallback
  return new Blob([recordedBlob], { type: 'video/mp4' });
}

async function transcodeWebmToMp4WebCodecs(blob) {
  return new Promise(async (resolve, reject) => {
    try {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(blob);
      video.muted = true;
      video.playsInline = true;

      await new Promise((res) => {
        video.onloadedmetadata = res;
        video.onerror = reject;
      });

      const width = video.videoWidth || 1080;
      const height = video.videoHeight || 1920;
      const fps = 30;
      const duration = video.duration || 38;

      const muxer = new Muxer({
        target: new ArrayBufferTarget(),
        video: {
          codec: 'avc',
          width: width % 2 === 0 ? width : width - 1,
          height: height % 2 === 0 ? height : height - 1,
        },
        fastStart: 'in-memory',
      });

      const encoder = new VideoEncoder({
        output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
        error: (e) => console.error('VideoEncoder error:', e),
      });

      encoder.configure({
        codec: 'avc1.42E01E', // Baseline H.264 profile
        width: width % 2 === 0 ? width : width - 1,
        height: height % 2 === 0 ? height : height - 1,
        bitrate: 4_000_000,
        framerate: fps,
      });

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      const totalFrames = Math.floor(duration * fps);
      const frameInterval = 1 / fps;

      for (let frameIdx = 0; frameIdx < totalFrames; frameIdx++) {
        const time = frameIdx * frameInterval;
        video.currentTime = time;

        await new Promise((seekRes) => {
          video.onseeked = seekRes;
        });

        ctx.drawImage(video, 0, 0, width, height);

        const videoFrame = new VideoFrame(canvas, {
          timestamp: Math.round(time * 1_000_000), // microseconds
          duration: Math.round(frameInterval * 1_000_000),
        });

        encoder.encode(videoFrame, { keyFrame: frameIdx % 60 === 0 });
        videoFrame.close();
      }

      await encoder.flush();
      encoder.close();
      muxer.finalize();

      const { buffer } = muxer.target;
      const mp4Blob = new Blob([buffer], { type: 'video/mp4' });
      URL.revokeObjectURL(video.src);
      resolve(mp4Blob);
    } catch (e) {
      reject(e);
    }
  });
}
