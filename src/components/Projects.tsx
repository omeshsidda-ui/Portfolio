import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "INGENUE",
    desc: "A complete reimagining of the online shopping experience for a luxury women's clothing brand, focusing on seamless navigation and editorial-style product discovery.",
    tags: ["UX/UI Design", "E-commerce"],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "SONY",
    desc: "A conceptual corporate website redesign aimed at modernizing the brand's digital presence with immersive 3D product showcases and a dark, premium aesthetic.",
    tags: ["UX/UI Design", "Web Design"],
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "THE IRISH TIMES",
    desc: "A modern, typography-driven news platform concept designed to improve readability, user engagement, and content discoverability across all devices.",
    tags: ["UX/UI Design", "News website"],
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "EMPIRE",
    desc: "An exclusive digital platform for a luxury real estate clubhouse, featuring high-end property tours, member portals, and concierge service integrations.",
    tags: ["Web Design", "Real estate"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // Premium Parallax Effects
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <motion.div 
      ref={ref} 
      style={{ opacity }}
      className="relative w-full py-24 md:py-40 flex items-center justify-center group"
    >
      <div className="max-w-7xl mx-auto w-full px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        
        {/* Text Content */}
        <motion.div 
          style={{ y: textY }}
          className={`col-span-1 lg:col-span-5 flex flex-col z-20 ${!isEven ? 'lg:order-2' : ''}`}
        >
          {/* Meta Info */}
          <div className="flex items-center gap-6 mb-8 overflow-hidden">
            <motion.div 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-6"
            >
              <span className="text-xs font-bold tracking-widest uppercase text-ink/40">0{index + 1}</span>
              <div className="h-[1px] w-12 bg-ink/20" />
              <span className="text-xs font-bold tracking-widest uppercase text-accent">{project.tags[0]}</span>
            </motion.div>
          </div>
          
          {/* Title */}
          <div className="overflow-hidden py-2 mb-6">
            <motion.h3 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-7xl lg:text-[6rem] leading-none tracking-tight uppercase group-hover:text-accent transition-colors duration-700 pt-2"
            >
              {project.title}
            </motion.h3>
          </div>
          
          {/* Description */}
          <div className="overflow-hidden mb-12">
            <motion.p 
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-ink/60 font-light max-w-md leading-relaxed"
            >
              {project.desc}
            </motion.p>
          </div>
          
          {/* Tags & Button */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-center gap-8"
          >
            <button className="group/btn relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-ink px-8 py-4 text-xs font-bold uppercase tracking-widest text-bg transition-transform hover:scale-105 active:scale-95 w-fit">
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover/btn:text-ink">
                View Case <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover/btn:translate-x-1 group-hover/btn:-rotate-45" />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0" />
            </button>

            <div className="flex gap-3 flex-wrap">
              {project.tags.slice(1).map((tag, j) => (
                <span key={j} className="glass px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold text-ink/60">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Image Content */}
        <div className={`col-span-1 lg:col-span-7 relative z-10 ${!isEven ? 'lg:order-1' : ''}`}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-3xl glass-card p-2 shadow-2xl"
          >
            <div className="w-full h-full relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-bg/40 group-hover:bg-transparent transition-colors duration-1000 z-10" />
              <motion.img
                style={{ y: imgY, scale: 1.15 }}
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="flex flex-col w-full bg-bg relative z-20">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-12 pt-32 pb-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-ink/10 pb-16">
          <div className="overflow-hidden w-full lg:w-auto shrink-0">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-[8rem] leading-none tracking-tight uppercase pt-4"
            >
              Featured <br/> <span className="text-ink/40">Works</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-sm text-ink/60 font-light text-lg leading-relaxed"
          >
            A curated selection of my recent projects, showcasing digital experiences that blend form and function.
          </motion.p>
        </div>
      </div>

      {/* Projects List */}
      <div className="flex flex-col w-full pb-32">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
