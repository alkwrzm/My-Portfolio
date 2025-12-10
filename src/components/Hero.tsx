import Link from "next/link";
import MotionWrapper from "@/components/MotionWrapper";

export default function Hero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12 text-center">
            <div className="z-10 mx-auto max-w-4xl space-y-8">
                <MotionWrapper delay={0.1}>
                    <h1 className="text-5xl font-extrabold tracking-tight text-slate-50 sm:text-7xl">
                        Building the Future of <br />
                        <span className="text-primary">AI Products</span>
                    </h1>
                </MotionWrapper>

                <MotionWrapper delay={0.2}>
                    <p className="mx-auto max-w-2xl text-lg text-slate-400 sm:text-xl">
                        AI Product Manager & Prototyping Specialist transforming complex technical capabilities into intuitive, high-impact user experiences.
                    </p>
                </MotionWrapper>

                <MotionWrapper delay={0.3}>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="#projects"
                            className="rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-slate-950 transition-all hover:bg-emerald-400 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-950"
                        >
                            View Work
                        </Link>
                        <Link
                            href="#contact"
                            className="rounded-full border border-slate-700 bg-transparent px-8 py-3.5 text-base font-semibold text-slate-300 transition-all hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                        >
                            Contact Me
                        </Link>
                    </div>
                </MotionWrapper>
            </div>

            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
        </section>
    );
}
