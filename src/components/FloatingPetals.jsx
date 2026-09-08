import React, { useEffect, useRef } from 'react';

// Generates falling petals: Pink orchid petals, deep red rose petals, and marigold petals
export default function FloatingPetals({ count = 28, density = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Petal types
    const petalColors = [
      { fill: '#E85D88', stroke: '#C83B68', type: 'pink-rose' },     // Blush rose
      { fill: '#B51756', stroke: '#850F3D', type: 'wine-petal' },    // Deep magenta
      { fill: '#F59E0B', stroke: '#D97706', type: 'marigold' },      // Bright marigold
      { fill: '#FCE7F3', stroke: '#F472B6', type: 'orchid-white' },  // Orchid pale
      { fill: '#E11D48', stroke: '#9F1239', type: 'hibiscus' },      // Sacred red hibiscus
    ];

    const actualCount = Math.floor(count * density);
    const petals = Array.from({ length: actualCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height * 0.5,
      size: 10 + Math.random() * 14,
      speedY: 0.8 + Math.random() * 1.6,
      speedX: -0.6 + Math.random() * 1.2,
      oscillationSpeed: 0.015 + Math.random() * 0.025,
      oscillationDistance: 20 + Math.random() * 35,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: -0.02 + Math.random() * 0.04,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.01 + Math.random() * 0.025,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      opacity: 0.65 + Math.random() * 0.3,
    }));

    let time = 0;

    const render = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(time * p.oscillationSpeed) * (p.speedX * 0.7);
        p.angle += p.angularSpeed;
        p.flip += p.flipSpeed;

        // Reset when out of view
        if (p.y > canvas.height + 30) {
          p.y = -30;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -30) p.x = canvas.width + 30;
        if (p.x > canvas.width + 30) p.x = -30;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(Math.sin(p.flip), 1);
        ctx.globalAlpha = p.opacity;

        // Draw elegant organic petal shape
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(
          p.size * 0.75, -p.size * 0.5,
          p.size * 0.9, p.size * 0.6,
          0, p.size
        );
        ctx.bezierCurveTo(
          -p.size * 0.9, p.size * 0.6,
          -p.size * 0.75, -p.size * 0.5,
          0, -p.size
        );
        ctx.closePath();

        // Gradient on petal
        const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, p.size);
        grad.addColorStop(0, '#FFF5F8');
        grad.addColorStop(0.4, p.color.fill);
        grad.addColorStop(1, p.color.stroke);

        ctx.fillStyle = grad;
        ctx.fill();

        // Subtle center petal vein
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.8);
        ctx.lineTo(0, p.size * 0.7);
        ctx.strokeStyle = p.color.stroke;
        ctx.lineWidth = 0.6;
        ctx.globalAlpha = p.opacity * 0.4;
        ctx.stroke();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, density]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30"
      style={{ opacity: 0.92 }}
    />
  );
}
