"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, MeshDistortMaterial, Environment, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// INSTANT FALLBACK: Matches the target High-Fidelity look
const InstantFallback = () => (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0 transition-opacity duration-1000 opacity-100">
        <div className="relative w-64 h-64 animate-bounce duration-[2000ms]">
            {/* Body Gradient - Deep Pink Metallic */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_#ff8fab,_#d6336c,_#a61e4d)] rounded-full shadow-2xl" />

            {/* Eyes */}
            <div className="absolute top-[35%] left-[25%] w-14 h-14 bg-black rounded-full shadow-inner"><div className="absolute top-3 right-3 w-4 h-4 bg-white rounded-full blur-[1px]" /></div>
            <div className="absolute top-[35%] right-[25%] w-14 h-14 bg-black rounded-full shadow-inner"><div className="absolute top-3 right-3 w-4 h-4 bg-white rounded-full blur-[1px]" /></div>

            {/* Cheeks */}
            <div className="absolute top-[58%] left-[12%] w-10 h-10 bg-[#FFD43B] rounded-full opacity-60 blur-sm mix-blend-overlay" />
            <div className="absolute top-[58%] right-[12%] w-10 h-10 bg-[#FFD43B] rounded-full opacity-60 blur-sm mix-blend-overlay" />

            {/* Mouth */}
            <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-16 h-8 border-b-[6px] border-[#5c1c2f] rounded-full" />

            {/* Antenna - Glowing Cyan */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-14 bg-[#A5F3FC]" />
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#E0F2FE] rounded-full shadow-[0_0_20px_#22D3EE]" />
        </div>
    </div>
);

function CuteCharacter() {
    const groupRef = useRef<THREE.Group>(null);

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={groupRef}>
                {/* BODY: Darker Metallic Pink */}
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <MeshDistortMaterial
                        color="#D946A6" // Deeper, richer pink
                        attach="material"
                        distort={0.3}
                        speed={2}
                        roughness={0.25}
                        metalness={0.4}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                    />
                </mesh>

                {/* EYES: MATTE Black (Fixes 'Doubled' Reflection) */}
                <mesh position={[-0.35, 0.2, 0.9]}>
                    <sphereGeometry args={[0.2, 32, 32]} />
                    <meshStandardMaterial color="#000000" roughness={1} metalness={0} />
                </mesh>
                <mesh position={[0.35, 0.2, 0.9]}>
                    <sphereGeometry args={[0.2, 32, 32]} />
                    <meshStandardMaterial color="#000000" roughness={1} metalness={0} />
                </mesh>

                {/* EYE HIGHLIGHTS: Geometry Only (Clean White Dot) */}
                <mesh position={[-0.22, 0.35, 1.05]}>
                    <sphereGeometry args={[0.07, 16, 16]} />
                    <meshBasicMaterial color="#FFFFFF" />
                </mesh>
                <mesh position={[0.48, 0.35, 1.05]}>
                    <sphereGeometry args={[0.07, 16, 16]} />
                    <meshBasicMaterial color="#FFFFFF" />
                </mesh>

                {/* MOUTH: Matte dark red */}
                <mesh position={[0, -0.15, 0.95]} rotation={[0, 0, Math.PI]}>
                    <torusGeometry args={[0.22, 0.07, 16, 32, Math.PI]} />
                    <meshStandardMaterial color="#831843" roughness={1} />
                </mesh>

                {/* CHEEKS: Solid (Fixes transparency overlap issues) */}
                <mesh position={[-0.65, -0.1, 0.8]}>
                    <sphereGeometry args={[0.18, 32, 32]} />
                    <meshStandardMaterial color="#FCD34D" roughness={1} />
                </mesh>
                <mesh position={[0.65, -0.1, 0.8]}>
                    <sphereGeometry args={[0.18, 32, 32]} />
                    <meshStandardMaterial color="#FCD34D" roughness={1} />
                </mesh>

                {/* ANTENNA */}
                <mesh position={[0, 1.1, 0]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.4, 16]} />
                    <meshStandardMaterial color="#CFFAFE" roughness={0.1} />
                </mesh>
                <mesh position={[0, 1.4, 0]}>
                    <sphereGeometry args={[0.12, 32, 32]} />
                    <meshStandardMaterial
                        color="#E0F2FE"
                        emissive="#22D3EE"
                        emissiveIntensity={0.5}
                        toneMapped={false}
                    />
                </mesh>
            </group>
        </Float>
    );
}

export default function ThreeDCharacter() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="w-full h-full relative touch-none">
            {/* Fallback - Removed immediately on mount */}
            {!mounted && <InstantFallback />}

            {/* 3D Scene */}
            {mounted && (
                <div className="absolute inset-0 z-10 animate-in fade-in duration-500">
                    <Canvas dpr={[1, 2]} gl={{ alpha: true, antialias: true, toneMapping: THREE.NoToneMapping }}>
                        <PerspectiveCamera makeDefault position={[0, 0, 4.2]} />

                        {/* Interactive Controls - Drag to Rotate */}
                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            minPolarAngle={Math.PI / 4}
                            maxPolarAngle={Math.PI - Math.PI / 4}
                            enableDamping
                            dampingFactor={0.05}
                        />

                        <Environment preset="city" />
                        <ambientLight intensity={0.4} />

                        <spotLight
                            position={[5, 10, 7.5]}
                            angle={0.25}
                            penumbra={1}
                            intensity={0.8}
                            color="#FFFFFF"
                        />

                        <React.Suspense fallback={null}>
                            <CuteCharacter />
                        </React.Suspense>
                    </Canvas>
                </div>
            )}
        </div>
    );
}
