import { Terminal, Cpu, Zap } from "lucide-react";
import MotionWrapper from "@/components/MotionWrapper";

export default function About() {
    return (
        <section id="about" className="relative py-24 bg-gradient-to-b from-slate-950 to-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <MotionWrapper>
                    <div className="flex flex-col items-center text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">
                            About <span className="text-primary">Me</span>
                        </h2>
                        <div className="w-20 h-1 bg-primary rounded-full" />
                    </div>
                </MotionWrapper>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <MotionWrapper delay={0.2}>
                        <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                            <p>
                                I sit at the intersection of <span className="text-slate-50 font-semibold">Product Management</span> and <span className="text-slate-50 font-semibold">Artificial Intelligence</span>. My passion lies in translating complex AI capabilities into intuitive, user-centric products that solve real-world problems.
                            </p>
                            <p>
                                With a background in rapid prototyping and technical strategy, I bridge the gap between engineering teams and stakeholders. I don't just manage backlogs; I build prototypes, validate hypotheses, and define the strategic vision for AI-driven solutions.
                            </p>
                            <p>
                                Whether it's LLMs, Computer Vision, or Predictive Analytics, I focus on the "Why" and "How" to ensure technology serves the user, not the other way around.
                            </p>
                        </div>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 gap-6">
                        <MotionWrapper delay={0.3}>
                            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-primary/50 transition-colors shadow-sm">
                                <Terminal className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-xl font-semibold text-slate-50 mb-2">Technical Fluency</h3>
                                <p className="text-slate-400">
                                    Comfortable navigating codebases, API specs, and model architectures.
                                </p>
                            </div>
                        </MotionWrapper>
                        <MotionWrapper delay={0.4}>
                            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-primary/50 transition-colors shadow-sm">
                                <Cpu className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-xl font-semibold text-slate-50 mb-2">AI Strategy</h3>
                                <p className="text-slate-400">
                                    Defining roadmaps that leverage AI for competitive advantage.
                                </p>
                            </div>
                        </MotionWrapper>
                        <MotionWrapper delay={0.5}>
                            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-primary/50 transition-colors shadow-sm">
                                <Zap className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-xl font-semibold text-slate-50 mb-2">Rapid Prototyping</h3>
                                <p className="text-slate-400">
                                    Building proofs-of-concept to validate ideas faster.
                                </p>
                            </div>
                        </MotionWrapper>
                    </div>
                </div>
            </div>
        </section>
    );
}
