"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"

interface ImageCardProps {
  id: number
  src: string
  alt: string
  caption: string
  categories: string[]
  categoryLabels: Record<string, string>
}

export function ImageCard({ id, src, alt, caption, categories, categoryLabels }: ImageCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <figure
          className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 h-full"
          style={{ aspectRatio: Math.random() * (1.5 - 0.8) + 0.8 }}
        >
          <div className="relative w-full h-full">
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                <div className="animate-pulse h-full w-full bg-gray-200 dark:bg-gray-600" />
              </div>
            )}
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setIsLoaded(true)}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
          <figcaption className="absolute bottom-0 w-full p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <h3 className="font-medium text-gray-900 dark:text-white">{caption}</h3>
            <div className="flex flex-wrap gap-1 mt-2">
              {categories.map((category) => (
                <Badge key={category} variant="outline" className="bg-white/50 dark:bg-gray-700/50">
                  {categoryLabels[category] || category}
                </Badge>
              ))}
            </div>
          </figcaption>
        </figure>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative aspect-square md:aspect-auto">
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{caption}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">{alt}</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {categoryLabels[category] || category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
