import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Project } from "../types";
import { Hero3D } from "../components/Hero3D";

export function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data.slice(0, 3)))
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/10 blur-[120px] rounded-full animate-pulse delay-1000" />
        </div>
        <Hero3D />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 glass rounded-full text-xs font-bold uppercase tracking-[0.3em] text-brand-primary mb-8">
              Digital Architect & Designer
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-8 leading-[0.9]">
              WEAVING <span className="text-gradient">LIGHT</span> INTO <br />
              DIGITAL <span className="italic font-light">STRUCTURES</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              Creating immersive digital environments where aesthetics meet high-performance engineering. 
              Specializing in futuristic UI/UX and motion systems.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link
                to="/projects"
                className="group px-8 py-4 bg-white text-black font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-brand-primary transition-all"
              >
                View Portfolio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 glass text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                The Process
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-linear-to-b from-brand-primary to-transparent" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 glass rounded-2xl hover:border-brand-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-brand-primary/10 flex items-center justify-center rounded-lg mb-6 group-hover:bg-brand-primary/20 transition-colors">
                <Sparkles className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-xl font-display font-bold uppercase tracking-widest mb-4">Aesthetic Precision</h3>
              <p className="text-white/50 leading-relaxed">
                Every pixel is placed with intentionality, ensuring a visual harmony that resonates with modern digital sensibilities.
              </p>
            </div>
            <div className="p-8 glass rounded-2xl hover:border-brand-secondary/50 transition-colors group">
              <div className="w-12 h-12 bg-brand-secondary/10 flex items-center justify-center rounded-lg mb-6 group-hover:bg-brand-secondary/20 transition-colors">
                <Zap className="w-6 h-6 text-brand-secondary" />
              </div>
              <h3 className="text-xl font-display font-bold uppercase tracking-widest mb-4">High Performance</h3>
              <p className="text-white/50 leading-relaxed">
                Optimized for speed and fluid interactions, bridging the gap between heavy visuals and seamless user experience.
              </p>
            </div>
            <div className="p-8 glass rounded-2xl hover:border-brand-accent/50 transition-colors group">
              <div className="w-12 h-12 bg-brand-accent/10 flex items-center justify-center rounded-lg mb-6 group-hover:bg-brand-accent/20 transition-colors">
                <Shield className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-xl font-display font-bold uppercase tracking-widest mb-4">Robust Architecture</h3>
              <p className="text-white/50 leading-relaxed">
                Built on solid foundations that scale, ensuring your digital presence remains future-proof and resilient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-brand-primary font-mono text-xs uppercase tracking-widest mb-4 block">Selected Works</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter uppercase">Featured <br />Architectures</h2>
            </div>
            <Link to="/projects" className="text-white/50 hover:text-white flex items-center gap-2 uppercase tracking-widest text-xs font-bold transition-colors">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="aspect-[4/5] overflow-hidden bg-white/5 rounded-2xl mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-2 block">{project.category}</span>
                    <h4 className="text-xl font-display font-bold uppercase tracking-tight transition-colors duration-300 group-hover:text-brand-primary">{project.title}</h4>
                  </div>
                  <span className="text-white/30 font-mono text-xs">{project.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative p-12 md:p-24 glass rounded-[3rem] overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-brand-primary/10 via-transparent to-brand-accent/10 pointer-events-none" />
            <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tighter mb-8 uppercase">Ready to build the <br /><span className="text-gradient">Future?</span></h2>
            <p className="text-xl text-white/50 max-w-xl mx-auto mb-12">
              Let's collaborate on your next digital masterpiece. 
              Currently accepting new architectural commissions.
            </p>
            <Link
              to="/contact"
              className="inline-block px-12 py-5 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand-primary transition-all"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
