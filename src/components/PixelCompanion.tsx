"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type CompanionState = "idle" | "run" | "win";

interface PixelCompanionProps {
    initialState?: CompanionState;
    className?: string;
}

export default function PixelCompanion({ initialState = "idle", className }: PixelCompanionProps) {
    const [state] = useState<CompanionState>(initialState);

    // Simple state switching logic demo
    useEffect(() => {
        // Ideally this listens to global state or context
    }, [state]);

    return (
        <div className={cn("relative w-16 h-16 pointer-events-none z-50", className)}>
            <motion.div
                className="w-full h-full"
                animate={state}
                variants={{
                    idle: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2 } },
                    run: { x: [0, 5, 0], transition: { repeat: Infinity, duration: 0.5 } },
                    win: { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0], transition: { duration: 0.5 } },
                }}
            >
                {/* Placeholder for Sprite */}
                <div className="w-12 h-12 bg-primary/20 border-2 border-primary rounded-sm relative pixelated">
                    <div className="absolute top-2 left-2 w-2 h-2 bg-primary" />
                    <div className="absolute top-2 right-2 w-2 h-2 bg-primary" />
                    <div className="absolute bottom-3 left-3 right-3 h-1 bg-primary" />
                </div>
            </motion.div>
        </div>
    );
}
