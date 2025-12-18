import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SmoothScroll>
            <Header />
            <main className="min-h-screen relative overflow-hidden">
                {children}
            </main>
            <Footer />
        </SmoothScroll>
    );
}
