"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createExperience(formData: FormData) {
    const title = formData.get("title") as string
    const company = formData.get("company") as string
    const startDate = new Date(formData.get("startDate") as string)
    const endDateRaw = formData.get("endDate") as string
    const endDate = endDateRaw ? new Date(endDateRaw) : null
    const description = formData.get("description") as string

    try {
        await prisma.experience.create({
            data: {
                title,
                company,
                startDate,
                endDate,
                description,
            }
        })
        revalidatePath("/admin/experience")
        return { success: true }
    } catch (e) {
        return { success: false, error: "Failed to create" }
    }
}

export async function updateExperience(id: string, formData: FormData) {
    const title = formData.get("title") as string
    const company = formData.get("company") as string
    const startDate = new Date(formData.get("startDate") as string)
    const endDateRaw = formData.get("endDate") as string
    const endDate = endDateRaw ? new Date(endDateRaw) : null
    const description = formData.get("description") as string

    try {
        await prisma.experience.update({
            where: { id },
            data: {
                title,
                company,
                startDate,
                endDate,
                description,
            }
        })
        revalidatePath("/admin/experience")
        return { success: true }
    } catch (e) {
        return { success: false, error: "Failed to update" }
    }
}

export async function deleteExperience(id: string) {
    await prisma.experience.delete({ where: { id } })
    revalidatePath("/admin/experience")
}

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
