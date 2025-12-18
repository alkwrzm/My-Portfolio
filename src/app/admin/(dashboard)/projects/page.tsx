import { prisma } from "@/lib/db"
import { ProjectManagement } from "@/components/admin/ProjectManagement"

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] })
    return (
        <div className="p-8">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-white">Projects & Showcase</h2>
                <p className="text-zinc-500">Manage your portfolio projects.</p>
            </header>
            <ProjectManagement projects={projects} />
        </div>
    )
}
