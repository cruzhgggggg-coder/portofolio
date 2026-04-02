import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Project } from "../types";
import { ArrowUpRight } from "lucide-react";

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter((p) => p.category === filter);

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <span className="text-brand-primary font-mono text-xs uppercase tracking-widest mb-4 block">Portfolio</span>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter uppercase mb-8">Architectural <br />Works</h1>
          
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  filter === cat 
                    ? "bg-white text-black" 
                    : "glass text-white/50 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-video overflow-hidden bg-white/5 rounded-3xl mb-8">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                    <ArrowUpRight className="w-8 h-8" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                      {project.category}
                    </span>
                    <span className="text-white/30 font-mono text-xs">{project.year}</span>
                  </div>
                  <h2 className="text-3xl font-display font-bold uppercase tracking-tight group-hover:text-brand-primary transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-white/50 mt-4 max-w-md leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
