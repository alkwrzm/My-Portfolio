"use client"

import { createProject, updateProject, deleteProject, reorderProjects } from "@/actions/cms-actions"
import { Trash2, Plus, ExternalLink, Image as ImageIcon, Edit2, X, ChevronLeft, ChevronRight, GripVertical } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Project } from "@prisma/client"
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

export function ProjectManagement({ projects: initialProjects }: { projects: Project[] }) {
    const router = useRouter()
    const [projects, setProjects] = useState(initialProjects)
    const [editingId, setEditingId] = useState<string | null>(null)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        setProjects(initialProjects)
    }, [initialProjects])

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    async function handleSubmit(formData: FormData) {
        if (editingId) {
            await updateProject(editingId, formData)
            setEditingId(null)
        } else {
            await createProject(formData)
        }
        formRef.current?.reset()
        router.refresh()
    }

    const startEditing = (proj: Project) => {
        setEditingId(proj.id)
        if (formRef.current) {
            const form = formRef.current
                ; (form.elements.namedItem("title") as HTMLInputElement).value = proj.title
                ; (form.elements.namedItem("description") as HTMLTextAreaElement).value = proj.description
                ; (form.elements.namedItem("tags") as HTMLInputElement).value = proj.tags
                ; (form.elements.namedItem("link") as HTMLInputElement).value = proj.link || ""
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
            const oldIndex = projects.findIndex((p) => p.id === active.id)
            const newIndex = projects.findIndex((p) => p.id === over.id)

            const newProjects = arrayMove(projects, oldIndex, newIndex)
            setProjects(newProjects)

            // Update order values based on new positions
            const updates = newProjects.map((proj, index) => ({
                id: proj.id,
                order: index
            }))

            await reorderProjects(updates)
        }
    }

    const handleDelete = async (id: string) => {
        await deleteProject(id)
        router.refresh()
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="col-span-1">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            {editingId ? <Edit2 className="w-5 h-5 text-yellow-500" /> : <Plus className="w-5 h-5 text-cyan-500" />}
                            {editingId ? "Edit Project" : "Add Project"}
                        </h2>
                        {editingId && (
                            <button onClick={cancelEditing} className="text-sm text-zinc-500 hover:text-white flex items-center gap-1">
                                <X className="w-3 h-3" /> Cancel
                            </button>
                        )}
                    </div>

                    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
                        <div className="space-y-1">
                            <label className="text-sm text-zinc-400">Title</label>
                            <input name="title" required placeholder="Portfolio v2" className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-zinc-400">Description</label>
                            <textarea name="description" rows={3} required placeholder="Built with Next.js..." className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-zinc-400">Tags (comma separated)</label>
                            <input name="tags" required placeholder="Next.js, TypeScript, Tailwind" className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-zinc-400">Project Link</label>
                            <input name="link" type="url" placeholder="https://github.com/..." className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-zinc-400">Images (Select Multiple) {editingId && "(Appends to existing)"}</label>
                            <input name="images" type="file" accept="image/*" multiple className="w-full text-sm text-white" />
                        </div>
                        <button className={`font-semibold py-2 rounded transition-colors ${editingId ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-white hover:bg-zinc-200 text-black'}`}>
                            {editingId ? "Update Project" : "Save Project"}
                        </button>
                    </form>
                </div>
            </section>

            <section className="col-span-1 lg:col-span-2">
                <div className="mb-4 text-sm text-zinc-500 flex items-center gap-2">
                    <GripVertical className="w-4 h-4" />
                    Drag to reorder projects (top = highest priority)
                </div>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={projects.map(p => p.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="grid grid-cols-1 gap-6">
                            {projects.map((proj) => (
                                <SortableProjectCard
                                    key={proj.id}
                                    project={proj}
                                    isEditing={editingId === proj.id}
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

function SortableProjectCard({
    project,
    isEditing,
    onEdit,
    onDelete
}: {
    project: Project
    isEditing: boolean
    onEdit: (proj: Project) => void
    onDelete: (id: string) => void
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: project.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`bg-zinc-900/50 border rounded-xl overflow-hidden flex flex-col md:flex-row group transition-all ${isEditing ? 'border-yellow-500/50' : 'border-zinc-800 hover:border-zinc-700'
                }`}
        >
            {/* Drag Handle */}
            <div
                {...attributes}
                {...listeners}
                className="flex items-center justify-center w-full md:w-12 h-12 md:h-auto bg-zinc-950/50 cursor-grab active:cursor-grabbing hover:bg-zinc-800/50 transition-colors"
            >
                <GripVertical className="w-5 h-5 text-zinc-600" />
            </div>

            <div className="w-full md:w-48 h-48 md:h-auto bg-zinc-950 flex-shrink-0 relative">
                <ProjectImageCarousel images={project.images || []} title={project.title} />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <button onClick={() => onEdit(project)} className="text-zinc-600 hover:text-yellow-500 transition-colors">
                                <Edit2 className="w-5 h-5" />
                            </button>
                            <button onClick={() => onDelete(project.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <p className="text-zinc-400 text-sm mt-2 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.split(',').map((tag: string, i: number) => (
                            <span key={i} className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300">{tag.trim()}</span>
                        ))}
                    </div>
                </div>
                {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-cyan-500 text-sm mt-4 hover:underline">
                        <ExternalLink className="w-3 h-3" /> View Project
                    </a>
                )}
            </div>
        </div>
    )
}

function ProjectImageCarousel({ images, title }: { images: string[], title: string }) {
    const [index, setIndex] = useState(0)

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center text-zinc-700">
                <ImageIcon className="w-8 h-8" />
            </div>
        )
    }

    const next = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIndex((i) => (i + 1) % images.length)
    }

    const prev = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIndex((i) => (i - 1 + images.length) % images.length)
    }

    return (
        <div className="relative w-full h-full group/carousel">
            <img src={images[index]} alt={`${title} ${index + 1}`} className="w-full h-full object-cover" />

            {images.length > 1 && (
                <>
                    <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {images.map((_, i) => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/30'}`} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
