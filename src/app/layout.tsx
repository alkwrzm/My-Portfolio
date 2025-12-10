import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Product Manager Portfolio",
  description: "Portfolio of an AI Product Manager & Prototyping Specialist. Transforming complex technical capabilities into intuitive user experiences.",
  keywords: ["AI Product Manager", "Product Management", "Artificial Intelligence", "Prototyping", "UX Design", "Machine Learning"],
  authors: [{ name: "Your Name" }], // User can update this
  openGraph: {
    title: "AI Product Manager Portfolio",
    description: "Portfolio of an AI Product Manager & Prototyping Specialist.",
    type: "website",
    locale: "en_US",
    // url: "https://your-portfolio.com", // Placeholder
    // images: ["/og-image.jpg"], // Placeholder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
