"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { sendContactEmail } from "@/actions/email-actions";
import { submitToGoogleSheets } from "@/actions/google-sheets";

const formSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email"),
    phone: z.string().optional(),
    message: z.string().min(10, "Message is too short"),
});

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "shaking" | "caught" | "error">("idle");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setStatus("shaking");

        // Create FormData
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        if (data.phone) formData.append('phone', data.phone);
        formData.append('message', data.message);

        // Send email and Submit to Sheets in parallel
        const [emailResult, sheetResult] = await Promise.all([
            sendContactEmail(formData),
            submitToGoogleSheets(formData)
        ]);

        // We consider it a success if at least the email works (Sheets is secondary)
        if (emailResult.success) {
            setStatus("caught");
            reset();
            // Reset after 3 seconds
            setTimeout(() => setStatus("idle"), 3000);
        } else {
            console.error("Email failed:", emailResult.error);
            setStatus("error");
            // Reset error after 3 seconds
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <section id="contact" className="py-24 relative min-h-[600px] flex items-center">
            <div className="container mx-auto px-6 max-w-lg">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-display font-bold mb-4">
                        CONTINUE?
                    </h2>
                    <p className="text-muted-foreground">
                        Insert message to start a new journey with me.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" {...register("name")} className="bg-white/5 border-white/10 focus:border-primary/50" />
                        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Comms Link (Email)</Label>
                        <Input id="email" type="email" {...register("email")} className="bg-white/5 border-white/10 focus:border-primary/50" />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <Input id="phone" type="tel" {...register("phone")} placeholder="+62 812 3456 7890" className="bg-white/5 border-white/10 focus:border-primary/50" />
                        {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Data Packet</Label>
                        <Textarea id="message" {...register("message")} className="bg-white/5 border-white/10 focus:border-primary/50 min-h-[120px]" />
                        {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
                    </div>

                    <div className="flex justify-center pt-6">
                        <motion.button
                            type="submit"
                            disabled={status !== "idle"}
                            animate={status === "shaking" ? {
                                x: [-5, 5, -5, 5, 0],
                                rotate: [-5, 5, -5, 5, 0]
                            } : {}}
                            transition={{ duration: 0.5 }}
                            className={cn(
                                "relative w-16 h-16 rounded-full border-4 border-black transition-all duration-500 flex items-center justify-center overflow-hidden shadow-xl",
                                status === "caught" ? "bg-red-500 grayscale opacity-80 cursor-not-allowed" : "cursor-pointer hover:scale-110 active:scale-95"
                            )}
                        >
                            {/* Pokeball Design */}
                            <div className={cn("absolute inset-0 bg-gradient-to-b from-red-600 to-red-500 h-1/2 transition-transform duration-500", status === "caught" && "translate-y-0")} />
                            <div className={cn("absolute inset-0 top-1/2 bg-white h-1/2 transition-transform duration-500", status === "caught" && "translate-y-0")} />

                            {/* Center Button */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-4 border-black z-10 flex items-center justify-center">
                                <div className={cn("w-2 h-2 rounded-full", status === "shaking" ? "bg-red-500 animate-pulse" : "bg-transparent")} />
                            </div>
                        </motion.button>
                    </div>

                    <div className="text-center h-6">
                        {status === "caught" && (
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-secondary font-bold font-mono tracking-widest"
                            >
                                MESSAGE CAUGHT!
                            </motion.span>
                        )}
                        {status === "error" && (
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 font-bold font-mono tracking-widest"
                            >
                                ERROR! TRY AGAIN
                            </motion.span>
                        )}
                    </div>
                </form>

                {/* Social Media Links */}
                <div className="mt-16 pt-8 border-t border-white/10">
                    <p className="text-center text-zinc-400 text-sm mb-6">Or connect with me on</p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <a
                            href="https://wa.me/+6285155091153"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-green-500/50 hover:bg-green-500/10 flex items-center justify-center transition-all duration-300"
                            title="WhatsApp"
                        >
                            <svg className="w-6 h-6 text-white group-hover:text-green-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </a>

                        <a
                            href="mailto:alkwarizmi03@gmail.com"
                            className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 flex items-center justify-center transition-all duration-300"
                            title="Email"
                        >
                            <svg className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </a>

                        <a
                            href="https://linkedin.com/in/mohammed-al"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 flex items-center justify-center transition-all duration-300"
                            title="LinkedIn"
                        >
                            <svg className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>

                        <a
                            href="https://github.com/alkwrzm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-gray-400/50 hover:bg-gray-400/10 flex items-center justify-center transition-all duration-300"
                            title="GitHub"
                        >
                            <svg className="w-6 h-6 text-white group-hover:text-gray-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>

                        <a
                            href="https://instagram.com/alkwrzm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 flex items-center justify-center transition-all duration-300"
                            title="Instagram"
                        >
                            <svg className="w-6 h-6 text-white group-hover:text-pink-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
