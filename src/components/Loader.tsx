import { motion, animate, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  // useMotionValue allows us to animate the number without triggering React re-renders (buttery smooth 60fps+)
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    // Animate from 0 to 100 over 2.5 seconds with our premium easing curve
    const controls = animate(count, 100, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        // Add a tiny delay at 100% before triggering the exit animation
        setTimeout(onComplete, 200);
      },
    });

    return controls.stop;
  }, [count, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-bg flex flex-col justify-between p-6 md:p-12 overflow-hidden"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top Bar - Micro-copy */}
      <div className="flex justify-between items-start text-ink/60 text-xs md:text-sm font-medium tracking-widest uppercase">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Serhii Korzhov <br /> Portfolio ©{new Date().getFullYear()}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Initializing
        </motion.div>
      </div>

      {/* Bottom Section - Progress & Counter */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        
        {/* Progress Bar */}
        <motion.div 
          className="w-full md:w-1/3 max-w-sm mb-4 md:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="h-[1px] w-full bg-ink/10 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-ink"
              style={{ width: useTransform(count, (v) => `${v}%`) }}
            />
          </div>
        </motion.div>

        {/* Massive Counter */}
        <div className="flex items-baseline">
          <motion.div 
            className="font-display text-[25vw] md:text-[20vw] leading-none tracking-tighter text-ink"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span>{rounded}</motion.span>
          </motion.div>
          <motion.span 
            className="text-2xl md:text-5xl font-display text-accent mb-4 md:mb-12 ml-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            %
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
