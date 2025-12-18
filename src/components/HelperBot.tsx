"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import ThreeDCharacter from "./ThreeDCharacter";
import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function HelperBot() {
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (typeof window !== "undefined") {
            const threshold = window.innerHeight * 0.8;
            setIsVisible(latest > threshold);
        }
    });

    const handleWhatsApp = () => {
        window.open("https://wa.me/+6285155091153", "_blank");
    };

    const handleEmail = () => {
        window.location.href = "mailto:alkwarizmi03@gmail.com";
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0,
                y: isVisible ? 0 : 50
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 pointer-events-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative flex items-center gap-3">
                {/* Minimalist Options Menu - Vertical Stack with expanding labels */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.8,
                        pointerEvents: isHovered ? "auto" : "none"
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex flex-col gap-2"
                >
                    {/* WhatsApp Button */}
                    <button
                        onClick={handleWhatsApp}
                        className="group/wa flex items-center gap-3 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300"
                    >
                        <FaWhatsapp className="w-5 h-5 text-white group-hover/wa:text-green-400 transition-colors flex-shrink-0" />
                        <span className="text-white text-sm font-medium max-w-0 group-hover/wa:max-w-[100px] overflow-hidden transition-all duration-300 whitespace-nowrap">
                            WhatsApp
                        </span>
                    </button>

                    {/* Email Button */}
                    <button
                        onClick={handleEmail}
                        className="group/email flex items-center gap-3 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
                    >
                        <Mail className="w-5 h-5 text-white group-hover/email:text-blue-400 transition-colors flex-shrink-0" />
                        <span className="text-white text-sm font-medium max-w-0 group-hover/email:max-w-[100px] overflow-hidden transition-all duration-300 whitespace-nowrap">
                            Email
                        </span>
                    </button>
                </motion.div>

                {/* Bot Avatar */}
                <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden border-2 border-primary/20 bg-black/40 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105 transition-transform duration-300">
                    <ThreeDCharacter />
                </div>
            </div>
        </motion.div>
    );
}
