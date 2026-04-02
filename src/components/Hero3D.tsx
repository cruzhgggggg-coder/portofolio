// @ts-nocheck
import React, { useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      cylinderGeometry: any;
      meshStandardMaterial: any;
      torusGeometry: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      points: any;
      bufferGeometry: any;
      bufferAttribute: any;
      pointsMaterial: any;
    }
  }
}

function DigitalDust() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00f2ff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingEmbers() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 100;
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      pointsRef.current.position.y = Math.sin(time * 0.1) * 2;
      pointsRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#7000ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GeometricBeacons() {
  const groupRef = useRef<THREE.Group>(null);
  
  const beacons = React.useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 25,
        Math.random() * 10,
        (Math.random() - 0.5) * 25
      ] as [number, number, number],
      speed: 0.2 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.children.forEach((child, i) => {
        const beacon = beacons[i];
        child.position.y += Math.sin(time * beacon.speed + beacon.offset) * 0.01;
        child.rotation.x = time * 0.5;
        child.rotation.z = time * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {beacons.map((beacon, i) => (
        <mesh key={i} position={beacon.position}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial 
            color="#00f2ff" 
            emissive="#00f2ff" 
            emissiveIntensity={4} 
          />
          <pointLight intensity={0.5} distance={5} color="#00f2ff" />
        </mesh>
      ))}
    </group>
  );
}

function FuturisticBuilding() {
  const groupRef = useRef<THREE.Group>(null);
  const spireMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Base rotation
      groupRef.current.rotation.y = time * 0.15;
      
      // Subtle mouse reaction (even with static camera, this adds depth)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        state.mouse.y * 0.05,
        0.05
      );
    }

    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.5;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -time * 0.3;

    // Dynamic pulsing glow for the central spire
    if (spireMaterialRef.current) {
      spireMaterialRef.current.emissiveIntensity = 2 + Math.sin(time * 2) * 1.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef} position={[-2, -2, -2]} scale={0.8}>
        {/* Central Spire */}
        <mesh position={[0, 3, 0]}>
          <cylinderGeometry args={[0.1, 0.6, 8, 6]} />
          <meshStandardMaterial 
            ref={spireMaterialRef}
            color="#00f2ff" 
            emissive="#00f2ff" 
            emissiveIntensity={2} 
            wireframe 
            transparent 
            opacity={0.8}
          />
        </mesh>
        
        {/* Core Structure */}
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.5, 0.8, 4, 6]} />
          <meshStandardMaterial 
            color="#050505" 
            metalness={1} 
            roughness={0.1} 
            emissive="#001a1a"
          />
        </mesh>

        {/* Floating Rings */}
        <mesh ref={ring1Ref} position={[0, 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.8, 0.03, 16, 100]} />
          <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={3} />
        </mesh>
        
        <mesh ref={ring2Ref} position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.02, 16, 100]} />
          <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={3} />
        </mesh>

        {/* Base Platform */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[3, 3.5, 0.4, 6]} />
          <meshStandardMaterial color="#000" metalness={1} roughness={0} />
        </mesh>
      </group>
    </Float>
  );
}

function StreamWave() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const count = 60;
  const sep = 0.6;

  const colorBlue = new THREE.Color("#00f2ff");
  const colorPurple = new THREE.Color("#7000ff");

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current && materialRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array;
      let i = 0;
      for (let x = 0; x < count; x++) {
        for (let y = 0; y < count; y++) {
          const xPos = (x - count / 2) * sep;
          const yPos = (y - count / 2) * sep;
          const zPos = Math.sin(xPos * 0.6 + time) * Math.cos(yPos * 0.6 + time * 0.8) * 2;
          positions[i * 3 + 2] = zPos;
          i++;
        }
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;

      const lerpFactor = (Math.sin(time * 0.3) + 1) / 2;
      materialRef.current.color.lerpColors(colorBlue, colorPurple, lerpFactor);
      materialRef.current.emissive.lerpColors(colorBlue, colorPurple, lerpFactor);
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -5, -5]}>
      <planeGeometry args={[40, 40, count - 1, count - 1]} />
      <meshStandardMaterial 
        ref={materialRef}
        color="#00f2ff" 
        emissive="#00f2ff" 
        emissiveIntensity={2} 
        wireframe 
        transparent 
        opacity={0.3} 
      />
    </mesh>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas 
        dpr={[1, 2]} 
        shadows 
        camera={{ position: [0, 8, 18], fov: 45 }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}

function SceneContent() {
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Subtle breathing/floating camera effect
    state.camera.position.y = 8 + Math.sin(time * 0.5) * 0.5;
    state.camera.position.x = Math.cos(time * 0.3) * 0.3;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <fog attach="fog" args={["#000", 10, 40]} />
      <ambientLight intensity={0.2} />
      <spotLight 
        position={[20, 20, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={2} 
        color="#00f2ff" 
        castShadow 
      />
      <pointLight position={[-10, 10, -10]} intensity={1} color="#7000ff" />
      <pointLight position={[0, -5, 5]} intensity={2} color="#00f2ff" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <DigitalDust />
      <FloatingEmbers />
      <GeometricBeacons />
      <StreamWave />
      <FuturisticBuilding />
    </>
  );
}
