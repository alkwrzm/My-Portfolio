import Link from "next/link";
import MotionWrapper from "@/components/MotionWrapper";

export default function Hero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12">
            <div className="z-10 mx-auto max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="space-y-8 text-center md:text-left order-2 md:order-1">
                    <MotionWrapper delay={0.1}>
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-50 sm:text-6xl lg:text-7xl">
                            Building the Future of <br />
                            <span className="text-primary">AI Products</span>
                        </h1>
                    </MotionWrapper>

                    <MotionWrapper delay={0.2}>
                        <p className="mx-auto md:mx-0 max-w-2xl text-lg text-slate-400 sm:text-xl">
                            AI Product Manager & Prototyping Specialist transforming complex technical capabilities into intuitive, high-impact user experiences.
                        </p>
                    </MotionWrapper>

                    <MotionWrapper delay={0.3}>
                        <div className="flex flex-col items-center md:items-start justify-center md:justify-start gap-4 sm:flex-row">
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

                {/* Image Content */}
                <div className="relative order-1 md:order-2 flex justify-center">
                    <MotionWrapper delay={0.2}>
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl bg-slate-900">
                            {/* Using standard img tag per previous implementation */}
                            <img
                                src="/images/portrait.png"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </MotionWrapper>
                </div>
            </div>

            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
        </section>
    );
}
