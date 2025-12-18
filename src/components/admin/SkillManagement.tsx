"use client"

import { createSkill, updateSkill, deleteSkill, reorderSkills } from "@/actions/cms-actions"
import { Trash2, Plus, Edit2, X, ExternalLink, GripVertical } from "lucide-react"
import { useState, useRef } from "react"
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

type Skill = {
    id: string
    name: string
    category: string
    proficiency: number
    link: string | null
    order: number
}

export function SkillManagement({ skills: initialSkills }: { skills: Skill[] }) {
    const [skills, setSkills] = useState(initialSkills)
    const [editingId, setEditingId] = useState<string | null>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    async function handleSubmit(formData: FormData) {
        if (editingId) {
            await updateSkill(editingId, formData)
            setEditingId(null)
        } else {
            await createSkill(formData)
        }
        formRef.current?.reset()
    }

    const startEditing = (skill: Skill) => {
        setEditingId(skill.id)
        if (formRef.current) {
            const form = formRef.current
                ; (form.elements.namedItem("name") as HTMLInputElement).value = skill.name
                ; (form.elements.namedItem("category") as HTMLInputElement).value = skill.category
                ; (form.elements.namedItem("proficiency") as HTMLInputElement).value = skill.proficiency.toString()
                ; (form.elements.namedItem("link") as HTMLInputElement).value = skill.link || ""
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
            const oldIndex = skills.findIndex((s) => s.id === active.id)
            const newIndex = skills.findIndex((s) => s.id === over.id)

            const newSkills = arrayMove(skills, oldIndex, newIndex)
            setSkills(newSkills)

            const updates = newSkills.map((skill, index) => ({
                id: skill.id,
                order: index
            }))

            await reorderSkills(updates)
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="col-span-1">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            {editingId ? <Edit2 className="w-5 h-5 text-yellow-500" /> : <Plus className="w-5 h-5 text-cyan-500" />}
                            {editingId ? "Edit Certification" : "Add Certification"}
                        </h2>
                        {editingId && (
                            <button onClick={cancelEditing} className="text-sm text-zinc-500 hover:text-white flex items-center gap-1">
                                <X className="w-3 h-3" /> Cancel
                            </button>
                        )}
                    </div>

                    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
                        <div className="space-y-1">
                            <label className="text-sm text-zinc-400">Certification Name</label>
                            <input name="name" required placeholder="AWS Solutions Architect" className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-zinc-400">Issuer / Category</label>
                            <input name="category" required placeholder="Amazon Web Services" className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-zinc-400">Credential Link (Optional)</label>
                            <input name="link" type="url" placeholder="https://..." className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-zinc-400">Year / Score (Optional)</label>
                            <input name="proficiency" type="number" min="0" max="2100" defaultValue="2024" className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
                        </div>
                        <button className={`font-semibold py-2 rounded transition-colors ${editingId ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-white hover:bg-zinc-200 text-black'}`}>
                            {editingId ? "Update Certification" : "Save Certification"}
                        </button>
                    </form>
                </div>
            </section>

            <section className="col-span-1 lg:col-span-2">
                <div className="mb-4 text-sm text-zinc-500 flex items-center gap-2">
                    <GripVertical className="w-4 h-4" />
                    Drag to reorder certifications
                </div>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={skills.map(s => s.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {skills.map((skill) => (
                                <SortableSkillCard
                                    key={skill.id}
                                    skill={skill}
                                    isEditing={editingId === skill.id}
                                    onEdit={startEditing}
                                    onDelete={deleteSkill}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </section>
        </div>
    )
}

function SortableSkillCard({
    skill,
    isEditing,
    onEdit,
    onDelete
}: {
    skill: Skill
    isEditing: boolean
    onEdit: (skill: Skill) => void
    onDelete: (id: string) => void
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: skill.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`bg-zinc-900/50 border rounded-xl p-4 flex items-center gap-3 group transition-all ${isEditing ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-zinc-800 hover:border-zinc-700'
                }`}
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-zinc-800/50 rounded transition-colors"
            >
                <GripVertical className="w-4 h-4 text-zinc-600" />
            </div>

            <div className="flex-1">
                <h3 className="font-bold text-white flex items-center gap-2">
                    {skill.name}
                    {skill.link && (
                        <a href={skill.link} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-cyan-400">
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">{skill.category}</span>
                    <span className="text-xs text-cyan-500 font-mono">{skill.proficiency}</span>
                </div>
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => onEdit(skill)} className="p-2 text-zinc-600 hover:text-yellow-500 transition-colors">
                    <Edit2 className="w-5 h-5" />
                </button>
                <button onClick={() => onDelete(skill.id)} className="p-2 text-zinc-600 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}
