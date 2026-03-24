import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 50, stiffness: 400 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
    mouseX.set(x);
    mouseY.set(y);
  };

  // Parallax transforms
  const bgX1 = useTransform(smoothX, [-1, 1], [-50, 50]);
  const bgY1 = useTransform(smoothY, [-1, 1], [-50, 50]);
  const bgX2 = useTransform(smoothX, [-1, 1], [50, -50]);
  const bgY2 = useTransform(smoothY, [-1, 1], [50, -50]);
  const imgX = useTransform(smoothX, [-1, 1], [-15, 15]);
  const imgY = useTransform(smoothY, [-1, 1], [-15, 15]);

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="min-h-screen flex flex-col justify-center px-4 py-32 md:px-12 relative overflow-hidden"
    >
      {/* Background Glows with Parallax */}
      <motion.div 
        style={{ x: bgX1, y: bgY1 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] pointer-events-none" 
      />
      <motion.div 
        style={{ x: bgX2, y: bgY2 }}
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[128px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start relative z-20">
            
            {/* Badge */}
            <div className="overflow-hidden mb-8">
              <motion.div 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
                className="glass px-4 py-2 rounded-full inline-flex items-center gap-3 border border-ink/10 shadow-lg"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-ink/80">Available for work</span>
              </motion.div>
            </div>

            {/* Typography */}
            <div className="flex flex-col gap-2 mb-8">
              <div className="overflow-hidden py-2">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 2.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-6xl md:text-8xl lg:text-[7.5rem] leading-none tracking-tight pt-2"
                >
                  VIBECODER
                </motion.h1>
              </div>
              <div className="overflow-hidden py-2">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-6xl md:text-8xl lg:text-[7.5rem] leading-none tracking-tight text-gradient pt-2"
                >
                  & WEB APP
                </motion.h1>
              </div>
              <div className="overflow-hidden py-2">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 2.9, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-6xl md:text-8xl lg:text-[7.5rem] leading-none tracking-tight pt-2"
                >
                  DEVELOPER
                </motion.h1>
              </div>
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden">
              <motion.p 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 3.0, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-xl text-ink/60 max-w-md leading-relaxed font-light"
              >
                Hi, I'm Omesh. I'm a 17-year-old developer passionate about vibecoding, web designing, and app building.
              </motion.p>
            </div>

            {/* CTAs */}
            <div className="overflow-hidden mt-12">
              <motion.div 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 3.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-8"
              >
                <a href="#work" className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-ink px-8 py-4 text-xs font-bold uppercase tracking-widest text-bg transition-transform hover:scale-105 active:scale-95">
                  <span className="relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover:text-ink">
                    View Work <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                </a>
                <a href="#contact" className="group relative text-xs font-bold tracking-widest uppercase text-ink/70 hover:text-ink transition-colors">
                  Contact Me
                  <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="lg:col-span-5 relative z-10" style={{ perspective: "1000px" }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, rotateY: 10 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 1.5, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ x: imgX, y: imgY }}
              className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden glass-card p-2 group shadow-2xl"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent z-10 transition-opacity duration-700 group-hover:opacity-60" />
                
                {/* Image */}
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
                  alt="Omesh Sidda"
                  className="w-full h-full object-cover grayscale transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] scale-105 group-hover:scale-100 group-hover:grayscale-0"
                />
                
                {/* Stats Overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                  <div className="flex flex-col gap-1 overflow-hidden">
                    <motion.span 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[10px] uppercase tracking-widest text-ink/60 font-bold"
                    >
                      Location
                    </motion.span>
                    <motion.span 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 3.3, ease: [0.16, 1, 0.3, 1] }}
                      className="text-sm font-medium"
                    >
                      Globe
                    </motion.span>
                  </div>
                  <div className="flex flex-col gap-1 text-right overflow-hidden">
                    <motion.span 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 3.4, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[10px] uppercase tracking-widest text-ink/60 font-bold"
                    >
                      Age
                    </motion.span>
                    <motion.span 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
                      className="text-sm font-medium"
                    >
                      17
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
