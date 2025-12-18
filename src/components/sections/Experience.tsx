"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import PixelCompanion from "@/components/PixelCompanion";
import { Experience as ExperienceType } from "@prisma/client";

type ExperienceItemProps = {
    data: ExperienceType;
    index: number;
};

export default function Experience({ experiences }: { experiences: ExperienceType[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"],
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

                {experiences.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                        <p className="text-xl">No experience added yet.</p>
                        <p className="text-sm mt-2">Add your work experience from the admin panel!</p>
                    </div>
                ) : (
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
                            {experiences.map((exp, index) => (
                                <TimelineItem key={exp.id} data={exp} index={index} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function TimelineItem({ data, index }: ExperienceItemProps) {
    const formatDate = (date: Date | null) => {
        if (!date) return "Present";
        return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };

    const dateRange = `${formatDate(data.startDate)} - ${formatDate(data.endDate)}`;

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
                <h3 className="text-2xl font-bold font-display">{data.title}</h3>
                <span className="text-secondary font-mono text-sm px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20 mt-2 md:mt-0">
                    {dateRange}
                </span>
            </div>

            <h4 className="text-lg text-muted-foreground mb-4">{data.company}</h4>
            <p className="text-neutral-300 mb-6 max-w-2xl text-lg leading-relaxed whitespace-pre-wrap">{data.description}</p>
        </motion.div>
    );
}
