"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import PixelCompanion from "@/components/PixelCompanion";

type ExperienceItem = {
    id: number;
    role: string;
    company: string;
    date: string;
    description: string;
    tech: string[];
};

const EXPERIENCES: ExperienceItem[] = [
    {
        id: 1,
        role: "Senior Product Manager",
        company: "Tech Corp",
        date: "2023 - Present",
        description: "Led the development of AI-driven analytics tools. Improved user retention by 30%.",
        tech: ["Python", "Strategy", "Figma"],
    },
    {
        id: 2,
        role: "AI Specialist",
        company: "Innovation Labs",
        date: "2021 - 2023",
        description: "Prototyped LLM applications for enterprise clients. Managed cross-functional teams.",
        tech: ["OpenAI API", "React", "Node.js"],
    },
    {
        id: 3,
        role: "Digital Strategist",
        company: "Creative Agency",
        date: "2019 - 2021",
        description: "Designed digital transformation roadmaps for Fortune 500 companies.",
        tech: ["Analytics", "UX Research", "Agile"],
    },
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"], // Adjust offsets for better walk timing
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="experience" className="min-h-screen py-24 relative overflow-hidden" ref={containerRef}>
            <div className="container mx-auto px-6 relative">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">
                    ADVENTURE <span className="text-secondary">LOG</span>
                </h2>

                <div className="relative grid grid-cols-1 lg:grid-cols-[100px_1fr] gap-8">
                    {/* Timeline Bar Column */}
                    <div className="hidden lg:flex flex-col items-center relative h-full">
                        {/* Gray Background Line */}
                        <div className="absolute top-0 bottom-0 w-1 bg-neutral-800 rounded-full" />

                        {/* Lit Green Line */}
                        <motion.div
                            style={{ scaleY, transformOrigin: "top" }}
                            className="absolute top-0 bottom-0 w-1 bg-secondary rounded-full shadow-[0_0_15px_#22C55E]"
                        />

                        {/* Walking Companion */}
                        <motion.div
                            style={{
                                top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                            }}
                            className="absolute left-1/2 -translate-x-1/2 -ml-[3px] z-10"
                        >
                            <div className="relative">
                                <PixelCompanion className="w-12 h-12 -translate-y-1/2" initialState="run" />
                                {/* Glow effect under feet */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-secondary/50 blur-md rounded-full" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Experience Cards */}
                    <div className="flex flex-col gap-24 py-10">
                        {EXPERIENCES.map((exp, index) => (
                            <TimelineItem key={exp.id} data={exp} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ data, index }: { data: ExperienceItem, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-card/50 backdrop-blur-sm border border-white/5 rounded-xl p-8 hover:border-secondary/50 transition-colors duration-300"
        >
            <div className="absolute -left-3 lg:-left-[54px] top-8 w-6 h-6 rounded-full bg-neutral-900 border-2 border-neutral-700 group-hover:border-secondary group-hover:bg-secondary group-hover:shadow-[0_0_15px_#22C55E] transition-all duration-500 z-20 hidden lg:block" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h3 className="text-2xl font-bold font-display">{data.role}</h3>
                <span className="text-secondary font-mono text-sm px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20 mt-2 md:mt-0">
                    {data.date}
                </span>
            </div>

            <h4 className="text-lg text-muted-foreground mb-4">{data.company}</h4>
            <p className="text-neutral-300 mb-6 max-w-2xl text-lg leading-relaxed">{data.description}</p>

            <div className="flex flex-wrap gap-2">
                {data.tech.map((tech: string) => (
                    <span key={tech} className="px-3 py-1 bg-white/5 rounded-md text-sm text-neutral-400 border border-white/5 group-hover:border-secondary/20 group-hover:text-secondary/80 transition-colors">
                        {tech}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
