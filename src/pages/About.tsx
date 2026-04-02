import React from "react";
import { motion } from "motion/react";
import { Hexagon, Layers, Cpu, Globe } from "lucide-react";

export function About() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-primary font-mono text-xs uppercase tracking-widest mb-4 block">The Architect</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase mb-8 leading-[0.9]">
              Designing the <br /><span className="text-gradient">Invisible</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed mb-8">
              I am a digital architect focused on building immersive interfaces that bridge the gap between human intuition and machine complexity. 
              My work is rooted in the belief that digital structures should be as enduring and intentional as physical ones.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-brand-primary font-display font-bold text-3xl mb-2">08+</h4>
                <p className="text-white/40 text-xs uppercase tracking-widest">Years Experience</p>
              </div>
              <div>
                <h4 className="text-brand-secondary font-display font-bold text-3xl mb-2">120+</h4>
                <p className="text-white/40 text-xs uppercase tracking-widest">Projects Built</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 bg-linear-to-br from-brand-primary/20 to-brand-secondary/20 rounded-3xl blur-3xl animate-pulse" />
            <div className="relative w-full h-full glass rounded-3xl overflow-hidden flex items-center justify-center">
               <Hexagon className="w-48 h-48 text-brand-primary/20 animate-spin-slow" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="https://picsum.photos/seed/architect/800/800" 
                    alt="Architect" 
                    className="w-4/5 h-4/5 object-cover rounded-2xl grayscale opacity-80"
                    referrerPolicy="no-referrer"
                  />
               </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          <div className="p-10 glass rounded-3xl">
            <Layers className="w-10 h-10 text-brand-primary mb-6" />
            <h3 className="text-xl font-display font-bold uppercase tracking-widest mb-4">Structural Integrity</h3>
            <p className="text-white/50 leading-relaxed">
              Code is the foundation. I write clean, scalable, and performant systems that stand the test of time and traffic.
            </p>
          </div>
          <div className="p-10 glass rounded-3xl">
            <Cpu className="w-10 h-10 text-brand-secondary mb-6" />
            <h3 className="text-xl font-display font-bold uppercase tracking-widest mb-4">Neural UX</h3>
            <p className="text-white/50 leading-relaxed">
              Interfaces that feel like an extension of the mind. I focus on cognitive load reduction and intuitive flow.
            </p>
          </div>
          <div className="p-10 glass rounded-3xl">
            <Globe className="w-10 h-10 text-brand-accent mb-6" />
            <h3 className="text-xl font-display font-bold uppercase tracking-widest mb-4">Global Reach</h3>
            <p className="text-white/50 leading-relaxed">
              Designing for a connected world. My architectures are inclusive, accessible, and culturally resonant.
            </p>
          </div>
        </div>

        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold uppercase tracking-widest mb-8">The Philosophy</h2>
          <p className="text-white/40 italic text-lg leading-relaxed">
            "We shape our buildings; thereafter they shape us. In the digital realm, we shape our interfaces; thereafter they shape our perception of reality."
          </p>
        </section>
      </div>
    </div>
  );
}
