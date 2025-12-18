import { prisma } from "@/lib/db"
import { ExperienceManagement } from "@/components/admin/ExperienceManagement"

export default async function ExperiencePage() {
    const experiences = await prisma.experience.findMany({
        orderBy: { startDate: 'desc' }
    })

    return (
        <div className="p-8">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-white">Work Experience</h2>
                <p className="text-zinc-500">Manage your professional history.</p>
            </header>

            <ExperienceManagement experiences={experiences} />
        </div>
    )
}
