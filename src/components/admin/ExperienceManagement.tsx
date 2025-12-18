"use client"

import { createExperience, updateExperience, deleteExperience, reorderExperiences } from "@/actions/experience-actions"
import { Trash2, Plus, Calendar, Briefcase, Edit2, X, GripVertical } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type Experience = {
    id: string
    title: string
    company: string
    startDate: Date
    endDate: Date | null
    description: string
    order: number
}

export function ExperienceManagement({ experiences: initialExperiences }: { experiences: Experience[] }) {
    const router = useRouter()
    const [experiences, setExperiences] = useState(initialExperiences)
    const [editingId, setEditingId] = useState<string | null>(null)
    const formRef = useRef<HTMLFormElement>(null)

    // Sync with server data when it changes
    useEffect(() => {
        setExperiences(initialExperiences)
    }, [initialExperiences])

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const formatDate = (date: Date | null) => {
        if (!date) return ""
        return new Date(date).toISOString().split('T')[0]
    }

    async function handleSubmit(formData: FormData) {
        if (editingId) {
            await updateExperience(editingId, formData)
            setEditingId(null)
        } else {
            await createExperience(formData)
        }
        formRef.current?.reset()
        router.refresh()
    }

    const startEditing = (exp: Experience) => {
        setEditingId(exp.id)
        if (formRef.current) {
            const form = formRef.current
                ; (form.elements.namedItem("title") as HTMLInputElement).value = exp.title
                ; (form.elements.namedItem("company") as HTMLInputElement).value = exp.company
                ; (form.elements.namedItem("startDate") as HTMLInputElement).value = formatDate(exp.startDate)
                ; (form.elements.namedItem("endDate") as HTMLInputElement).value = formatDate(exp.endDate)
                ; (form.elements.namedItem("description") as HTMLTextAreaElement).value = exp.description
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const cancelEditing = () => {
        setEditingId(null)
        formRef.current?.reset()
    }

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = experiences.findIndex((e) => e.id === active.id)
            const newIndex = experiences.findIndex((e) => e.id === over.id)

            const newExperiences = arrayMove(experiences, oldIndex, newIndex)
            setExperiences(newExperiences)

            const updates = newExperiences.map((exp, index) => ({
                id: exp.id,
                order: index
            }))

            await reorderExperiences(updates)
        }
    }

    const handleDelete = async (id: string) => {
        await deleteExperience(id)
        router.refresh()
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="col-span-1">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            {editingId ? <Edit2 className="w-5 h-5 text-yellow-500" /> : <Plus className="w-5 h-5 text-cyan-500" />}
                            {editingId ? "Edit Experience" : "Add Experience"}
                        </h2>
                        {editingId && (
                            <button onClick={cancelEditing} className="text-sm text-zinc-500 hover:text-white flex items-center gap-1">
                                <X className="w-3 h-3" /> Cancel
                            </button>
                        )}
                    </div>

                    <form id="exp-form" ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
                        <div className="space-y-1">
                            <label className="text-sm text-zinc-400">Job Title</label>
                            <input name="title" type="text" required placeholder="Senior Developer"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-zinc-400">Company</label>
                            <input name="company" type="text" required placeholder="Tech Corp"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <label className="text-sm text-zinc-400">Start Date</label>
                                <input name="startDate" type="date" required
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm text-zinc-400">End Date</label>
                                <input name="endDate" type="date"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
                                <span className="text-xs text-zinc-600 block pt-1">Leave empty for "Present"</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-zinc-400">Description</label>
                            <textarea name="description" required rows={4} placeholder="Key responsibilities..."
                                className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
                        </div>
                        <button className={`font-semibold py-2 rounded transition-colors ${editingId ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-white hover:bg-zinc-200 text-black'}`}>
                            {editingId ? "Update Experience" : "Save Experience"}
                        </button>
                    </form>
                </div>
            </section>

            <section className="col-span-1 lg:col-span-2">
                <div className="mb-4 text-sm text-zinc-500 flex items-center gap-2">
                    <GripVertical className="w-4 h-4" />
                    Drag to reorder experiences
                </div>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={experiences.map(e => e.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-4">
                            {experiences.map((exp) => (
                                <SortableExperienceCard
                                    key={exp.id}
                                    experience={exp}
                                    isEditing={editingId === exp.id}
                                    onEdit={startEditing}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </section>
        </div>
    )
}

function SortableExperienceCard({
    experience,
    isEditing,
    onEdit,
    onDelete
}: {
    experience: Experience
    isEditing: boolean
    onEdit: (exp: Experience) => void
    onDelete: (id: string) => void
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: experience.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`bg-zinc-900/50 border rounded-xl p-6 relative group transition-all ${isEditing ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-zinc-800 hover:border-zinc-700'
                }`}
        >
            <div
                {...attributes}
                {...listeners}
                className="absolute left-2 top-2 cursor-grab active:cursor-grabbing p-2 hover:bg-zinc-800/50 rounded transition-colors"
            >
                <GripVertical className="w-5 h-5 text-zinc-600" />
            </div>

            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => onEdit(experience)}
                    className="p-2 text-zinc-600 hover:text-yellow-500 transition-colors"
                >
                    <Edit2 className="w-5 h-5" />
                </button>
                <button onClick={() => onDelete(experience.id)}
                    className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>

            <div className="flex flex-col gap-2 pl-10">
                <div className="flex items-start justify-between pr-20">
                    <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            {experience.title}
                        </h3>
                        <p className="text-cyan-400 font-medium flex items-center gap-2 mt-1">
                            <Briefcase className="w-4 h-4" />
                            {experience.company}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-500 mt-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                        {new Date(experience.startDate).toLocaleDateString()} -
                        {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : " Present"}
                    </span>
                </div>

                <p className="text-zinc-400 text-sm mt-4 whitespace-pre-wrap">{experience.description}</p>
            </div>
        </div>
    )
}
