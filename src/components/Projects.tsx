"use client";

import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import MotionWrapper from "@/components/MotionWrapper";

function ProjectCard({ project }: { project: any }) {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImage((prev) => (prev + 1) % project.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    return (
        <div
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 flex flex-col h-[450px] w-[350px] md:w-[400px] flex-shrink-0 mx-4 snap-center selection:bg-transparent"
        >
            <div className="relative h-48 w-full overflow-hidden bg-slate-800 flex-shrink-0">
                <Image
                    src={project.images[currentImage]}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                />

                {/* Carousel Controls */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={prevImage}
                        className="rounded-full bg-black/50 p-1.5 text-white hover:bg-primary hover:text-slate-950 transition-colors"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="rounded-full bg-black/50 p-1.5 text-white hover:bg-primary hover:text-slate-950 transition-colors"
                        aria-label="Next image"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.images.map((_: any, index: number) => (
                        <div
                            key={index}
                            className={`h-1.5 w-1.5 rounded-full transition-colors ${index === currentImage ? "bg-primary" : "bg-white/60"
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow select-text">
                <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag: string, tagIndex: number) => (
                        <span
                            key={tagIndex}
                            className="rounded-full bg-slate-950 px-2.5 py-1 text-xs font-medium text-slate-400 ring-1 ring-slate-800"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="mb-2 text-xl font-bold text-slate-50 group-hover:text-primary transition-colors">
                    {project.title}
                </h3>
                <p className="mb-6 text-sm text-slate-400 flex-grow line-clamp-3">
                    {project.description}
                </p>

                <div className="flex gap-4 mt-auto">
                    <Link
                        href={project.demoLink}
                        className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-primary"
                    >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                    </Link>
                    <Link
                        href={project.repoLink}
                        className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-primary"
                    >
                        <Github className="h-4 w-4" />
                        View Code
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function Projects() {
    const projects = [
        {
            title: "Traveloka",
            description:
                "A comprehensive dashboard that uses predictive algorithms to forecast sales trends. Built for a retail client to optimize inventory management.",
            tags: ["Next.js", "Python", "TensorFlow", "D3.js"],
            images: ["/images/project/caliana-trave/1.png", "/images/project/caliana-trave/2.png"],
            demoLink: "#",
            repoLink: "#",
        },
        {
            title: "Caliana Prodia",
            description:
                "SaaS platform allowing marketers to generate SEO-optimized blog posts using custom fine-tuned LLMs. Reduced content creation time by 70%.",
            tags: ["React", "OpenAI API", "Node.js", "Stripe"],
            images: ["/images/project/caliana-prodia/1.png", "/images/project/caliana-prodia/2.png"],
            demoLink: "#",
            repoLink: "#",
        },
        {
            title: "Computer Vision Quality Control",
            description:
                "Automated defect detection system for manufacturing lines. Implemented edge-deployed models for real-time inference.",
            tags: ["PyTorch", "FastAPI", "React Native", "MQTT"],
            images: ["/images/project/project-dummy.png", "/images/project/project-dummy.png"],
            demoLink: "#",
            repoLink: "#",
        },
        {
            title: "Recommender System API",
            description:
                "High-performance recommendation engine for e-commerce platforms. Handles millions of requests with sub-50ms latency.",
            tags: ["Go", "gRPC", "Redis", "Docker"],
            images: ["/images/project/project-dummy.png", "/images/project/project-dummy.png"],
            demoLink: "#",
            repoLink: "#",
        },
        {
            title: "Recommender System API",
            description:
                "High-performance recommendation engine for e-commerce platforms. Handles millions of requests with sub-50ms latency.",
            tags: ["Go", "gRPC", "Redis", "Docker"],
            images: ["/images/project/project-dummy.png", "/images/project/project-dummy.png"],
            demoLink: "#",
            repoLink: "#",
        },
        {
            title: "Recommender System API",
            description:
                "High-performance recommendation engine for e-commerce platforms. Handles millions of requests with sub-50ms latency.",
            tags: ["Go", "gRPC", "Redis", "Docker"],
            images: ["/images/project/project-dummy.png", "/images/project/project-dummy.png"],
            demoLink: "#",
            repoLink: "#",
        },
        {
            title: "Recommender System API",
            description:
                "High-performance recommendation engine for e-commerce platforms. Handles millions of requests with sub-50ms latency.",
            tags: ["Go", "gRPC", "Redis", "Docker"],
            images: ["/images/project/project-dummy.png", "/images/project/project-dummy.png"],
            demoLink: "#",
            repoLink: "#",
        },
        {
            title: "Recommender System API",
            description:
                "High-performance recommendation engine for e-commerce platforms. Handles millions of requests with sub-50ms latency.",
            tags: ["Go", "gRPC", "Redis", "Docker"],
            images: ["/images/project/project-dummy.png", "/images/project/project-dummy.png"],
            demoLink: "#",
            repoLink: "#",
        },
    ];

    // Duplicate projects to create infinite scroll effect.
    const extendedProjects = [...projects, ...projects, ...projects, ...projects];

    const containerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (containerRef.current) {
            const container = containerRef.current;
            const scrollAmount = 450;
            const newScrollPos = container.scrollLeft - scrollAmount;

            // If scrolling would go before the start, jump to the equivalent position in the duplicated content
            if (newScrollPos < 0) {
                const totalWidth = container.scrollWidth;
                const oneSetWidth = totalWidth / 4;
                container.scrollLeft = oneSetWidth + newScrollPos;
            } else {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            const container = containerRef.current;
            const scrollAmount = 450;
            const totalWidth = container.scrollWidth;
            const oneSetWidth = totalWidth / 4;
            const newScrollPos = container.scrollLeft + scrollAmount;

            // If scrolling past the first set, loop back to the beginning
            if (newScrollPos >= oneSetWidth) {
                container.scrollLeft = newScrollPos - oneSetWidth;
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section id="projects" className="py-24 bg-slate-950 transition-colors duration-300 overflow-hidden">
            <div className="container mx-auto px-6 mb-12">
                <MotionWrapper>
                    <div className="text-center">
                        <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">
                            Featured <span className="text-primary">Projects</span>
                        </h2>
                        <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
                        <p className="mt-4 text-slate-400">
                            (Hover to pause)
                        </p>
                    </div>
                </MotionWrapper>
            </div>

            <div className="relative container mx-auto px-6">
                {/* Left Arrow */}
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-slate-900/90 p-3 text-slate-50 hover:bg-primary hover:text-slate-950 transition-all shadow-lg backdrop-blur-sm border border-slate-800 hover:border-primary"
                    aria-label="Scroll left"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Right Arrow */}
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-slate-900/90 p-3 text-slate-50 hover:bg-primary hover:text-slate-950 transition-all shadow-lg backdrop-blur-sm border border-slate-800 hover:border-primary"
                    aria-label="Scroll right"
                >
                    <ChevronRight size={24} />
                </button>

                <div className="w-full overflow-x-auto no-scrollbar" ref={containerRef}>
                    <div className="flex w-max animate-marquee pause-on-hover px-6 pb-12 pt-4">
                        {extendedProjects.map((project, index) => (
                            <div key={`${index}-${project.title}`} className="transform transition-transform hover:-translate-y-2 duration-300">
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .animate-marquee {
                    animation: marquee 60s linear infinite;
                }
                .pause-on-hover:hover {
                    animation-play-state: paused;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-25%);
                    }
                }
            `}</style>
        </section>
    );
}
