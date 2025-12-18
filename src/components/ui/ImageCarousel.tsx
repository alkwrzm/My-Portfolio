"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"

export default function ImageCarousel({ images, title, className }: { images: string[], title: string, className?: string }) {
    const [index, setIndex] = useState(0)

    if (!images || images.length === 0) {
        return (
            <div className={`w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-700 ${className}`}>
                <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-xs font-mono">NO_SIGNAL</span>
                </div>
            </div>
        )
    }

    const next = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIndex((i) => (i + 1) % images.length)
    }

    const prev = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIndex((i) => (i - 1 + images.length) % images.length)
    }

    return (
        <div className={`relative w-full h-full group/carousel overflow-hidden ${className}`}>
            <Image
                src={images[index]}
                alt={`${title} ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {images.length > 1 && (
                <>
                    <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-cyan-500 hover:text-black">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-cyan-500 hover:text-black">
                        <ChevronRight className="w-4 h-4" />
                    </button>

                    <div className="absolute top-4 right-4 flex gap-1 z-20">
                        {images.map((_, i) => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full shadow-sm ${i === index ? 'bg-cyan-400' : 'bg-white/50'}`} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
