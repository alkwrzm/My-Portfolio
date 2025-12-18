import { prisma } from "@/lib/db"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Project } from "@prisma/client"
import ImageCarousel from "@/components/ui/ImageCarousel"

// This page is a Server Component
export default async function AllProjectsPage() {
    const projects: Project[] = await prisma.project.findMany({
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
    })

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-16 px-6">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-cyan-400 mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-mono text-sm">RETURN_TO_BASE</span>
                    </Link>

                    <h1 className="text-4xl md:text-6xl font-black font-display mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
                        PROJECT_ARCHIVES
                    </h1>
                    <p className="text-zinc-400 max-w-2xl text-lg">
                        A complete catalog of deployed systems, prototypes, and experiments.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project: Project) => (
                        <div key={project.id} className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">

                            {/* Carousel or Image */}
                            <div className="h-48 bg-zinc-950 relative overflow-hidden">
                                <ImageCarousel images={project.images || []} title={project.title} />

                                {/* Overlay Links */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 pointer-events-none group-hover:pointer-events-auto">
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer"
                                            className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                                            title="View Live/Code"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h2 className="text-xl font-bold font-display text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                    {project.title}
                                </h2>
                                <p className="text-zinc-400 text-sm line-clamp-3 mb-4">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.split(',').map((tag: string, i: number) => (
                                        <span key={i} className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl">
                        <p className="text-zinc-500 font-mono">DATABASE_EMPTY // NO_RECORDS_FOUND</p>
                    </div>
                )}
            </div>
        </div>
    )
}
