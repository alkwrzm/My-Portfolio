"use client";

import { motion } from "framer-motion";
import MotionWrapper from "@/components/MotionWrapper";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

const experiences = [
    {
        id: 1,
        title: "Product Manager",
        company: "Caliana Indonesia",
        period: "Mar. 2024 - Present",
        description: "Leading the AI product vertical, managing a team of 10 engineers and 3 designers. Launched 3 major AI features accumulating $2M ARR.",
        logo: "/images/company-logos/caliana.png",
    },
    {
        id: 2,
        title: "Associate Product Owner",
        company: "Cermati Fintech Group",
        period: "Mei 2023 - Jan. 2024",
        description: "Owned the roadmap for the core SaaS platform. Increased user retention by 25% through data-driven UX improvements.",
        logo: "/images/company-logos/cermati.png",
    },
    {
        id: 3,
        title: "Associate Product Manager",
        company: "Alodokter",
        period: "Mar. 2022 - Mei 2023",
        description: "Assisted in product discovery and market research. Facilitated sprint planning and backlog grooming.",
        logo: "/images/company-logos/alodokter.png",
    },
    {
        id: 4,
        title: "Product Manager Intern",
        company: "Bhinneka.com",
        period: "2018 - 2019",
        description: "Conducted user interviews and usability testing for various client projects. Created user personas and journey maps.",
        logo: "/images/company-logos/bhinneka.png",
    },
    {
        id: 5,
        title: "Project Manager",
        company: "RISTEK Fasilkom UI",
        period: "2021 - 2022",
        description: "Developed internal tools using React and Node.js. Collaborated with senior engineers on system architecture.",
        logo: "/images/company-logos/ristek.png",
    },
    {
        id: 6,
        title: "Data Analyst Intern",
        company: "Diarium Indonesia (AMOEBA Telkom)",
        period: "2017 - 2018",
        description: "Developed internal tools using React and Node.js. Collaborated with senior engineers on system architecture.",
        logo: "/images/company-logos/diarium.png",
    },

];

export default function Experience() {
    const [showAll, setShowAll] = useState(false);

    // Sort experiences by date (assuming they are already sorted or we manually sort if needed) - for now just using the array as is but ideally latest first.
    // Display only first 3 if not showAll
    const displayedExperiences = showAll ? experiences : experiences.slice(0, 3);

    return (
        <section id="experience" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <MotionWrapper>
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">
                            My <span className="text-primary">Experience</span>
                        </h2>
                        <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
                    </div>
                </MotionWrapper>

                <div className="relative mx-auto max-w-3xl px-4">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 h-full w-0.5 bg-slate-800 md:-translate-x-1/2" />

                    <div className="space-y-12 mb-12">
                        {displayedExperiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-8 md:left-1/2 top-0 h-4 w-4 rounded-full bg-primary md:-translate-x-1/2 shadow-[0_0_0_4px_rgba(2,6,23,1)] ring-2 ring-primary z-10" />

                                {/* Content */}
                                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12 text-left md:text-right"}`}>
                                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm hover:shadow-md transition-shadow group">
                                        {/* Company Logo */}
                                        <div className={`mb-4 flex ${index % 2 === 0 ? "md:justify-start" : "justify-start md:justify-end"}`}>
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-800 p-2">
                                                <Image
                                                    src={exp.logo}
                                                    alt={`${exp.company} logo`}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>

                                        <span className="mb-2 block text-sm font-mono text-primary font-bold">
                                            {exp.period}
                                        </span>
                                        <h3 className="mb-1 text-xl font-bold text-slate-50 group-hover:text-primary transition-colors">
                                            {exp.title}
                                        </h3>
                                        <p className="mb-4 text-sm font-medium text-slate-400">
                                            {exp.company}
                                        </p>
                                        <p className="text-slate-300">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Show More / Show Less Button */}
                    <div className="flex justify-center z-20 relative">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="flex flex-col items-center gap-2 text-sm font-medium text-slate-400 hover:text-primary transition-colors focus:outline-none"
                        >
                            {showAll ? (
                                <>
                                    <span>Show Less</span>
                                    <div className="p-2 rounded-full bg-slate-900 border border-slate-800 shadow-sm">
                                        <ChevronUp className="w-5 h-5" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span>Show More</span>
                                    <div className="p-2 rounded-full bg-slate-900 border border-slate-800 shadow-sm">
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
