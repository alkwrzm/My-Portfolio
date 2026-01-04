import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import ProjectsWrapper from "@/components/ProjectsWrapper";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import HelperBot from "@/components/HelperBot";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function Home() {
    const projects = await prisma.project.findMany({
        take: 4,
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    const experiences = await prisma.experience.findMany({
        orderBy: [{ order: 'asc' }, { startDate: 'desc' }],
    });

    return (
        <div className="flex flex-col min-h-screen">
            <Hero />
            <Experience experiences={experiences} />
            <ProjectsWrapper initialProjects={projects} />
            <Certifications />
            <Contact />
            <HelperBot />
        </div>
    );
}
