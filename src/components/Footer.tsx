import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { ArrowUp } from "lucide-react";

// Premium Magnetic Button for "Back to Top"
function MagneticButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: e.clientX - center.x, y: e.clientY - center.y };
    x.set(distance.x * 0.2);
    y.set(distance.y * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full border border-ink/20 text-ink hover:bg-accent hover:text-ink hover:border-accent transition-colors duration-500 overflow-hidden group"
      aria-label="Back to top"
    >
      <motion.div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
        {children}
      </motion.div>
      <motion.div className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
        {children}
      </motion.div>
    </motion.button>
  );
}

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Europe/Kyiv",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now) + " KYIV");
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-bg pt-20 md:pt-32 pb-8 px-4 md:px-12 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16 md:gap-24">
        
        {/* Top Section: Info & Back to Top */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          
          <div className="flex flex-col gap-8 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4"
            >
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </div>
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-ink/60">
                Available for freelance
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs md:text-sm font-bold text-ink/40 uppercase tracking-widest mb-2">
                Local Time
              </p>
              <p className="text-xl md:text-2xl font-mono font-light text-ink">
                {time || "LOADING..."}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="self-end md:self-auto"
          >
            <MagneticButton onClick={scrollToTop}>
              <ArrowUp className="w-6 h-6 md:w-8 md:h-8" />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Massive Name */}
        <div className="w-full border-b border-ink/10 pb-12 md:pb-20 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row justify-between items-center w-full font-display text-[16vw] md:text-[10vw] leading-[0.8] tracking-tighter uppercase text-ink"
          >
            <span>SERHII</span>
            <span className="text-accent md:text-ink md:hover:text-accent transition-colors duration-500">KORZHOV</span>
          </motion.div>
        </div>

        {/* Bottom Section: Copyright & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xs md:text-sm font-medium uppercase tracking-widest text-ink/40 text-center md:text-left"
          >
            © {currentYear} Serhii Korzhov. All rights reserved.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-wrap justify-center md:justify-end items-center gap-6 md:gap-10 text-xs md:text-sm font-medium uppercase tracking-widest text-ink/40"
          >
            <a href="#" className="hover:text-accent transition-colors duration-300 relative group">
              Privacy Policy
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-accent transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
            </a>
            <a href="#" className="hover:text-accent transition-colors duration-300 relative group">
              Terms of Service
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-accent transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
            </a>
          </motion.div>
        </div>

      </div>
    </footer>
  );
}
