import React from 'react';
import { motion } from "motion/react";

export default function TermsOfService() {
  return (
    <section className="pt-40 pb-24 px-4 md:px-12 bg-bg relative z-20 w-full min-h-screen">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-indigo-500/5 rounded-full blur-[128px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-3 glass px-4 py-2 rounded-full border border-ink/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-ink/80">Omesh Sidda</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl leading-none tracking-tight uppercase mb-16 text-ink">
            Terms of Service
          </h1>

          <div className="prose prose-invert prose-lg text-ink/80 font-light leading-relaxed">
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-medium text-ink mt-12 mb-6">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this portfolio website, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use the site.
            </p>
            
            <h2 className="text-2xl font-medium text-ink mt-12 mb-6">2. Intellectual Property</h2>
            <p>
              The content, design, and source code featured on this site (unless derived from open-source material or otherwise credited) is the intellectual property of Omesh Sidda. You may not reproduce, distribute, or create derivative works from this content without express permission.
            </p>

            <h2 className="text-2xl font-medium text-ink mt-12 mb-6">3. Use of the Site</h2>
            <p>
              The materials provided here are meant for general informational purposes and to showcase my professional work and capabilities. Any unauthorized or malicious use of this site is strictly prohibited.
            </p>

            <h2 className="text-2xl font-medium text-ink mt-12 mb-6">4. Limitations of Liability</h2>
            <p>
              This website is provided on an "as-is" basis. I make no warranties regarding its continuous availability or functionality. I am not liable for any direct or indirect damages that result from your use of this site.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
