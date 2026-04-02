import React from "react";
import { Link } from "react-router-dom";
import { Hexagon, Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Hexagon className="w-6 h-6 text-brand-primary" />
            <span className="font-display font-bold text-lg tracking-tighter uppercase">
              Luminescent<span className="text-brand-primary">Architect</span>
            </span>
          </div>
          <p className="text-white/50 max-w-md leading-relaxed">
            Crafting digital experiences at the intersection of light, motion, and code. 
            Building the next generation of architectural interfaces for the digital age.
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold uppercase tracking-widest text-sm mb-6">Explore</h4>
          <ul className="flex flex-col gap-4">
            <li><Link to="/" className="text-white/50 hover:text-brand-primary transition-colors">Home</Link></li>
            <li><Link to="/projects" className="text-white/50 hover:text-brand-primary transition-colors">Projects</Link></li>
            <li><Link to="/about" className="text-white/50 hover:text-brand-primary transition-colors">About</Link></li>
            <li><Link to="/contact" className="text-white/50 hover:text-brand-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold uppercase tracking-widest text-sm mb-6">Connect</h4>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 glass flex items-center justify-center rounded-full hover:bg-brand-primary hover:text-black transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 glass flex items-center justify-center rounded-full hover:bg-brand-secondary hover:text-white transition-all">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 glass flex items-center justify-center rounded-full hover:bg-brand-accent hover:text-white transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 glass flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-all">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4">
        <p className="text-white/30 text-xs uppercase tracking-widest">
          © 2024 Luminescent Architect. All Rights Reserved.
        </p>
        <p className="text-white/30 text-xs uppercase tracking-widest">
          Designed with <span className="text-brand-accent">❤</span> for the future.
        </p>
      </div>
    </footer>
  );
}
