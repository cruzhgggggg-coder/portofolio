import React from "react";
import { motion } from "motion/react";
import { Hexagon, Layers, Cpu, Globe, Award, Zap, Shield, Code } from "lucide-react";
import { ImmersiveBackground } from "../components/ImmersiveBackground";

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  } as const;

  return (
    <div className="relative pt-32 pb-24 px-6 overflow-hidden">
      <ImmersiveBackground />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Hero Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center mb-40"
        >
          <div className="lg:col-span-7">
            <motion.span variants={itemVariants} className="text-brand-primary font-mono text-xs uppercase tracking-[0.4em] mb-6 block">
              The Digital Architect
            </motion.span>
            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-display font-bold tracking-tighter uppercase mb-10 leading-[0.85]">
              Designing the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-white to-brand-secondary">
                Invisible
              </span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-white/60 leading-relaxed mb-12 max-w-2xl font-light">
              I specialize in crafting immersive digital environments where human intuition meets architectural precision. 
              My philosophy is simple: <span className="text-white">digital structures should be as enduring and intentional as physical ones.</span>
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-12">
              <div className="group">
                <h4 className="text-brand-primary font-display font-bold text-5xl mb-2 group-hover:scale-110 transition-transform duration-500">08+</h4>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold">Years Experience</p>
              </div>
              <div className="group">
                <h4 className="text-brand-secondary font-display font-bold text-5xl mb-2 group-hover:scale-110 transition-transform duration-500">120+</h4>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold">Projects Built</p>
              </div>
              <div className="group">
                <h4 className="text-brand-accent font-display font-bold text-5xl mb-2 group-hover:scale-110 transition-transform duration-500">15+</h4>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold">Design Awards</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-[40px] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative aspect-[4/5] glass rounded-[40px] overflow-hidden border border-white/10 p-4">
              <div className="absolute inset-0 bg-black/20 z-10" />
              <motion.img 
                src="https://picsum.photos/seed/architect-portrait/800/1000" 
                alt="Architect" 
                className="w-full h-full object-cover rounded-[30px] grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
              {/* Decorative Elements */}
              <div className="absolute top-8 right-8 z-20">
                <Hexagon className="w-12 h-12 text-brand-primary animate-spin-slow opacity-50" />
              </div>
              <div className="absolute bottom-8 left-8 z-20">
                <div className="glass px-4 py-2 rounded-full border border-white/10 backdrop-blur-xl">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">Based in Tokyo</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Core Principles - Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-12 glass rounded-[40px] border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl rounded-full group-hover:bg-brand-primary/10 transition-colors" />
            <Layers className="w-12 h-12 text-brand-primary mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-display font-bold uppercase tracking-widest mb-6">Structural Integrity</h3>
            <p className="text-white/50 leading-relaxed text-lg">
              Code is the foundation. I architect clean, scalable, and performant systems that stand the test of time and traffic.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="p-12 glass rounded-[40px] border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/5 blur-3xl rounded-full group-hover:bg-brand-secondary/10 transition-colors" />
            <Cpu className="w-12 h-12 text-brand-secondary mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-display font-bold uppercase tracking-widest mb-6">Neural UX</h3>
            <p className="text-white/50 leading-relaxed text-lg">
              Interfaces that feel like an extension of the mind. I focus on cognitive load reduction and intuitive flow.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="p-12 glass rounded-[40px] border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 blur-3xl rounded-full group-hover:bg-brand-accent/10 transition-colors" />
            <Globe className="w-12 h-12 text-brand-accent mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-display font-bold uppercase tracking-widest mb-6">Global Reach</h3>
            <p className="text-white/50 leading-relaxed text-lg">
              Designing for a connected world. My architectures are inclusive, accessible, and culturally resonant.
            </p>
          </motion.div>
        </div>

        {/* Expertise Section */}
        <div className="mb-40">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-brand-primary font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block">Expertise</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter leading-none">Technical <br />Mastery</h2>
            </div>
            <p className="text-white/40 max-w-sm text-right leading-relaxed">
              A curated stack of technologies and methodologies refined over a decade of professional practice.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Code />, label: "Full-Stack Dev", color: "text-brand-primary" },
              { icon: <Zap />, label: "Performance", color: "text-brand-secondary" },
              { icon: <Shield />, label: "Security", color: "text-brand-accent" },
              { icon: <Award />, label: "UI/UX Design", color: "text-white" },
            ].map((skill, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="glass p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center group"
              >
                <div className={`${skill.color} mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  {React.cloneElement(skill.icon as React.ReactElement, { size: 32 })}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-white/80">{skill.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Philosophy Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative py-32 text-center"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
            <h2 className="text-[20vw] font-display font-black uppercase tracking-tighter leading-none select-none">
              Vision
            </h2>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-brand-primary font-mono text-[10px] uppercase tracking-[0.5em] mb-12">The Philosophy</h2>
            <blockquote className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight leading-tight mb-12">
              "We shape our digital structures; thereafter they shape our <span className="text-brand-primary">perception of reality</span>."
            </blockquote>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto" />
          </div>
        </motion.section>
      </div>
    </div>
  );
}
