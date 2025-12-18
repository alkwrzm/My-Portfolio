import { prisma } from "@/lib/db"

export default async function AdminDashboard() {
    // Fetch counts
    const charCount = await prisma.character.count()
    const expCount = await prisma.experience.count()
    const skillCount = await prisma.skill.count()
    const projCount = await prisma.project.count()

    const stats = [
        { label: "Characters", value: charCount, color: "from-purple-500 to-pink-500" },
        { label: "Experiences", value: expCount, color: "from-blue-500 to-cyan-500" },
        { label: "Skills", value: skillCount, color: "from-amber-500 to-orange-500" },
        { label: "Projects", value: projCount, color: "from-emerald-500 to-green-500" },
    ]

    return (
        <div className="p-8">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-white">Dashboard</h2>
                <p className="text-zinc-500">Overview of your portfolio content.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden group hover:border-zinc-700 transition-all">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform`} />
                        <h3 className="text-zinc-500 font-medium text-sm uppercase tracking-wider">{stat.label}</h3>
                        <p className="text-4xl font-bold text-white mt-2">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
