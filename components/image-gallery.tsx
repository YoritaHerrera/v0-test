"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MasonryGrid } from "./masonry-grid"
import { ImageCard } from "./image-card"
import { ChevronDown, Filter, X } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
  {
    id: 9,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Vibrant coral reef with colorful fish and marine life",
    caption: "Coral Reef",
    categories: ["nature", "underwater"],
  },
  {
    id: 10,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Futuristic bridge with innovative design spanning across a river",
    caption: "Futuristic Bridge",
    categories: ["architecture", "modern"],
  },
  {
    id: 11,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Northern lights dancing across the night sky",
    caption: "Aurora Borealis",
    categories: ["nature", "sky"],
  },
  {
    id: 12,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Traditional Japanese temple surrounded by cherry blossoms",
    caption: "Japanese Temple",
    categories: ["architecture", "cultural"],
  },
]

// Define our category options
const categories = [
  { id: "nature", label: "Nature" },
  { id: "architecture", label: "Architecture" },
  { id: "underwater", label: "Underwater" },
  { id: "modern", label: "Modern" },
  { id: "sky", label: "Sky" },
  { id: "cultural", label: "Cultural" },
]

export function ImageGallery() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)
  const announcerRef = useRef<HTMLDivElement>(null)

  // Toggle a filter on or off
  const toggleFilter = (categoryId: string) => {
    setActiveFilters((current) => {
      const newFilters = current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId]

      // Announce filter changes to screen readers
      if (announcerRef.current) {
        const categoryLabel = categories.find((c) => c.id === categoryId)?.label || categoryId
        const action = current.includes(categoryId) ? "removed" : "added"
        announcerRef.current.textContent = `Filter ${categoryLabel} ${action}. ${
          newFilters.length === 0
            ? "Showing all images."
            : `Showing images filtered by ${newFilters.map((f) => categories.find((c) => c.id === f)?.label).join(", ")}.`
        }`
      }

      return newFilters
    })
  }

  // Filter images based on active filters
  const filteredImages = activeFilters.length
    ? images.filter((image) => image.categories.some((category) => activeFilters.includes(category)))
    : images

  // Create a mapping of category IDs to labels for easier access
  const categoryLabels = categories.reduce(
    (acc, category) => {
      acc[category.id] = category.label
      return acc
    },
    {} as Record<string, string>,
  )

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold">Browse Gallery</h2>

          <div className="relative" ref={filterRef}>
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              aria-expanded={isFilterOpen}
              aria-controls="filter-menu"
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
              {activeFilters.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>

            {isFilterOpen && (
              <div
                id="filter-menu"
                className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="filter-button"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Filter by Category</h3>
                    {activeFilters.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveFilters([])}
                        aria-label="Clear all filters"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`flex justify-start w-full ${
                            activeFilters.includes(category.id) ? "bg-primary/10 text-primary" : ""
                          }`}
                          onClick={() => toggleFilter(category.id)}
                          aria-pressed={activeFilters.includes(category.id)}
                        >
                          <span>{category.label}</span>
                          {activeFilters.includes(category.id) && (
                            <Badge variant="secondary" className="ml-auto">
                              Active
                            </Badge>
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 py-1">Active filters:</span>
            {activeFilters.map((filter) => {
              const categoryInfo = categories.find((c) => c.id === filter)
              return (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                  {categoryInfo?.label || filter}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => toggleFilter(filter)}
                    aria-label={`Remove ${categoryInfo?.label || filter} filter`}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )
            })}
            <Button
              variant="ghost"
              size="sm"
              className="text-sm"
              onClick={() => setActiveFilters([])}
              aria-label="Clear all filters"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      <div aria-live="polite" className="sr-only" ref={announcerRef}>
        {filteredImages.length === 1 ? "Showing 1 image" : `Showing ${filteredImages.length} images`}
        {activeFilters.length > 0 &&
          ` filtered by ${activeFilters.map((f) => categories.find((c) => c.id === f)?.label).join(", ")}`}
      </div>

      {filteredImages.length > 0 ? (
        <MasonryGrid columnCount={{ mobile: 1, tablet: 2, desktop: 3 }} gap={16}>
          {filteredImages.map((image) => (
            <ImageCard
              key={image.id}
              id={image.id}
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              caption={image.caption}
              categories={image.categories}
              categoryLabels={categoryLabels}
            />
          ))}
        </MasonryGrid>
      ) : (
        <div
          className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg"
          role="status"
          aria-live="polite"
        >
          <p className="text-lg font-medium mb-4">No images match the selected filters</p>
          <Button onClick={() => setActiveFilters([])}>Clear filters to show all images</Button>
        </div>
      )}

      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="accessibility-info">
            <AccordionTrigger className="text-sm text-gray-500 dark:text-gray-400">
              Accessibility Information
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <p>This gallery is fully accessible with keyboard navigation.</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Use Tab to navigate between interactive elements</li>
                  <li>Press Enter or Space to select filters or open images</li>
                  <li>Press Escape to close the expanded image view</li>
                  <li>Screen reader announcements are provided for filter changes</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
