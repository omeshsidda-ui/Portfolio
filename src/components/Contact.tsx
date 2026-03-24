import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, Copy, Check } from "lucide-react";

// Premium Magnetic Button for the Copy action
function MagneticCopyButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
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

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCopy}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-ink text-bg hover:bg-accent hover:text-ink transition-colors duration-500 overflow-hidden group"
      aria-label="Copy email address"
    >
      <motion.div
        initial={false}
        animate={{ y: copied ? -40 : 0, opacity: copied ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Copy className="w-6 h-6 md:w-8 md:h-8" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ y: copied ? 0 : 40, opacity: copied ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Check className="w-6 h-6 md:w-8 md:h-8" />
      </motion.div>
    </motion.button>
  );
}

const socials = [
  { name: "Behance", url: "#" },
  { name: "Instagram", url: "#" },
  { name: "Facebook", url: "#" },
  { name: "LinkedIn", url: "#" },
];

export default function Contact() {
  const email = "sergey28sergey74@gmail.com";

  return (
    <section id="contact" className="py-24 md:py-40 bg-bg relative z-20 w-full overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute bottom-0 right-0 w-[40rem] md:w-[60rem] h-[40rem] md:h-[60rem] bg-accent/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-12 relative z-10">
        
        {/* Massive Cinematic Header */}
        <div className="flex flex-col mb-24 md:mb-40 w-full">
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[6rem] md:text-[12rem] lg:text-[16rem] leading-[0.85] tracking-tighter uppercase text-left pt-4"
            >
              LET'S
            </motion.h2>
          </div>
          <div className="overflow-hidden flex justify-end w-full">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[6rem] md:text-[12rem] lg:text-[16rem] leading-[0.85] tracking-tighter uppercase text-outline text-right pt-4"
            >
              TALK
            </motion.h2>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 border-t border-ink/10 pt-16 md:pt-24">
          
          {/* Left Column: Email & Intro */}
          <div className="lg:col-span-7 flex flex-col gap-12 md:gap-16">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl md:text-4xl font-light leading-relaxed text-ink/80 max-w-xl"
            >
              Ready to create something extraordinary? Let's build the next big thing together.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-8"
            >
              <a 
                href={`mailto:${email}`} 
                className="group relative inline-flex text-2xl md:text-4xl lg:text-5xl font-display uppercase tracking-tight text-ink hover:text-accent transition-colors duration-500 w-fit"
              >
                {email}
                {/* Animated Underline */}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-accent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </a>
              <MagneticCopyButton email={email} />
            </motion.div>
          </div>

          {/* Right Column: Socials & Location */}
          <div className="lg:col-span-4 lg:col-start-9 grid grid-cols-2 gap-8 md:gap-12">
            
            {/* Socials */}
            <div className="flex flex-col gap-8">
              <motion.h4 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs font-bold uppercase tracking-widest text-accent"
              >
                Socials
              </motion.h4>
              <div className="flex flex-col gap-4">
                {socials.map((social, i) => (
                  <motion.a 
                    key={social.name}
                    href={social.url}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-center gap-2 text-lg md:text-xl font-light text-ink/80 hover:text-accent transition-colors duration-300 w-fit"
                  >
                    <span className="relative overflow-hidden">
                      <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                        {social.name}
                      </span>
                      <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-accent">
                        {social.name}
                      </span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-4 translate-y-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Location & Phone */}
            <div className="flex flex-col gap-8">
              <motion.h4 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs font-bold uppercase tracking-widest text-accent"
              >
                Location
              </motion.h4>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6"
              >
                <p className="text-lg md:text-xl font-light text-ink/80 leading-relaxed">
                  Kyiv,<br />Ukraine
                </p>
                <a 
                  href="tel:+380962980099" 
                  className="group relative inline-flex text-lg md:text-xl font-light text-ink/80 hover:text-accent transition-colors duration-300 w-fit"
                >
                  +380962980099
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
