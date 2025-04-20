"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"

interface ImageSlideProps {
  id: number
  src: string
  alt: string
  caption: string
  categories: string[]
  categoryLabels: Record<string, string>
}

export function ImageSlide({ id, src, alt, caption, categories, categoryLabels }: ImageSlideProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative w-full h-full cursor-pointer">
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
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
            <h3 className="font-medium text-lg">{caption}</h3>
            <div className="flex flex-wrap gap-1 mt-2">
              {categories.map((category) => (
                <Badge key={category} variant="secondary" className="bg-white/20">
                  {categoryLabels[category] || category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
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
