"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Github, Linkedin, Twitter, Rocket, Mail } from "lucide-react";

export default function ComingSoon() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        console.log("Email submitted:", email);
        alert("Thanks for your interest! We'll notify you when we launch.");
        setEmail("");
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] text-white">
            {/* Background Animated Gradients */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] rounded-full bg-purple-600/10 blur-[130px]" />
                <div className="absolute bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] rounded-full bg-green-500/10 blur-[130px]" />
                <motion.div
                    animate={{
                        opacity: [0.03, 0.05, 0.03],
                        scale: [1, 1.02, 1]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-purple-500/5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium text-gray-300 tracking-wide uppercase text-[10px] md:text-xs">System Upgrading</span>
                    </div>
                </motion.div>

                {/* Main Title */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="mb-6 relative"
                >
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 pb-2">
                        COMING SOON
                    </h1>
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-green-500 opacity-20 blur-2xl rounded-full pointer-events-none" />
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
                >
                    We are currently redesigning our digital presence to bring you a
                    <span className="text-white font-medium"> premium</span> and <span className="text-white font-medium">interactive</span> portfolio experience.
                </motion.p>

                {/* Notify Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-4 w-full max-w-md items-center mb-16"
                >
                    <div className="relative w-full">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-purple-500/50 rounded-xl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        size="lg"
                        className="h-12 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-semibold shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 w-full sm:w-auto"
                    >
                        Notify Me
                    </Button>
                </motion.form>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex items-center gap-6"
                >
                    {[
                        { icon: Github, href: "https://github.com/alkwrzm" }, // Assuming based on user path "My-Portfolio"? Or just placeholder
                        { icon: Linkedin, href: "#" },
                        { icon: Twitter, href: "#" },
                    ].map((Social, index) => (
                        <a
                            key={index}
                            href={Social.href}
                            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 hover:text-purple-400 text-gray-400 transition-all duration-300 group"
                        >
                            <Social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </a>
                    ))}
                </motion.div>

                {/* Footer Credit */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-6 text-sm text-gray-600"
                >
                    &copy; {new Date().getFullYear()} Alkwarizmi. All rights reserved.
                </motion.div>
            </div>
        </div>
    );
}
