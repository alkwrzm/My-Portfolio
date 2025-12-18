"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function StarField(props: ThreeElements['points']) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = useRef<any>(null);
    const [sphere] = useState(() => {
        const coords = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 1.2 * Math.cbrt(Math.random()); // Radius roughly 1.2

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            coords[i * 3] = x;
            coords[i * 3 + 1] = y;
            coords[i * 3 + 2] = z;
        }
        return coords;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 60;
            ref.current.rotation.y -= delta / 80;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Points ref={ref as any} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#A855F7" // Neon Purple
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
        </group>
    );
}



function Rocket() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const groupRef = useRef<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const engineRef = useRef<any>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();

        // Horizontal flight path (Left to Right)
        const speed = 1.5;
        const range = 14;
        // Maps continuous time to -7 ... +7 cycle
        const x = ((t * speed) % range) - (range / 2);

        groupRef.current.position.set(x, 0, -2);

        // Rotate to point right (Nose +Y -> +X)
        // Cylinder is Y-up. Rotate -90 deg around Z.
        groupRef.current.rotation.set(0, 0, -Math.PI / 2);

        // Engine flicker
        if (engineRef.current) {
            engineRef.current.scale.y = 1 + Math.sin(t * 20) * 0.2;
            engineRef.current.position.y = -0.7 - Math.sin(t * 20) * 0.05;
        }
    });

    return (
        <group ref={groupRef} scale={[0.12, 0.12, 0.12]}>
            {/* Main Body - Higher Poly */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.25, 1.2, 32]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.4} roughness={0.2} emissive="#333333" />
            </mesh>

            {/* Nose Cone - Sleeker */}
            <mesh position={[0, 0.85, 0]}>
                <coneGeometry args={[0.2, 0.5, 32]} />
                <meshStandardMaterial color="#ef4444" metalness={0.3} roughness={0.4} />
            </mesh>

            {/* Connector Ring */}
            <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.2, 0.02, 16, 32]} />
                <meshStandardMaterial color="#334155" metalness={0.8} />
            </mesh>

            {/* Window with Frame */}
            <group position={[0, 0.2, 0.22]} rotation={[0.2, 0, 0]}>
                {/* Frame */}
                <mesh>
                    <torusGeometry args={[0.08, 0.015, 16, 32]} />
                    <meshStandardMaterial color="#94a3b8" metalness={0.9} />
                </mesh>
                {/* Glass */}
                <mesh position={[0, 0, -0.02]}>
                    <circleGeometry args={[0.07, 32]} />
                    <meshStandardMaterial color="#3b82f6" emissive="#2563eb" emissiveIntensity={0.5} toneMapped={false} />
                </mesh>
            </group>

            {/* Aerodynamic Fins */}
            {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
                <group key={i} rotation={[0, angle, 0]}>
                    <mesh position={[0.22, -0.5, 0]}>
                        {/* Custom shape via simplified geometry or sticking to primitives but better placed */}
                        <boxGeometry args={[0.1, 0.4, 0.02]} />
                        <meshStandardMaterial color="#ef4444" metalness={0.3} />
                    </mesh>
                    {/* Wing tip */}
                    <mesh position={[0.25, -0.6, 0]} rotation={[0, 0, -0.5]}>
                        <boxGeometry args={[0.08, 0.3, 0.02]} />
                        <meshStandardMaterial color="#dc2626" />
                    </mesh>
                </group>
            ))}

            {/* Thruster Ring */}
            <mesh position={[0, -0.65, 0]}>
                <cylinderGeometry args={[0.15, 0.2, 0.1, 32]} />
                <meshStandardMaterial color="#475569" metalness={0.8} />
            </mesh>

            {/* Animated Engine Fire */}
            <mesh ref={engineRef} position={[0, -0.85, 0]}>
                <coneGeometry args={[0.12, 0.4, 16]} />
                <meshBasicMaterial color="#fbbf24" transparent opacity={0.9} />
            </mesh>
            {/* Core Fire */}
            <mesh position={[0, -0.8, 0]}>
                <coneGeometry args={[0.06, 0.3, 16]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
            </mesh>
        </group>
    )
}




