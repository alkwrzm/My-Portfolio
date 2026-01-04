"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@prisma/client";
import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

export default function Projects({ initialProjects }: { initialProjects: Project[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const scrollPosRef = useRef(0);
    const animationFrameRef = useRef<number | null>(null);
    const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    if (!initialProjects || initialProjects.length === 0) {
        return null;
    }

    // Duplicate projects to ensure we have enough content to scroll seamlessly
    // Ensure we have at least 4 sets to create a safe buffer for loop
    const projects = [...initialProjects, ...initialProjects, ...initialProjects, ...initialProjects];

    const scrollLoop = useCallback(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        if (!isPaused) {
            // Speed settings (adjust strictly here)
            const speed = 0.5;
            scrollPosRef.current += speed;

            // Logic for Infinite Scroll
            // We have 4 sets of projects. The seamless loop happens when we finish the first set.
            // Width of one set ≈ totalScrollWidth / 4
            const totalWidth = scrollContainer.scrollWidth;
            const oneSetWidth = totalWidth / 4;

            if (scrollPosRef.current >= oneSetWidth) {
                // Instantly jump back to start (minus the overshoot) to loop
                scrollPosRef.current = scrollPosRef.current - oneSetWidth;
                scrollContainer.scrollLeft = scrollPosRef.current;
            } else {
                scrollContainer.scrollLeft = scrollPosRef.current;
            }
        } else {
            // Keep ref synced if paused (incase manual scroll happens)
            scrollPosRef.current = scrollContainer.scrollLeft;
        }

        animationFrameRef.current = requestAnimationFrame(scrollLoop);
    }, [isPaused]);

    useEffect(() => {
        animationFrameRef.current = requestAnimationFrame(scrollLoop);
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [scrollLoop]);

    const handleScroll = (direction: 'left' | 'right') => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const scrollAmount = 600; // Match card width roughly
        const targetScroll = direction === 'left'
            ? scrollContainer.scrollLeft - scrollAmount
            : scrollContainer.scrollLeft + scrollAmount;

        scrollContainer.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });

        scrollPosRef.current = targetScroll;

        // Pause auto-scroll temporarily
        setIsPaused(true);
        if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 3000);
    };

    return (
        <section id="projects" className="min-h-screen py-24 relative flex flex-col justify-center overflow-hidden">
            <div className="container mx-auto px-6 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            PROJECT <span className="text-primary">SHOWCASE</span>
                        </h2>
                        <p className="text-muted-foreground max-w-xl">
                            A continuous stream of AI experiments and product developments.
                        </p>
                    </div>
                    <Link
                        href="/projects"
                        className="flex items-center gap-2 text-primary hover:text-white transition-colors group"
                    >
                        <span className="font-mono text-sm">VIEW_ALL_RECORDS</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Scrolling Container */}
            <div
                className="relative w-full group"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Navigation Buttons */}
                <button
                    onClick={() => handleScroll('left')}
                    className="absolute left-8 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md border border-white/10 p-4 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 hover:bg-primary hover:text-black hover:scale-110 active:scale-95 hidden md:block"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={() => handleScroll('right')}
                    className="absolute right-8 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md border border-white/10 p-4 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 hover:bg-primary hover:text-black hover:scale-110 active:scale-95 hidden md:block"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto no-scrollbar pl-8 md:pl-0 items-center"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {projects.map((project, i) => (
                        <LargeProjectCard key={`${project.id}-${i}`} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function LargeProjectCard({ project }: { project: Project }) {
    return (
        <a
            href={project.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-shrink-0 w-[85vw] md:w-[600px] h-[50vh] md:h-[450px] rounded-[2.5rem] overflow-hidden border border-zinc-800 bg-zinc-900/50 hover:border-primary/50 transition-all duration-500 snap-center"
        >
            {/* Background Image */}
            {project.images && project.images.length > 0 ? (
                <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-105"
                    priority={false} // Lazy load for performance in list
                    sizes="(max-width: 768px) 85vw, 600px"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black" />
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-primary font-mono text-xs uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 backdrop-blur-md">
                            {project.tags ? project.tags.split(',')[0] : 'PROJECT'}
                        </span>

                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-white hover:bg-primary hover:text-black">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>

                    <h3 className="text-2xl md:text-5xl font-bold font-display text-white mb-3 leading-tight tracking-tight">
                        {project.title}
                    </h3>
                    <p className="text-zinc-300 text-sm md:text-base line-clamp-2 md:line-clamp-3 max-w-xl font-light leading-relaxed group-hover:text-white transition-colors">
                        {project.description}
                    </p>

                    {/* Tags */}
                    {project.tags && (
                        <div className="flex gap-2 mt-4 flex-wrap">
                            {project.tags.split(',').slice(0, 3).map((tag, i) => (
                                <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-black/40 text-zinc-300 border border-white/10 backdrop-blur-sm">
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </a>
    );
}
