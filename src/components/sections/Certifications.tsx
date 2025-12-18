import { prisma } from "@/lib/db";
import { Award, ExternalLink } from "lucide-react";

export default async function Certifications() {
    const certs = await prisma.skill.findMany({
        where: {
            category: {
                notIn: ["Frontend", "Backend", "Tools", "Design", "Product Management", "Prototyping & Design", "AI & Engineering"]
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <section id="certifications" className="py-24 relative">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-display font-bold mb-12">
                    GYM <span className="text-secondary">BADGES</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-6">
                    {certs.map((cert: any) => (
                        <div
                            key={cert.id}
                            className="group relative px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-secondary/50 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-secondary/10 rounded-full text-secondary">
                                    <Award className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                                        {cert.name}
                                        {cert.link && (
                                            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">{cert.category}</p>
                                </div>
                            </div>

                            {/* Tooltip / Year */}
                            <div className="absolute -top-3 -right-3 bg-secondary text-black text-[10px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                {cert.proficiency > 0 ? cert.proficiency : '2024'}
                            </div>
                        </div>
                    ))}

                    {certs.length === 0 && (
                        <p className="text-zinc-500 font-mono text-sm">NO_BADGES_FOUND</p>
                    )}
                </div>
            </div>
        </section>
    );
}
