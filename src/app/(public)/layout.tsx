
import SmoothScroll from "@/components/SmoothScroll";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SmoothScroll>
            <main className="min-h-screen relative overflow-hidden">
                {children}
            </main>
        </SmoothScroll>
    );
}
