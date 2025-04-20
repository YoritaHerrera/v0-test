"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"
import { BentoCarousel } from "./bento-carousel"
import { BentoGrid, BentoGridItem } from "./bento-grid"
import { ImageSlide } from "./image-slide"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Define our image data with categories
const images = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Lush green forest with sunlight filtering through the trees",
    caption: "Forest Sunlight",
    categories: ["nature"],
    size: { col: 2, row: 1 },
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Modern skyscraper with glass facade reflecting clouds",
    caption: "Modern Skyscraper",
    categories: ["architecture"],
    size: { col: 1, row: 1 },
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Mountain range with snow-capped peaks at sunset",
    caption: "Mountain Sunset",
    categories: ["nature"],
    size: { col: 1, row: 2 },
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Historic stone cathedral with intricate carvings and stained glass windows",
    caption: "Historic Cathedral",
    categories: ["architecture"],
    size: { col: 2, row: 1 },
  },
  {
    id: 5,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Cascading waterfall in a tropical rainforest setting",
    caption: "Tropical Waterfall",
    categories: ["nature"],
    size: { col: 1, row: 1 },
  },
  {
    id: 6,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Minimalist modern home with clean lines and large windows",
    caption: "Minimalist Home",
    categories: ["architecture"],
    size: { col: 3, row: 1 },
  },
  {
    id: 7,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Desert landscape with sand dunes at golden hour",
    caption: "Desert Dunes",
    categories: ["nature"],
    size: { col: 2, row: 1 },
  },
  {
    id: 8,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Ancient Roman ruins with columns and stone archways",
    caption: "Ancient Ruins",
    categories: ["architecture"],
    size: { col: 1, row: 1 },
  },
  {
    id: 9,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Vibrant coral reef with colorful fish and marine life",
    caption: "Coral Reef",
    categories: ["nature", "underwater"],
    size: { col: 2, row: 1 },
  },
  {
    id: 10,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Futuristic bridge with innovative design spanning across a river",
    caption: "Futuristic Bridge",
    categories: ["architecture", "modern"],
    size: { col: 1, row: 1 },
  },
]

// Define our category options
const categories = [
  { id: "nature", label: "Naturaleza" },
  { id: "architecture", label: "Arquitectura" },
  { id: "underwater", label: "Submarino" },
  { id: "modern", label: "Moderno" },
  { id: "sky", label: "Cielo" },
  { id: "cultural", label: "Cultural" },
]

// Group images into slides of 6 for the bento grid
const groupImagesIntoSlides = (images: typeof images, activeFilters: string[]) => {
  const filteredImages = activeFilters.length
    ? images.filter((image) => image.categories.some((category) => activeFilters.includes(category)))
    : images

  const slides = []
  const imagesPerSlide = 6

  for (let i = 0; i < filteredImages.length; i += imagesPerSlide) {
    slides.push(filteredImages.slice(i, i + imagesPerSlide))
  }

  return slides
}

export function ImageGallery() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
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
        announcerRef.current.textContent = `Filtro ${categoryLabel} ${action}. ${
          newFilters.length === 0
            ? "Mostrando todas las imágenes."
            : `Mostrando imágenes filtradas por ${newFilters
                .map((f) => categories.find((c) => c.id === f)?.label)
                .join(", ")}.`
        }`
      }

      return newFilters
    })
  }

  // Create a mapping of category IDs to labels for easier access
  const categoryLabels = categories.reduce(
    (acc, category) => {
      acc[category.id] = category.label
      return acc
    },
    {} as Record<string, string>,
  )

  // Group images into slides
  const slides = groupImagesIntoSlides(images, activeFilters)

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold">Explorar Galería</h2>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilters.includes(category.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter(category.id)}
                aria-pressed={activeFilters.includes(category.id)}
                className="flex items-center gap-1"
              >
                {category.label}
                {activeFilters.includes(category.id) && (
                  <X
                    className="h-3 w-3 ml-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFilter(category.id)
                    }}
                  />
                )}
              </Button>
            ))}
            {activeFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveFilters([])}
                aria-label="Limpiar todos los filtros"
              >
                <Filter className="h-4 w-4 mr-1" />
                Limpiar
              </Button>
            )}
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">Filtros activos:</span>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => {
                const categoryInfo = categories.find((c) => c.id === filter)
                return (
                  <Badge key={filter} variant="secondary">
                    {categoryInfo?.label || filter}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <div aria-live="polite" className="sr-only" ref={announcerRef}>
        {slides.length === 0
          ? "No hay imágenes que coincidan con los filtros seleccionados."
          : `Mostrando ${slides.reduce((acc, slide) => acc + slide.length, 0)} imágenes en ${
              slides.length
            } diapositivas.`}
      </div>

      {slides.length > 0 ? (
        <div className="relative">
          <BentoCarousel autoPlay={true} interval={6000}>
            {slides.map((slide, slideIndex) => (
              <div key={slideIndex} className="w-full h-[600px] p-4">
                <BentoGrid className="h-full">
                  {slide.map((image) => (
                    <BentoGridItem
                      key={image.id}
                      className="relative overflow-hidden rounded-xl p-0"
                      colSpan={image.size.col}
                      rowSpan={image.size.row}
                    >
                      <ImageSlide
                        id={image.id}
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        caption={image.caption}
                        categories={image.categories}
                        categoryLabels={categoryLabels}
                      />
                    </BentoGridItem>
                  ))}
                </BentoGrid>
              </div>
            ))}
          </BentoCarousel>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg"
          role="status"
          aria-live="polite"
        >
          <p className="text-lg font-medium mb-4">No hay imágenes que coincidan con los filtros seleccionados</p>
          <Button onClick={() => setActiveFilters([])}>Limpiar filtros para mostrar todas las imágenes</Button>
        </div>
      )}

      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="accessibility-info">
            <AccordionTrigger className="text-sm text-gray-500 dark:text-gray-400">
              Información de Accesibilidad
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <p>Esta galería es completamente accesible con navegación por teclado.</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Use Tab para navegar entre elementos interactivos</li>
                  <li>Presione Enter o Espacio para seleccionar filtros o abrir imágenes</li>
                  <li>Use las flechas izquierda/derecha para navegar entre diapositivas</li>
                  <li>Presione Espacio para pausar/reanudar la reproducción automática</li>
                  <li>Presione Escape para cerrar la vista ampliada de la imagen</li>
                  <li>Se proporcionan anuncios para lectores de pantalla para cambios de filtros y diapositivas</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
