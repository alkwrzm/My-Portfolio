"use client";

import Link from "next/link";
import MotionWrapper from "@/components/MotionWrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12">
            <div className="z-10 mx-auto max-w-5xl w-full flex flex-col items-center justify-center text-center space-y-12">

                {/* Availability Badge */}
                <MotionWrapper delay={0.1}>
                    <Badge
                        variant="outline"
                        className="border-[#00FF88] bg-[#00FF88]/10 text-[#00FF88] hover:bg-[#00FF88]/20 px-4 py-2 text-sm font-medium"
                    >
                        <Sparkles className="w-3 h-3 mr-2 inline" />
                        Available for opportunities
                    </Badge>
                </MotionWrapper>

                {/* Main Headline */}
                <MotionWrapper delay={0.2}>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight">
                        <span className="text-white block mb-2">Crafting 💼📱</span>
                        <span className="gradient-text-orange-pink block">
                            Product Excellence
                        </span>
                    </h1>
                </MotionWrapper>

                {/* Subtitle */}
                <MotionWrapper delay={0.3}>
                    <p className="max-w-3xl text-lg md:text-xl text-gray-400 leading-relaxed">
                        Transforming ideas into impactful products through data-driven decisions, user-centric design, and strategic execution
                    </p>
                </MotionWrapper>

                {/* CTA Button */}
                <MotionWrapper delay={0.4}>
                    <Button
                        asChild
                        size="lg"
                        className="rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF006E] hover:from-[#FF8555] hover:to-[#FF2080] px-8 py-6 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 glow-orange group"
                    >
                        <Link href="#projects" className="flex items-center gap-2">
                            View My Work
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </MotionWrapper>

                {/* Scroll Indicator */}
                <MotionWrapper delay={0.5}>
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gray-500 text-sm">
                        <span>Scroll to explore</span>
                        <div className="w-px h-16 bg-gradient-to-b from-[#FF6B35] via-[#FF006E] to-transparent animate-[scroll-indicator_2s_ease-in-out_infinite]" />
                    </div>
                </MotionWrapper>
            </div>

            {/* Background Glow Effects */}
            <div className="absolute top-1/3 left-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-[#FF6B35]/20 blur-[150px]" />
            <div className="absolute bottom-1/3 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#FF006E]/20 blur-[150px]" />
        </section>
    );
}
