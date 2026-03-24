import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  MotionValue
} from "motion/react";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
  smoothSpeed: MotionValue<number>;
}

function ParallaxText({ children, baseVelocity = 100, smoothSpeed }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // Skew effect based on scroll velocity for that premium dynamic feel
  const skewX = useTransform(smoothVelocity, [-1000, 1000], [-3, 3]);

  // Wrap the x position between -50% and 0% for a seamless infinite loop
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Change direction based on scroll velocity
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    // Apply scroll velocity and hover speed multiplier
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    moveBy *= smoothSpeed.get();
    
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap m-0">
      <motion.div className="flex whitespace-nowrap flex-nowrap gap-8 md:gap-16 items-center" style={{ x, skewX }}>
        {/* Render children twice to ensure seamless loop (0 to -50%) */}
        <div className="flex items-center gap-8 md:gap-16 pr-8 md:pr-16">{children}</div>
        <div className="flex items-center gap-8 md:gap-16 pr-8 md:pr-16">{children}</div>
      </motion.div>
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-16 md:h-16 text-accent shrink-0">
      <path d="M12 0L13.8 8.2L22 10L13.8 11.8L12 20L10.2 11.8L2 10L10.2 8.2L12 0Z" fill="currentColor" />
    </svg>
  );
}

export default function Marquee() {
  const items = ["SELECTED WORKS", "SELECTED WORKS", "SELECTED WORKS", "SELECTED WORKS", "SELECTED WORKS", "SELECTED WORKS"];
  
  // Smooth speed multiplier for hover effect
  const speedMultiplier = useMotionValue(1);
  const smoothSpeed = useSpring(speedMultiplier, { damping: 50, stiffness: 400 });

  return (
    <section 
      className="relative py-24 md:py-32 overflow-hidden bg-bg flex flex-col gap-8 md:gap-12 border-y border-ink/10 cursor-default"
      onMouseEnter={() => speedMultiplier.set(0.2)}
      onMouseLeave={() => speedMultiplier.set(1)}
    >
      {/* Gradient Masks for smooth fade at edges */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      {/* Top Row - Moves Left */}
      <ParallaxText baseVelocity={-4} smoothSpeed={smoothSpeed}>
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-8 md:gap-16">
            <span className={`font-display text-6xl md:text-8xl lg:text-[9rem] leading-none tracking-tighter uppercase ${i % 2 === 0 ? 'text-ink' : 'text-outline'}`}>
              {item}
            </span>
            <StarIcon />
          </div>
        ))}
      </ParallaxText>
      
      {/* Bottom Row - Moves Right */}
      <ParallaxText baseVelocity={4} smoothSpeed={smoothSpeed}>
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-8 md:gap-16">
            <span className={`font-display text-6xl md:text-8xl lg:text-[9rem] leading-none tracking-tighter uppercase ${i % 2 !== 0 ? 'text-ink' : 'text-outline'}`}>
              {item}
            </span>
            <StarIcon />
          </div>
        ))}
      </ParallaxText>
    </section>
  );
}
