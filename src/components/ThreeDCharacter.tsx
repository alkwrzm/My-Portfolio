"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import LoadingState from './LoadingState';

function CuteCharacter() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;

        // Gentle floating
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;

        // Slight rotation
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    });

    return (
        <group ref={groupRef}>
            {/* Main body - cute blob */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color="#FF6B9D"
                    attach="material"
                    distort={0.25} // Reduced distortion to prevent clipping
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>

            {/* Eyes - Moved forward and slightly larger */}
            <mesh position={[-0.35, 0.2, 0.95]}>
                <sphereGeometry args={[0.18, 32, 32]} />
                <meshStandardMaterial color="#000000" roughness={0.1} />
            </mesh>
            <mesh position={[0.35, 0.2, 0.95]}>
                <sphereGeometry args={[0.18, 32, 32]} />
                <meshStandardMaterial color="#000000" roughness={0.1} />
            </mesh>

            {/* Eye highlights - Moved forward */}
            <mesh position={[-0.25, 0.3, 1.05]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={1} />
            </mesh>
            <mesh position={[0.4, 0.3, 1.05]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={1} />
            </mesh>

            {/* Mouth - Moved forward */}
            <mesh position={[0, -0.15, 1.0]} rotation={[0, 0, Math.PI]}>
                <torusGeometry args={[0.2, 0.06, 16, 32, Math.PI]} />
                <meshStandardMaterial color="#4A0404" />
            </mesh>

            {/* Cheek blushes - Moved forward */}
            <mesh position={[-0.6, 0, 0.85]}>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshStandardMaterial color="#FFD93D" transparent opacity={0.6} />
            </mesh>
            <mesh position={[0.6, 0, 0.85]}>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshStandardMaterial color="#FFD93D" transparent opacity={0.6} />
            </mesh>

            {/* Antenna */}
            <mesh position={[0, 1.2, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.5]} />
                <meshStandardMaterial color="#7FFFD4" emissive="#7FFFD4" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, 1.5, 0]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color="#7FFFD4" emissive="#7FFFD4" emissiveIntensity={1} />
            </mesh>
        </group>
    );
}

export default function ThreeDCharacter() {
    return (
        <div className="w-full h-full relative">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 4]} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} color="#FF6B9D" />
                <pointLight position={[-5, -5, -5]} intensity={0.5} color="#7FFFD4" />
                <pointLight position={[0, 5, 0]} intensity={0.5} color="#FFD93D" />

                <OrbitControls enableZoom={false} minPolarAngle={0} maxPolarAngle={Math.PI} />
                <Environment preset="city" />

                <React.Suspense fallback={<LoadingState />}>
                    <CuteCharacter />
                </React.Suspense>
            </Canvas>
        </div>
    );
}
