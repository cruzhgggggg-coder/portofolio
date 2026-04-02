import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";

export function ImmersiveBackground() {
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse tracking
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Background shifts based on scroll
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.03, 0.06, 0.03]);
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  
  // Interactive grid shift
  const gridX = useTransform(smoothX, [-0.5, 0.5], ["-3%", "3%"]);
  const gridY = useTransform(smoothY, [-0.5, 0.5], ["-3%", "3%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-50" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Primary Dynamic Interactive Grid */}
      <motion.div 
        className="absolute inset-[-10%] opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          opacity: bgOpacity,
          scale: gridScale,
          x: gridX,
          y: gridY,
        }} 
      />

      {/* Secondary Finer Grid */}
      <motion.div 
        className="absolute inset-[-10%] opacity-[0.01]" 
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          scale: useTransform(gridScale, (v) => v * 1.05),
          x: useTransform(gridX, (v) => typeof v === 'string' ? `calc(${v} * 0.5)` : v * 0.5),
          y: useTransform(gridY, (v) => typeof v === 'string' ? `calc(${v} * 0.5)` : v * 0.5),
        }} 
      />

      {/* Interactive Floating Particles */}
      {[...Array(40)].map((_, i) => (
        <Particle key={i} smoothX={smoothX} smoothY={smoothY} index={i} />
      ))}

      {/* Ambient Drifting Glows - Nebula Style */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-brand-primary/10 blur-[180px] rounded-full mix-blend-screen" 
      />
      <motion.div 
        animate={{ 
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-10%] w-[900px] h-[900px] bg-brand-secondary/10 blur-[220px] rounded-full mix-blend-screen" 
      />
      <motion.div 
        animate={{ 
          x: [0, 60, 0],
          y: [0, -40, 0],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-brand-accent/5 blur-[150px] rounded-full mix-blend-screen" 
      />
      
      {/* Center Glow that follows mouse subtly */}
      <motion.div 
        style={{ 
          x: useTransform(smoothX, [-0.5, 0.5], ["-150px", "150px"]),
          y: useTransform(smoothY, [-0.5, 0.5], ["-150px", "150px"]),
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-primary/5 blur-[300px] rounded-full"
      />

      {/* Subtle Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
    </div>
  );
}

function Particle({ smoothX, smoothY, index }: { smoothX: any, smoothY: any, index: number }) {
  const initialX = useRef(Math.random() * 100);
  const initialY = useRef(Math.random() * 100);
  const size = useRef(Math.random() * 2 + 1);
  const speed = useRef(15 + Math.random() * 15);
  const delay = useRef(Math.random() * 10);

  // Reaction to mouse
  const offsetX = useTransform(smoothX, [-0.5, 0.5], [index % 2 === 0 ? 30 : -30, index % 2 === 0 ? -30 : 30]);
  const offsetY = useTransform(smoothY, [-0.5, 0.5], [index % 2 === 0 ? 30 : -30, index % 2 === 0 ? -30 : 30]);

  return (
    <motion.div
      className="absolute bg-brand-primary/20 rounded-full"
      style={{ 
        width: size.current, 
        height: size.current,
        left: `${initialX.current}%`,
        top: `${initialY.current}%`,
        x: offsetX,
        y: offsetY,
      }}
      animate={{ 
        y: ["0%", "100%", "0%"],
        opacity: [0, 0.4, 0]
      }}
      transition={{ 
        duration: speed.current, 
        repeat: Infinity, 
        delay: delay.current,
        ease: "linear"
      }}
    />
  );
}
