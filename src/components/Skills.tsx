import MotionWrapper from "@/components/MotionWrapper";

export default function Skills() {
    const skillCategories = [
        {
            title: "Product Management",
            skills: [
                "Product Strategy",
                "Roadmapping",
                "Agile/Scrum",
                "User Research",
                "Data Analysis",
                "Stakeholder Management",
                "A/B Testing",
            ],
        },
        {
            title: "AI & Engineering",
            skills: [
                "Python",
                "LLMs & Prompt Engineering",
                "Computer Vision",
                "RAG Pipelines",
                "SQL",
                "TensorFlow/PyTorch",
                "API Integration",
            ],
        },
        {
            title: "Prototyping & Design",
            skills: [
                "Figma",
                "Next.js / React",
                "Tailwind CSS",
                "Wireframing",
                "UI/UX Design",
                "Interactive Prototypes",
            ],
        },
    ];

    return (
        <section id="skills" className="py-24 bg-slate-900">
            <div className="container mx-auto px-6">
                <MotionWrapper>
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">
                            My <span className="text-primary">Skills</span>
                        </h2>
                        <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
                    </div>
                </MotionWrapper>

                <div className="grid gap-8 md:grid-cols-3">
                    {skillCategories.map((category, index) => (
                        <MotionWrapper key={index} delay={index * 0.1}>
                            <div
                                className="rounded-2xl border border-slate-800 bg-slate-950 p-8 transition-transform hover:-translate-y-1 hover:border-primary/30"
                            >
                                <h3 className="mb-6 text-xl font-bold text-slate-50">
                                    {category.title}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="rounded-full bg-slate-900 px-3 py-1.5 text-sm font-medium text-primary shadow-sm ring-1 ring-slate-800"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </MotionWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}
