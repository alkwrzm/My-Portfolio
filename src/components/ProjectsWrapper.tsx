"use client";

import dynamic from 'next/dynamic';
import { Project } from "@prisma/client";

const Projects = dynamic(() => import("@/components/sections/Projects"), {
    ssr: false,
    loading: () => <div className="min-h-screen flex items-center justify-center text-zinc-800">Loading Showcase...</div>
});

export default function ProjectsWrapper({ initialProjects }: { initialProjects: Project[] }) {
    return <Projects initialProjects={initialProjects} />;
}
