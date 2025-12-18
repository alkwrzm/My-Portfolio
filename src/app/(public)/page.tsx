import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
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

    return (
        <div className="flex flex-col min-h-screen">
            <Hero />
            <Experience />
            <Projects initialProjects={projects} />
            <Certifications />

            <Contact />
            <HelperBot />
        </div>
    );
}
