import { Mail, Linkedin, Twitter, Github } from "lucide-react";
import Link from "next/link";
import MotionWrapper from "@/components/MotionWrapper";

export default function Contact() {
    return (
        <section id="contact" className="py-24 bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <MotionWrapper>
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">
                            Let's <span className="text-primary">Connect</span>
                        </h2>
                        <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-8" />
                        <p className="text-lg text-slate-400">
                            I'm always open to discussing new opportunities, whether it's full-time roles, freelance projects, or speaking engagements.
                        </p>
                    </div>
                </MotionWrapper>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {/* Contact Info */}
                    <MotionWrapper delay={0.2} className="h-full">
                        <div className="space-y-8">
                            <h3 className="text-2xl font-semibold text-slate-50">
                                Get in Touch
                            </h3>
                            <p className="text-slate-400 leading-relaxed">
                                Have a question or want to chat about the latest in AI? Feel free to reach out. I try my best to get back to everyone!
                            </p>

                            <div className="space-y-4">
                                <Link
                                    href="mailto:hello@example.com"
                                    className="flex items-center gap-4 text-slate-300 hover:text-primary transition-colors"
                                >
                                    <div className="p-3 rounded-full bg-slate-800 text-primary">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <span>hello@example.com</span>
                                </Link>
                                <Link
                                    href="https://linkedin.com"
                                    target="_blank"
                                    className="flex items-center gap-4 text-slate-300 hover:text-primary transition-colors"
                                >
                                    <div className="p-3 rounded-full bg-slate-800 text-primary">
                                        <Linkedin className="w-5 h-5" />
                                    </div>
                                    <span>LinkedIn</span>
                                </Link>
                                <Link
                                    href="https://twitter.com"
                                    target="_blank"
                                    className="flex items-center gap-4 text-slate-300 hover:text-primary transition-colors"
                                >
                                    <div className="p-3 rounded-full bg-slate-800 text-primary">
                                        <Twitter className="w-5 h-5" />
                                    </div>
                                    <span>Twitter / X</span>
                                </Link>
                                <Link
                                    href="https://github.com"
                                    target="_blank"
                                    className="flex items-center gap-4 text-slate-300 hover:text-primary transition-colors"
                                >
                                    <div className="p-3 rounded-full bg-slate-800 text-primary">
                                        <Github className="w-5 h-5" />
                                    </div>
                                    <span>GitHub</span>
                                </Link>
                            </div>
                        </div>
                    </MotionWrapper>

                    {/* Contact Form */}
                    <MotionWrapper delay={0.4}>
                        <form className="space-y-6 bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-sm">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-slate-300">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-slate-300">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-slate-300">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    placeholder="How can I help you?"
                                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-8 py-3.5 bg-primary text-slate-950 font-semibold rounded-lg hover:bg-emerald-400 transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-950"
                            >
                                Send Message
                            </button>
                        </form>
                    </MotionWrapper>
                </div>
            </div>
        </section>
    );
}
