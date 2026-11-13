import { useEffect, useRef } from 'react';

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const points = Array.from({ length: 4000 }, () => {
      const radius = 10 * Math.cbrt(Math.random());
      const azimuth = 2 * Math.PI * Math.random();
      const inclination = Math.acos(2 * Math.random() - 1);
      return [
        radius * Math.sin(inclination) * Math.cos(azimuth),
        radius * Math.sin(inclination) * Math.sin(azimuth),
        radius * Math.cos(inclination),
      ];
    });

    let frame = 0;
    let visible = false;
    let width = 0;
    let height = 0;
    let angleX = 0;
    let angleY = 0;
    let previousTime = 0;

    function draw() {
      if (!context) return;
      const focalLength = height / (2 * Math.tan(Math.PI / 8));
      const sinX = Math.sin(angleX);
      const cosX = Math.cos(angleX);
      const sinY = Math.sin(angleY);
      const cosY = Math.cos(angleY);
      const diagonal = Math.SQRT1_2;
      context.clearRect(0, 0, width, height);
      context.fillStyle = 'rgba(0, 0, 0, 0.3)';

      for (const [x, y, z] of points) {
        const rotatedX = x * cosY + z * sinY;
        const depth = z * cosY - x * sinY;
        const rotatedY = y * cosX - depth * sinX;
        const scale = focalLength / (15 - (y * sinX + depth * cosX));
        const size = Math.max(0.65, scale * 0.03);
        context.fillRect(
          width / 2 + (rotatedX - rotatedY) * diagonal * scale,
          height / 2 - (rotatedX + rotatedY) * diagonal * scale,
          size,
          size,
        );
      }
    }

    function animate(time: number) {
      const seconds = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      angleX -= seconds / 10;
      angleY -= seconds / 15;
      draw();
      frame = requestAnimationFrame(animate);
    }

    function updateAnimation() {
      cancelAnimationFrame(frame);
      previousTime = 0;
      if (visible && !reducedMotion.matches) frame = requestAnimationFrame(animate);
      else draw();
    }

    const resize = new ResizeObserver(() => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    });
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateAnimation();
    });
    resize.observe(canvas);
    visibility.observe(canvas);
    reducedMotion.addEventListener('change', updateAnimation);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      visibility.disconnect();
      reducedMotion.removeEventListener('change', updateAnimation);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full opacity-50" />;
}
