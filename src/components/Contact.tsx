"use client";

import { Mail, Linkedin, Instagram, Github, Phone } from "lucide-react";
import Link from "next/link";
import MotionWrapper from "@/components/MotionWrapper";
import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            // Google Sheets API Integration
            // Replace these with your actual credentials later
            const SHEET_ID = "YOUR_SHEET_ID";
            const SHEET_NAME = "Sheet1";
            const API_KEY = "YOUR_API_KEY";

            // For now, we'll use a simple fetch to Google Sheets API
            // You'll need to set up Google Sheets API and get proper credentials
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}:append?valueInputOption=USER_ENTERED&key=${API_KEY}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        values: [
                            [
                                new Date().toISOString(),
                                formData.name,
                                formData.email,
                                formData.phone,
                                formData.message,
                            ],
                        ],
                    }),
                }
            );

            if (response.ok) {
                setSubmitStatus("success");
                setFormData({ name: "", email: "", phone: "", message: "" });
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                    href="mailto:alkwarizmi03@gmail.com"
                                    className="flex items-center gap-4 text-slate-300 hover:text-primary transition-colors"
                                >
                                    <div className="p-3 rounded-full bg-slate-800 text-primary">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <span>alkwarizmi03@gmail.com</span>
                                </Link>
                                <Link
                                    href="https://www.linkedin.com/in/mohammed-al/"
                                    target="_blank"
                                    className="flex items-center gap-4 text-slate-300 hover:text-primary transition-colors"
                                >
                                    <div className="p-3 rounded-full bg-slate-800 text-primary">
                                        <Linkedin className="w-5 h-5" />
                                    </div>
                                    <span>Mohammed Al Kwarizmi</span>
                                </Link>
                                <Link
                                    href="https://instagram.com/alkwrzm"
                                    target="_blank"
                                    className="flex items-center gap-4 text-slate-300 hover:text-primary transition-colors"
                                >
                                    <div className="p-3 rounded-full bg-slate-800 text-primary">
                                        <Instagram className="w-5 h-5" />
                                    </div>
                                    <span>alkwrzm</span>
                                </Link>
                                <Link
                                    href="https://github.com/alkwrzm"
                                    target="_blank"
                                    className="flex items-center gap-4 text-slate-300 hover:text-primary transition-colors"
                                >
                                    <div className="p-3 rounded-full bg-slate-800 text-primary">
                                        <Github className="w-5 h-5" />
                                    </div>
                                    <span>alkwrzm</span>
                                </Link>
                            </div>
                        </div>
                    </MotionWrapper>

                    {/* Contact Form */}
                    <MotionWrapper delay={0.4}>
                        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-sm">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-slate-300">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-slate-300">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium text-slate-300">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+62 812 3456 7890"
                                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-slate-300">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can I help you?"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>

                            {submitStatus === "success" && (
                                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 text-sm">
                                    Message sent successfully! I'll get back to you soon.
                                </div>
                            )}

                            {submitStatus === "error" && (
                                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
                                    Failed to send message. Please try again or email me directly.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-8 py-3.5 bg-primary text-slate-950 font-semibold rounded-lg hover:bg-emerald-400 transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </MotionWrapper>
                </div>
            </div>
        </section>
    );
}
