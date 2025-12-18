"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export function SignOutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-950/30 transition-all text-sm"
        >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
        </button>
    )
}
