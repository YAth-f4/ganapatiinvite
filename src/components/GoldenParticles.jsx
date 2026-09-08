import React, { useEffect, useRef } from 'react';

export default function GoldenParticles({ count = 40 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 1 + Math.random() * 2.5,
      speedY: -0.2 - Math.random() * 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      alpha: Math.random(),
      fadeSpeed: 0.005 + Math.random() * 0.015,
      growing: Math.random() > 0.5,
      color: Math.random() > 0.3 ? '#FFDF79' : '#FFE8A3',
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.growing) {
          p.alpha += p.fadeSpeed;
          if (p.alpha >= 0.85) p.growing = false;
        } else {
          p.alpha -= p.fadeSpeed;
          if (p.alpha <= 0.1) p.growing = true;
        }

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20"
      style={{ opacity: 0.8 }}
    />
  );
}
