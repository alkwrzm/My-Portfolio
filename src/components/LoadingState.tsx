"use client";

import { Html, useProgress } from "@react-three/drei";

export default function LoadingState() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <span className="text-primary font-mono text-sm mb-2">LOADING_ASSETS...</span>
                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <span className="text-xs text-muted-foreground mt-2">{progress.toFixed(0)}%</span>
            </div>
        </Html>
    );
}
