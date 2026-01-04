"use client";

import { TypeAnimation } from "react-type-animation";
import { Button } from "@/components/ui/button";
import ThreeDCharacter from "@/components/ThreeDCharacter";
import HeroBackground from "@/components/HeroBackground";
import { ArrowRight, Trophy, Briefcase, Code2 } from "lucide-react";

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-24 md:pt-20">
            {/* 3D Background */}
            <HeroBackground />

            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none z-0" />

            <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center z-10">

                {/* Left Content: Text & Info */}
                <div className="flex flex-col items-start text-left gap-4 md:gap-6 order-2 lg:order-1 relative z-20">
                    {/* Badges Container */}
                    <div className="flex flex-wrap gap-3 animate-in fade-in slide-in-from-left-4 duration-500">

                        {/* Experience Badge */}
                        <div
                            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-[10px] md:text-xs font-mono tracking-widest uppercase"
                        >
                            <Trophy className="w-3 h-3 md:w-4 md:h-4" />
                            <span>3+ Years Experience</span>
                        </div>
                    </div>

                    {/* Main Title - Name */}
                    <h1
                        className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both"
                    >
                        AL <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-gradient">
                            KWARIZMI
                        </span>
                    </h1>

                    {/* Typewriter Subtitle */}
                    <div
                        className="text-lg md:text-2xl text-muted-foreground font-light h-6 md:h-8 animate-in fade-in duration-1000 delay-200 fill-mode-both"
                    >
                        <TypeAnimation
                            sequence={[
                                "Product Manager",
                                1000,
                                "AI Specialist",
                                1000,
                                "Digital Enabler",
                                1000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            cursor={true}
                        />
                    </div>

                    <div
                        className="mt-2 md:mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both w-full md:w-auto"
                    >
                        <Button
                            size="lg"
                            className="w-full md:w-auto rounded-full px-8 py-6 text-lg bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105"
                            onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Start Explore <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Right Content: 3D Character */}
                <div
                    className="w-full h-[300px] md:h-[500px] relative order-1 lg:order-2 flex items-center justify-center animate-in fade-in zoom-in-95 duration-1000"
                >
                    {/* Glow / Background for Character */}
                    <div className="absolute inset-0 bg-primary/20 blur-[80px] md:blur-[100px] rounded-full opacity-50 pointer-events-none" />

                    <ThreeDCharacter />
                </div>

            </div>

            {/* Scroll Indicator */}
            <div
                className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground text-[10px] md:text-xs font-mono flex flex-col items-center gap-2 animate-in fade-in duration-1000 delay-1000"
            >
                <span>SCROLL TO INITIALIZE</span>
                <div className="w-4 h-8 border border-white/20 rounded-full flex justify-center p-1">
                    <div
                        className="w-0.5 h-2 bg-primary rounded-full animate-bounce"
                    />
                </div>
            </div>
        </section>
    );
}
