import React, { useEffect, useState, useRef, Suspense } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Box, Torus } from "@react-three/drei";
import * as THREE from "three";
import { Project } from "../types";
import { ArrowUpRight, Box as BoxIcon, Image as ImageIcon } from "lucide-react";

function ProjectViewer3D({ projectId }: { projectId: string }) {
  return (
    <div className="w-full h-full bg-black/20">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
          
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            {projectId === "1" && (
              <mesh>
                <octahedronGeometry args={[1.5, 0]} />
                <MeshDistortMaterial 
                  color="#00f2ff" 
                  speed={2} 
                  distort={0.4} 
                  emissive="#00f2ff" 
                  emissiveIntensity={0.5}
                  wireframe
                />
              </mesh>
            )}
            {projectId === "3" && (
              <mesh>
                <icosahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial 
                  color="#7000ff" 
                  metalness={1} 
                  roughness={0.1} 
                  emissive="#7000ff"
                  emissiveIntensity={0.5}
                  wireframe
                />
              </mesh>
            )}
          </Float>
          
          <OrbitControls enablePan={false} minDistance={3} maxDistance={10} />
        </Suspense>
      </Canvas>
    </div>
  );
}

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
    <div className="relative pt-32 pb-24 px-6 overflow-hidden">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }} 
        />
        
        {/* Drifting Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-primary/20 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              y: ["-10%", "110%"],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 15 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 10,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-secondary/5 blur-[180px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <header className="mb-16">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-brand-primary font-mono text-xs uppercase tracking-widest mb-4 block"
          >
            Portfolio
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-5xl md:text-8xl font-display font-bold tracking-tighter uppercase mb-8"
          >
            Architectural <br />Works
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-500 ${
                  filter === cat 
                    ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]" 
                    : "glass text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [viewMode, setViewMode] = useState<"image" | "3d">("image");
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (viewMode === "3d") return; // Disable tilt in 3D mode to avoid conflict with OrbitControls
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1, 
        delay: index * 0.2,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: viewMode === "image" ? rotateX : 0,
        rotateY: viewMode === "image" ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className="group cursor-pointer relative"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative aspect-[4/5] md:aspect-video overflow-hidden bg-white/5 rounded-[40px] mb-8 shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {viewMode === "image" ? (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-700 z-10" />
              
              {/* Parallax Background Layer */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-transparent to-brand-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0"
                initial={{ scale: 1.2, x: 0, y: 0 }}
                whileHover={{ scale: 1.4, x: -30, y: -30 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 relative z-0"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center z-20">
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  whileHover={{ scale: 1.1, rotate: 0 }}
                  className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.4)]"
                >
                  <ArrowUpRight className="w-10 h-10" />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="3d"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <ProjectViewer3D projectId={project.id} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Toggle Button */}
        {project.hasModel && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewMode(viewMode === "image" ? "3d" : "image");
            }}
            className="absolute top-6 right-6 z-40 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            {viewMode === "image" ? <BoxIcon className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
          </button>
        )}

        {/* Subtle Overlay Text */}
        <div className="absolute bottom-8 left-8 z-30 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
          <span className="text-white font-mono text-[10px] uppercase tracking-[0.3em] bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {viewMode === "image" ? "Explore Project" : "Interactive 3D"}
          </span>
        </div>
      </div>
      
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="flex justify-between items-end px-4"
      >
        <motion.div
          initial={{ x: 0 }}
          whileHover={{ x: 15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="px-4 py-1.5 glass rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary border border-brand-primary/20">
              {project.category}
            </span>
            <span className="text-white/30 font-mono text-xs tracking-widest">{project.year}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter group-hover:text-brand-primary transition-colors duration-500">
            {project.title}
          </h2>
          <motion.p 
            initial={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
            className="text-white/40 mt-6 max-w-md leading-relaxed text-sm md:text-base group-hover:text-white/60 transition-colors duration-500"
          >
            {project.description}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
