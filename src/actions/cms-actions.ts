"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

// --- SKILLS ---
export async function createSkill(formData: FormData) {
    const name = formData.get("name") as string
    const category = formData.get("category") as string
    const proficiency = parseInt(formData.get("proficiency") as string || "0")
    const link = formData.get("link") as string

    await prisma.skill.create({
        data: { name, category, proficiency, link } as any
    })
    revalidatePath("/admin/skills")
    revalidatePath("/")
}

export async function updateSkill(id: string, formData: FormData) {
    const name = formData.get("name") as string
    const category = formData.get("category") as string
    const proficiency = parseInt(formData.get("proficiency") as string || "0")
    const link = formData.get("link") as string

    await prisma.skill.update({
        where: { id },
        data: { name, category, proficiency, link } as any
    })
    revalidatePath("/admin/skills")
    revalidatePath("/")
}

export async function deleteSkill(id: string) {
    await prisma.skill.delete({ where: { id } })
    revalidatePath("/admin/skills")
    revalidatePath("/")
}

export async function reorderSkills(items: { id: string, order: number }[]) {
    await prisma.$transaction(
        items.map((item) =>
            prisma.skill.update({
                where: { id: item.id },
                data: { order: item.order }
            })
        )
    )
    revalidatePath("/admin/skills")
    revalidatePath("/")
}

// --- EXPERIENCES ---
export async function reorderExperiences(items: { id: string, order: number }[]) {
    await prisma.$transaction(
        items.map((item) =>
            prisma.experience.update({
                where: { id: item.id },
                data: { order: item.order }
            })
        )
    )
    revalidatePath("/admin/experience")
    revalidatePath("/")
}

// --- PROJECTS ---
// --- PROJECTS ---
export async function createProject(formData: FormData) {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const tags = formData.get("tags") as string
    const link = formData.get("link") as string
    const valOrder = parseInt(formData.get("order") as string || "0", 10)
    const order = isNaN(valOrder) ? 0 : valOrder

    // Handle multiple file uploads
    const imageFiles = formData.getAll("images") as File[]
    const images: string[] = []

    if (imageFiles.length > 0) {
        const { uploadFile } = await import("./upload-actions")
        for (const file of imageFiles) {
            if (file.size > 0) {
                const url = await uploadFile(createFormData("file", file))
                images.push(url)
            }
        }
    }

    await prisma.project.create({
        data: {
            title,
            description,
            tags,
            link,
            images,
            order
        } as any
    })
    revalidatePath("/admin/projects")
    revalidatePath("/")
    revalidatePath("/projects")
}

export async function updateProject(id: string, formData: FormData) {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const tags = formData.get("tags") as string
    const link = formData.get("link") as string
    const valOrder = parseInt(formData.get("order") as string || "0", 10)
    const order = isNaN(valOrder) ? 0 : valOrder

    const imageFiles = formData.getAll("images") as File[]
    const newImages: string[] = []

    if (imageFiles.length > 0) {
        const { uploadFile } = await import("./upload-actions")
        for (const file of imageFiles) {
            if (file.size > 0) {
                const url = await uploadFile(createFormData("file", file))
                newImages.push(url)
            }
        }
    }

    const data: any = {
        title,
        description,
        tags,
        link,
        order
    }

    if (newImages.length > 0) {
        // Fetch existing logic isn't here, so we need to use atomic update if Prisma supports it, or fetch first.
        // Prisma 'push' to array:
        data.images = {
            push: newImages
        }
    }

    await prisma.project.update({
        where: { id },
        data: data as any
    })
    revalidatePath("/admin/projects")
    revalidatePath("/")
    revalidatePath("/projects")
}

export async function deleteProjectImage(projectId: string, imageUrl: string) {
    const project = await prisma.project.findUnique({ where: { id: projectId } })
    if (!project) return

    const updatedImages = project.images.filter((img: string) => img !== imageUrl)

    await prisma.project.update({
        where: { id: projectId },
        data: { images: updatedImages }
    })

    revalidatePath("/admin/projects")
    revalidatePath("/")
    revalidatePath("/projects")
}

export async function deleteProject(id: string) {
    await prisma.project.delete({ where: { id } })
    revalidatePath("/admin/projects")
    revalidatePath("/")
    revalidatePath("/projects")
}

export async function reorderProjects(items: { id: string, order: number }[]) {
    // Transactional update for better data integrity
    await prisma.$transaction(
        items.map((item) =>
            prisma.project.update({
                where: { id: item.id },
                data: { order: item.order }
            })
        )
    )
    revalidatePath("/admin/projects")
    // Also revalidate public pages where order matters
    revalidatePath("/")
    revalidatePath("/projects")
}

// Helper to wrap single file in FormData
function createFormData(key: string, file: File) {
    const fd = new FormData()
    fd.append(key, file)
    return fd
}
