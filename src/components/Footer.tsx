export default function Footer() {
    return (
        <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center">
            <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} AI Product Manager Portfolio. Built with Next.js and Tailwind CSS.
            </p>
        </footer>
    );
}
