"use server"

import { writeFile } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

export async function uploadFile(formData: FormData) {
    const file = formData.get("file") as File | null

    if (!file) {
        throw new Error("No file uploaded")
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Validate extension (basic)
    const name = file.name
    const ext = name.split(".").pop()
    const fileName = `${uuidv4()}.${ext}`

    // Safe path (public/uploads)
    const path = join(process.cwd(), "public", "uploads", fileName)

    await writeFile(path, buffer)

    return `/uploads/${fileName}`
}
