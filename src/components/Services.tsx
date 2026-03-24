import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { MouseEvent } from "react";
import { Layout, Smartphone, Globe, Sparkles, Layers, Cpu } from "lucide-react";

// Premium Bento Card with Mouse-Tracking Glow Effect
function BentoCard({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-[2rem] border border-ink/10 bg-ink/[0.02] overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Subtle White Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.06),
              transparent 40%
            )
          `,
        }}
      />
      {/* Accent Color Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100 mix-blend-screen"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              var(--color-accent),
              transparent 40%
            )
          `,
          opacity: 0.15,
        }}
      />
      
      {/* Content Container */}
      <div className="relative h-full w-full p-8 md:p-12 z-10 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}

const services = [
  {
    icon: <Layout className="w-6 h-6" />,
    title: "UX/UI Design",
    desc: "Crafting intuitive, user-centric interfaces that seamlessly blend aesthetics with flawless functionality.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Web Development",
    desc: "Building robust, scalable, and lightning-fast web applications using cutting-edge modern frameworks.",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile Experiences",
    desc: "Designing responsive, app-like mobile experiences that engage users on any device, anywhere.",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Brand Identity",
    desc: "Developing cohesive visual systems and brand guidelines that resonate with your target audience.",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Design Systems",
    desc: "Creating scalable, reusable component libraries to ensure absolute consistency across all products.",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Prototyping",
    desc: "Rapidly validating concepts with high-fidelity, interactive prototypes before a single line of code is written.",
  },
];

const skills = [
  "Figma", "Framer", "React", "TypeScript", "Tailwind CSS", "Next.js", "WebGL", "Three.js", "Node.js", "GSAP"
];

export default function Services() {
  return (
    <section id="about" className="py-24 md:py-40 bg-bg relative z-20 w-full overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-accent/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-ink/10 pb-16 mb-16">
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-7xl lg:text-[8rem] leading-none tracking-tight uppercase pt-4"
            >
              Expertise & <br/> <span className="text-ink/40">Capabilities</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-sm text-ink/60 font-light text-lg leading-relaxed"
          >
            A multidisciplinary approach combining strategic thinking, high-end design, and flawless technical execution.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Philosophy / About - Spans 8 cols */}
          <BentoCard className="lg:col-span-8" delay={0.1}>
            <div className="flex flex-col justify-between h-full gap-12">
              <div className="w-12 h-12 rounded-full border border-ink/20 flex items-center justify-center text-accent">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl md:text-4xl font-light leading-tight text-ink mb-6">
                  I believe that true digital luxury lies in the invisible details.
                </h3>
                <p className="text-lg md:text-xl font-light leading-relaxed text-ink/60 max-w-2xl">
                  My philosophy centers on creating experiences that don't just look beautiful, but feel intuitive, responsive, and alive. By bridging the gap between aesthetic design and complex engineering, I deliver products that drive measurable business growth while leaving a lasting impression.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Core Skills - Spans 4 cols */}
          <BentoCard className="lg:col-span-4" delay={0.2}>
            <div className="flex flex-col h-full">
              <h4 className="text-xs font-bold uppercase tracking-widest mb-8 text-accent">Core Arsenal</h4>
              <div className="flex flex-wrap gap-3 mt-auto">
                {skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-ink/10 bg-ink/5 text-xs font-medium text-ink/80 hover:bg-ink hover:text-bg hover:border-ink transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Services Grid - Spans 12 cols */}
          <BentoCard className="lg:col-span-12 p-0 md:p-0" delay={0.3}>
            <div className="p-8 md:p-12 border-b border-ink/10">
              <h4 className="text-xs font-bold uppercase tracking-widest text-accent">Specialized Services</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ink/10">
              {services.map((service, i) => (
                <div key={i} className="p-8 md:p-12 group/service hover:bg-ink/[0.02] transition-colors duration-500">
                  <div className="w-12 h-12 rounded-full bg-ink/5 flex items-center justify-center text-ink/60 mb-8 group-hover/service:text-accent group-hover/service:bg-accent/10 transition-colors duration-500">
                    {service.icon}
                  </div>
                  <h5 className="text-xl font-medium mb-4 text-ink group-hover/service:text-accent transition-colors duration-500">
                    {service.title}
                  </h5>
                  <p className="text-ink/60 font-light leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
