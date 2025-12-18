import { prisma } from "@/lib/db"
import { SkillManagement } from "@/components/admin/SkillManagement"

export const dynamic = 'force-dynamic';

export default async function SkillsPage() {
    const skills = await prisma.skill.findMany({
        where: {
            category: {
                notIn: ["Frontend", "Backend", "Tools", "Design", "Product Management", "Prototyping & Design", "AI & Engineering"]
            }
        },
        orderBy: { createdAt: 'desc' }
    })
    return (
        <div className="p-8">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-white">Certifications</h2>
                <p className="text-zinc-500">Manage your technical expertise.</p>
            </header>
            <SkillManagement skills={skills} />
        </div>
    )
}
