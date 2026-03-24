import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const stages = [
  {
    title: "BRIEFING",
    desc: "We begin by deeply understanding your vision, target audience, and business objectives. This foundational phase ensures every subsequent decision aligns perfectly with your goals and sets the stage for a successful partnership.",
    tags: ["Discovery", "Strategy", "Alignment"],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&auto=format&fit=crop",
  },
  { 
    title: "ANALYTICS", 
    desc: "Rigorous market research and competitor analysis allow us to identify opportunities and craft a data-driven strategy. We don't just guess; we position your brand for absolute market leadership based on hard facts.",
    tags: ["Research", "Data", "Positioning"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
  },
  { 
    title: "PROTOTYPING", 
    desc: "We translate strategy into structure. By creating detailed wireframes and interactive prototypes, we visualize the user flow and architecture, allowing for rapid iteration before committing to high-fidelity design.",
    tags: ["Wireframes", "UX", "User Flow"],
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=1600&auto=format&fit=crop",
  },
  { 
    title: "DESIGN", 
    desc: "This is where your brand comes to life. We develop a bespoke visual style, meticulously crafting UI elements, typography, and micro-interactions that elevate the aesthetic and create an unforgettable digital experience.",
    tags: ["UI Design", "Aesthetics", "Motion"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1600&auto=format&fit=crop",
  },
  { 
    title: "ADAPTIVE", 
    desc: "A flawless experience across every device is non-negotiable. We rigorously adapt and test the design for mobile, tablet, and desktop, ensuring pixel-perfect responsiveness and uncompromised performance everywhere.",
    tags: ["Responsive", "Mobile-First", "QA"],
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1600&auto=format&fit=crop",
  },
  { 
    title: "THE FINAL", 
    desc: "The culmination of our process. We prepare all assets, create a comprehensive UI kit, and seamlessly hand over the project to developers, ensuring the final build matches the vision with absolute precision.",
    tags: ["Handoff", "Assets", "Launch"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
  },
];

function AccordionItem({ stage, index, isOpen, onClick }: { stage: typeof stages[0], index: number, isOpen: boolean, onClick: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-ink/10 group"
    >
      <button
        onClick={onClick}
        className="w-full py-8 md:py-12 flex items-center justify-between text-left transition-colors"
      >
        <div className="flex items-center gap-6 md:gap-16 w-full">
          <span className={`text-2xl md:text-4xl font-light transition-colors duration-500 ${isOpen ? 'text-accent' : 'text-ink/30 group-hover:text-ink/60'}`}>
            0{index + 1}
          </span>
          <h3 className={`font-display text-4xl md:text-6xl lg:text-7xl tracking-tight uppercase transition-colors duration-500 ${isOpen ? 'text-accent' : 'text-ink group-hover:text-accent'}`}>
            {stage.title}
          </h3>
        </div>
        
        {/* Animated Plus/Minus Icon */}
        <div className={`relative w-12 h-12 shrink-0 flex items-center justify-center rounded-full border transition-colors duration-500 ${isOpen ? 'border-accent' : 'border-ink/20 group-hover:border-accent'}`}>
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 0, backgroundColor: isOpen ? 'var(--color-accent)' : 'var(--color-ink)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-4 h-[1.5px] group-hover:bg-accent transition-colors" 
          />
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 90, opacity: isOpen ? 0 : 1, backgroundColor: isOpen ? 'var(--color-accent)' : 'var(--color-ink)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-4 h-[1.5px] group-hover:bg-accent transition-colors" 
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-12 pt-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Text & Tags */}
              <div className="lg:col-span-5 lg:col-start-2 flex flex-col gap-8">
                <p className="text-lg md:text-xl text-ink/70 font-light leading-relaxed">
                  {stage.desc}
                </p>
                <div className="flex flex-wrap gap-3">
                  {stage.tags.map((tag, j) => (
                    <span key={j} className="glass px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold text-ink/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Image */}
              <div className="lg:col-span-5">
                <div className="w-full aspect-video md:aspect-[16/9] rounded-3xl overflow-hidden glass-card p-2 shadow-2xl">
                  <div className="w-full h-full relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-bg/20 hover:bg-transparent transition-colors duration-1000 z-10" />
                    <img 
                      src={stage.image} 
                      alt={stage.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] scale-105 hover:scale-100" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Process() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-40 bg-bg relative z-20 w-full">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-12">
        
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
              Development <br/> <span className="text-ink/40">Process</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-sm text-ink/60 font-light text-lg leading-relaxed"
          >
            A meticulous, proven methodology designed to transform visionary concepts into flawless digital realities.
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="w-full">
          {stages.map((stage, i) => (
            <AccordionItem 
              key={i} 
              stage={stage} 
              index={i} 
              isOpen={openIndex === i} 
              onClick={() => setOpenIndex(openIndex === i ? null : i)} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
