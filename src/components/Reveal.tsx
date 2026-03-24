import { motion } from "motion/react";
import { ReactNode, Key } from "react";
import { cn } from "../utils/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: string | number;
  key?: Key;
}

export function Reveal({ children, className, delay = 0, duration = 0.8, y = "100%" }: RevealProps) {
  return (
    <div className={cn("overflow-hidden inline-block", className)}>
      <motion.div
        initial={{ y, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function RevealText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <div className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden inline-block mr-[0.25em]">
          <motion.div
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: delay + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {word}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
