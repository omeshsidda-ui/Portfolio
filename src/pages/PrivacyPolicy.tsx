import React from 'react';
import { motion } from "motion/react";

export default function PrivacyPolicy() {
  return (
    <section className="pt-40 pb-24 px-4 md:px-12 bg-bg relative z-20 w-full min-h-screen">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[128px] pointer-events-none" />
      
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
            Privacy Policy
          </h1>

          <div className="prose prose-invert prose-lg text-ink/80 font-light leading-relaxed">
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-medium text-ink mt-12 mb-6">1. Information Collection</h2>
            <p>
              I respect your privacy. This portfolio site is largely static and does not inherently collect any personal data automatically, except what you provide knowingly (e.g., via sending an email).
            </p>
            
            <h2 className="text-2xl font-medium text-ink mt-12 mb-6">2. Use of Information</h2>
            <p>
              Any information you provide, such as your email address when contacting me, is used solely for the purpose of communicating back with you regarding your inquiry, project, or opportunity. Your information will never be shared with third parties without your explicit consent.
            </p>

            <h2 className="text-2xl font-medium text-ink mt-12 mb-6">3. Third-Party Services</h2>
            <p>
              This website is hosted on Firebase, which may utilize essential cookies or log files for security and analytics performance (such as IP addresses and browser types). These are governed by Google's Privacy Policy. 
            </p>

            <h2 className="text-2xl font-medium text-ink mt-12 mb-6">4. Contact Me</h2>
            <p>
              If you have any questions or concerns about these privacy terms, feel free to reach out to me directly at <strong>omeshsidda@gmail.com</strong>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
