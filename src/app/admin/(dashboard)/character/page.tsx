import { prisma } from "@/lib/db"
import { CharacterManagement } from "@/components/admin/CharacterManagement"

export default async function CharacterPage() {
    const characters = await prisma.character.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="p-8">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-white">3D Character Manager</h2>
                <p className="text-zinc-500">Upload and switch between your 3D avatars.</p>
            </header>

            <CharacterManagement initialCharacters={characters} />
        </div>
    )
}
