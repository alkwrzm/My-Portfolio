import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MotionWrapper from "@/components/MotionWrapper";

export default function Projects() {
    const projects = [
        {
            title: "AI-Powered Analytics Dashboard",
            description:
                "A comprehensive dashboard that uses predictive algorithms to forecast sales trends. Built for a retail client to optimize inventory management.",
            tags: ["Next.js", "Python", "TensorFlow", "D3.js"],
            image: "/project-analytics.jpg", // Placeholder
            demoLink: "#",
            repoLink: "#",
        },
        {
            title: "Intelligent Content Generator",
            description:
                "SaaS platform allowing marketers to generate SEO-optimized blog posts using custom fine-tuned LLMs. Reduced content creation time by 70%.",
            tags: ["React", "OpenAI API", "Node.js", "Stripe"],
            image: "/project-content.jpg", // Placeholder
            demoLink: "#",
            repoLink: "#",
        },
        {
            title: "Computer Vision Quality Control",
            description:
                "Automated defect detection system for manufacturing lines. Implemented edge-deployed models for real-time inference.",
            tags: ["PyTorch", "FastAPI", "React Native", "MQTT"],
            image: "/project-vision.jpg", // Placeholder
            demoLink: "#",
            repoLink: "#",
        },
    ];

    return (
        <section id="projects" className="py-24 bg-slate-950">
            <div className="container mx-auto px-6">
                <MotionWrapper>
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">
                            Featured <span className="text-primary">Projects</span>
                        </h2>
                        <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
                    </div>
                </MotionWrapper>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <MotionWrapper key={index} delay={index * 0.1}>
                            <div
                                className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                            >
                                <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
                                    {/* Fallback for missing image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                                        <span className="text-sm">Project Preview Image</span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="rounded-full bg-slate-950 px-2.5 py-1 text-xs font-medium text-slate-400 ring-1 ring-slate-800"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="mb-2 text-xl font-bold text-slate-50 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="mb-6 text-sm text-slate-400">
                                        {project.description}
                                    </p>

                                    <div className="flex gap-4">
                                        <Link
                                            href={project.demoLink}
                                            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-primary"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            Live Demo
                                        </Link>
                                        <Link
                                            href={project.repoLink}
                                            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-primary"
                                        >
                                            <Github className="h-4 w-4" />
                                            View Code
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </MotionWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}
