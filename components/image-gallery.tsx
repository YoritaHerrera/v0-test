"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Define our image data with categories
const images = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Lush green forest with sunlight filtering through the trees",
    caption: "Forest Sunlight",
    categories: ["nature"],
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Modern skyscraper with glass facade reflecting clouds",
    caption: "Modern Skyscraper",
    categories: ["architecture"],
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Mountain range with snow-capped peaks at sunset",
    caption: "Mountain Sunset",
    categories: ["nature"],
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Historic stone cathedral with intricate carvings and stained glass windows",
    caption: "Historic Cathedral",
    categories: ["architecture"],
  },
  {
    id: 5,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Cascading waterfall in a tropical rainforest setting",
    caption: "Tropical Waterfall",
    categories: ["nature"],
  },
  {
    id: 6,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Minimalist modern home with clean lines and large windows",
    caption: "Minimalist Home",
    categories: ["architecture"],
  },
  {
    id: 7,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Desert landscape with sand dunes at golden hour",
    caption: "Desert Dunes",
    categories: ["nature"],
  },
  {
    id: 8,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Ancient Roman ruins with columns and stone archways",
    caption: "Ancient Ruins",
    categories: ["architecture"],
  },
]

// Define our category options
const categories = [
  { id: "nature", label: "Nature" },
  { id: "architecture", label: "Architecture" },
]

export function ImageGallery() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Toggle a filter on or off
  const toggleFilter = (categoryId: string) => {
    setActiveFilters((current) =>
      current.includes(categoryId) ? current.filter((id) => id !== categoryId) : [...current, categoryId],
    )
  }

  // Filter images based on active filters
  const filteredImages = activeFilters.length
    ? images.filter((image) => image.categories.some((category) => activeFilters.includes(category)))
    : images

  return (
    <div role="region" aria-label="Image gallery with filters">
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Filter by Category:</h2>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Category filters">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => toggleFilter(category.id)}
              variant={activeFilters.includes(category.id) ? "default" : "outline"}
              aria-pressed={activeFilters.includes(category.id)}
              className="flex items-center gap-2"
            >
              <span>{category.label}</span>
              {activeFilters.includes(category.id) && (
                <Badge variant="secondary" className="ml-1">
                  Active
                </Badge>
              )}
            </Button>
          ))}
          {activeFilters.length > 0 && (
            <Button variant="ghost" onClick={() => setActiveFilters([])} aria-label="Clear all filters">
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" aria-live="polite">
        {filteredImages.length > 0 ? (
          filteredImages.map((image) => (
            <figure
              key={image.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="p-4">
                <h3 className="font-medium">{image.caption}</h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  {image.categories.map((category) => {
                    const categoryInfo = categories.find((c) => c.id === category)
                    return (
                      <Badge key={category} variant="outline">
                        {categoryInfo?.label || category}
                      </Badge>
                    )
                  })}
                </div>
              </figcaption>
            </figure>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg font-medium">No images match the selected filters</p>
            <Button variant="link" onClick={() => setActiveFilters([])} className="mt-2">
              Clear filters to show all images
            </Button>
          </div>
        )}
      </div>

      <div className="sr-only" aria-live="polite">
        {filteredImages.length === 1 ? "Showing 1 image" : `Showing ${filteredImages.length} images`}
        {activeFilters.length > 0 &&
          ` filtered by ${activeFilters.map((f) => categories.find((c) => c.id === f)?.label).join(" and ")}`}
      </div>
    </div>
  )
}
