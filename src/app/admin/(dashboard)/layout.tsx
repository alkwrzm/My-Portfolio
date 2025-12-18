import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, User, Briefcase, Award, FolderOpen, LogOut } from "lucide-react"
import { SignOutButton } from "@/components/admin/SignOutButton" // We'll create this client component

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/admin/login")
    }

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/character", label: "3D Character", icon: User },
        { href: "/admin/experience", label: "Experience", icon: Briefcase },
        { href: "/admin/skills", label: "Certifications", icon: Award },
        { href: "/admin/projects", label: "Projects", icon: FolderOpen },
    ]

    return (
        <div className="flex min-h-screen bg-black text-zinc-100 font-sans selection:bg-cyan-500/30">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800 bg-zinc-950/50 hidden md:flex flex-col">
                <div className="p-6 border-b border-zinc-800">
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                        Portfolio CMS
                    </h1>
                    <p className="text-xs text-zinc-500 mt-1">v1.0.0</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all group"
                        >
                            <item.icon className="w-5 h-5 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-zinc-800">
                    <div className="flex items-center gap-3 px-3 py-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold">
                            {session.user?.name?.[0] || "A"}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{session.user?.name}</p>
                            <p className="text-xs text-zinc-500 truncate">{session.user?.email}</p>
                        </div>
                    </div>
                    <SignOutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
