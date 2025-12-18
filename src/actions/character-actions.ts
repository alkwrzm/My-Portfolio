"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { uploadFile } from "./upload-actions"

export async function createCharacter(formData: FormData) {
    const name = formData.get("name") as string
    const modelFile = formData.get("model") as File
    const imageFile = formData.get("image") as File | null

    if (!modelFile) {
        throw new Error("Model file is required")
    }

    try {
        const modelUrl = await uploadFile(createFormData("file", modelFile))
        let imageUrl = null

        if (imageFile && imageFile.size > 0) {
            imageUrl = await uploadFile(createFormData("file", imageFile))
        }

        await prisma.character.create({
            data: {
                name,
                modelUrl,
                imageUrl,
            }
        })

        revalidatePath("/admin/character")
        return { success: true }
    } catch (e) {
        console.error(e)
        return { success: false, error: "Failed to create character" }
    }
}

export async function activateCharacter(id: string) {
    // Deactivate all others first (optional, or just one active)
    await prisma.character.updateMany({
        data: { active: false }
    })

    await prisma.character.update({
        where: { id },
        data: { active: true }
    })

    revalidatePath("/admin/character")
}

export async function deleteCharacter(id: string) {
    await prisma.character.delete({
        where: { id }
    })
    revalidatePath("/admin/character")
}

// Helper to wrap single file in FormData for reuse
function createFormData(key: string, file: File) {
    const fd = new FormData()
    fd.append(key, file)
    return fd
}
