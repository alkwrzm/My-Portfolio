"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Project } from "@prisma/client";
import { useState } from "react";

export default function Projects({ initialProjects }: { initialProjects: Project[] }) {
    // Map DB projects to layout
    const formattedProjects = initialProjects.map((proj, index) => {
        let colSpan = "md:col-span-1";
        let rowSpan = "md:row-span-1";
        let type = "standard";

        if (index === 0) {
            type = "flagship";
            colSpan = "md:col-span-2";
            rowSpan = "md:row-span-2";
        } else if (index === 3) {
            colSpan = "md:col-span-2"; // Make the 4th item wide to fill the grid
        }

        return {
            ...proj,
            type,
            colSpan,
            rowSpan
        };
    });

    return (
        <section id="projects" className="min-h-screen py-24 relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            PROJECT <span className="text-primary">DATABASE</span>
                        </h2>
                        <p className="text-muted-foreground max-w-xl">
                            Selected works demonstrating capabilities in AI product management and technical execution.
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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
                    {formattedProjects.map((project, index) => (
                        <BentoCard key={project.id} project={project} index={index} />
                    ))}
                    {formattedProjects.length === 0 && (
                        <div className="col-span-full border border-dashed border-zinc-800 rounded-xl p-12 text-center text-zinc-500 font-mono">
                            NO_PROJECT_DATA_FOUND
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

function BentoCard({ project, index }: { project: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
                "group relative rounded-3xl overflow-hidden bg-card border border-white/5 hover:border-primary/50 transition-colors duration-500",
                project.colSpan,
                project.rowSpan
            )}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Render Image for Flagship or if available */}
            {(project.type === "flagship" || (project.images && project.images.length > 0)) ? (
                <div className="h-full w-full relative">
                    <ProjectImageCarousel images={project.images || []} title={project.title} />

                    <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
                        <span className="text-primary font-mono text-sm mb-2">{project.tags ? project.tags.split(',')[0] : 'PROJECT'}</span>
                        <h3 className="text-3xl font-bold font-display text-white mb-2">{project.title}</h3>
                        <p className="text-neutral-300 line-clamp-3">{project.description}</p>
                    </div>
                </div>
            ) : (
                /* Fallback layout for standard items or completely missing images */
                <div className="h-full p-8 flex flex-col justify-between relative z-10">
                    <div>
                        <span className="text-primary font-mono text-xs mb-2 block">
                            {project.tags ? project.tags.split(',')[0] : 'PROJECT'}
                        </span>
                        <h3 className="text-2xl font-bold font-display mb-2">{project.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-4">{project.description}</p>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                        <div className="flex gap-2">
                            {project.tags && project.tags.split(',').slice(0, 2).map((tag: string, i: number) => (
                                <span key={i} className="text-[10px] px-2 py-1 rounded bg-white/5 text-zinc-400 border border-white/5">
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

function ProjectImageCarousel({ images, title }: { images: string[], title: string }) {
    const [index, setIndex] = useState(0)

    if (!images || images.length === 0) {
        // Fallback or empty (handled by parent usually but safety check)
        return null
    }

    const next = (e: React.MouseEvent) => {
        e.preventDefault() // prevent bento click
        e.stopPropagation()
        setIndex((i) => (i + 1) % images.length)
    }

    const prev = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIndex((i) => (i - 1 + images.length) % images.length)
    }

    // Auto-advance could be nice but manual is safer for portfolio bento
    // Just show 1st image if length is 1

    return (
        <div className="relative w-full h-full group/carousel">
            <Image
                src={images[index]}
                alt={`${title} ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {images.length > 1 && (
                <>
                    <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-primary hover:text-black">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-primary hover:text-black">
                        <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-28 md:bottom-8 left-8 md:left-8 flex gap-1 z-20">
                        {/* Adjusted position to not conflict with text overlay */}
                        {/* Actually standard position is fine if text overlay has space. 
                             The text overlay is usually bottom aligned. 
                             Let's place indicators at TOP RIGHT for clarity on bento cards. 
                         */}
                    </div>
                    <div className="absolute top-4 right-4 flex gap-1 z-20">
                        {images.map((_, i) => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full shadow-sm ${i === index ? 'bg-primary' : 'bg-white/50'}`} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
