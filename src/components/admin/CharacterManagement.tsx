"use client"

import { useState } from "react"
import { createCharacter, activateCharacter, deleteCharacter } from "@/actions/character-actions"
import { Upload, Trash2, CheckCircle, Circle, Box } from "lucide-react"

type Character = {
    id: string
    name: string
    modelUrl: string
    imageUrl: string | null
    active: boolean
    createdAt: Date
}

export function CharacterManagement({
    initialCharacters
}: {
    initialCharacters: Character[]
}) {
    // In a real app we might use optimistic updates, but for now we rely on router refresh via server action
    // However, props don't auto-update unless parent re-renders. 
    // Server Actions w/ revalidatePath usually trigger a re-fetch of the current route.

    const [isUploading, setIsUploading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsUploading(true)
        await createCharacter(formData)
        setIsUploading(false)
        // Reset form?
        const form = document.getElementById("char-form") as HTMLFormElement
        form?.reset()
    }

    return (
        <div className="space-y-8">
            <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Box className="w-5 h-5 text-purple-500" />
                    Add New Character
                </h2>
                <form id="char-form" action={handleSubmit} className="flex flex-col gap-4 max-w-lg">
                    <div className="space-y-1">
                        <label className="text-sm text-zinc-400">Character Name</label>
                        <input name="name" type="text" required
                            className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white"
                            placeholder="e.g. Cyber Samurai"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm text-zinc-400">3D Model (.glb)</label>
                            <input name="model" type="file" accept=".glb,.gltf" required
                                className="w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500/10 file:text-purple-500 hover:file:bg-purple-500/20"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-zinc-400">Preview Image (Optional)</label>
                            <input name="image" type="file" accept="image/*"
                                className="w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-500 hover:file:bg-cyan-500/20"
                            />
                        </div>
                    </div>

                    <button disabled={isUploading} className="mt-2 bg-white text-black font-semibold py-2 rounded hover:bg-zinc-200 transition-colors disabled:opacity-50">
                        {isUploading ? "Uploading..." : "Upload Character"}
                    </button>
                </form>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4">Existing Characters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {initialCharacters.map((char) => (
                        <div key={char.id} className={`p-4 border rounded-xl relative group ${char.active ? 'border-green-500/50 bg-green-500/5' : 'border-zinc-800 bg-zinc-900'}`}>
                            {char.imageUrl && (
                                <img src={char.imageUrl} alt={char.name} className="w-full h-32 object-cover rounded-md mb-3 bg-black/50" />
                            )}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-white">{char.name}</h3>
                                    <p className="text-xs text-zinc-500 truncate max-w-[150px]">{char.modelUrl}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => activateCharacter(char.id)}
                                        className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                                        title={char.active ? "Active" : "Activate"}
                                    >
                                        {char.active ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400" />}
                                    </button>
                                    <button onClick={() => deleteCharacter(char.id)}
                                        className="p-2 rounded-full hover:bg-red-500/20 text-zinc-600 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {initialCharacters.length === 0 && (
                        <p className="text-zinc-500 italic">No characters found.</p>
                    )}
                </div>
            </section>
        </div>
    )
}
