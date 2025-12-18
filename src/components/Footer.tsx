import { SITE_CONFIG } from "@/lib/constants";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-background py-12 relative overflow-hidden">
            {/* Retro Grid Background Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col gap-2">
                    <span className="font-display font-bold text-lg">
                        GAME OVER<span className="text-primary animate-pulse">_</span>
                    </span>
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