function SaucerShip() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const groupRef = useRef<any>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();

        // Wide horizontal orbit, higher up
        const x = Math.cos(t * 0.15) * 3.5;
        const z = Math.sin(t * 0.15) * 2 - 3;
        const y = 1.5 + Math.sin(t * 0.5) * 0.2; // Hovering high

        groupRef.current.position.set(x, y, z);
        groupRef.current.rotation.y = t; // Spin
        groupRef.current.rotation.z = Math.sin(t * 2) * 0.1; // Wobble
    });

    return (
        <group ref={groupRef} scale={[0.2, 0.2, 0.2]}>
            {/* Dome */}
            <mesh position={[0, 0.2, 0]}>
                <sphereGeometry args={[0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#60a5fa" roughness={0.1} opacity={0.6} transparent />
            </mesh>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.6, 0.3, 0.2, 32]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Bottom Light */}
            <mesh position={[0, -0.1, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
                <meshBasicMaterial color="#a855f7" />
            </mesh>
            {/* Ring Lights */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <mesh key={i} position={[Math.cos(i * Math.PI / 4) * 0.5, 0, Math.sin(i * Math.PI / 4) * 0.5]}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshBasicMaterial color="#22c55e" />
                </mesh>
            ))}
        </group>
    );
}

function FighterShip() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const groupRef = useRef<any>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();

        // Faster, diagonal swoops
        const x = Math.sin(t * 0.4 + 2) * 3;
        const y = Math.cos(t * 0.3 + 1) * 2 - 1;
        const z = Math.cos(t * 0.2) * 1 - 2.5;

        groupRef.current.position.set(x, y, z);

        // Bank into turn
        const nextX = Math.sin((t + 0.1) * 0.4 + 2) * 3;
        const nextY = Math.cos((t + 0.1) * 0.3 + 1) * 2 - 1;
        const nextZ = Math.cos((t + 0.1) * 0.2) * 1 - 2.5;

        groupRef.current.lookAt(nextX, nextY, nextZ);
        groupRef.current.rotateZ(Math.sin(t) * 0.5); // Bank
    });

    return (
        <group ref={groupRef} scale={[0.15, 0.15, 0.15]}>
            {/* Main Body */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.2, 1, 4]} /> {/* Triangular prism-ish */}
                <meshStandardMaterial color="#cbd5e1" metalness={0.6} />
            </mesh>
            {/* Wings */}
            <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
                <boxGeometry args={[1, 0.05, 0.4]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.6} />
            </mesh>
            {/* Engines */}
            <mesh position={[0.3, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.12, 0.4, 8]} />
                <meshStandardMaterial color="#475569" />
            </mesh>
            <mesh position={[-0.3, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.12, 0.4, 8]} />
                <meshStandardMaterial color="#475569" />
            </mesh>
            {/* Thrusters */}
            <mesh position={[0.3, 0, 0.55]}>
                <sphereGeometry args={[0.08]} />
                <meshBasicMaterial color="#3b82f6" />
            </mesh>
            <mesh position={[-0.3, 0, 0.55]}>
                <sphereGeometry args={[0.08]} />
                <meshBasicMaterial color="#3b82f6" />
            </mesh>
        </group>
    )
}

export default function HeroBackground() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
                {/* Increased ambient light for general visibility */}
                <ambientLight intensity={0.8} />

                {/* Main purple light */}
                <pointLight position={[10, 10, 10]} intensity={2} color="#A855F7" />

                {/* Fill light to make sure rocket isn't dark on the other side */}
                <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />

                <StarField />
                <Rocket />
                <SaucerShip />
                <FighterShip />
            </Canvas>
        </div>
    );
}
