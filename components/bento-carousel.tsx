"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

interface BentoCarouselProps {
  children: React.ReactNode[]
  autoPlay?: boolean
  interval?: number
  showControls?: boolean
  showIndicators?: boolean
}

export function BentoCarousel({
  children,
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showIndicators = true,
}: BentoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const totalSlides = React.Children.count(children)
  const announcerRef = useRef<HTMLDivElement>(null)

  // Function to go to a specific slide
  const goToSlide = useCallback(
    (index: number) => {
      const newIndex = (index + totalSlides) % totalSlides
      setCurrentIndex(newIndex)

      // Announce slide change to screen readers
      if (announcerRef.current) {
        announcerRef.current.textContent = `Mostrando imagen ${newIndex + 1} de ${totalSlides}`
      }
    },
    [totalSlides],
  )

  // Functions for navigation
  const goToNext = useCallback(() => goToSlide(currentIndex + 1), [goToSlide, currentIndex])
  const goToPrevious = useCallback(() => goToSlide(currentIndex - 1), [goToSlide, currentIndex])

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying)
    setIsPaused(!isPaused)

    // Announce play/pause state to screen readers
    if (announcerRef.current) {
      announcerRef.current.textContent = !isPlaying
        ? "Reproducción automática activada"
        : "Reproducción automática pausada"
    }
  }, [isPlaying])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === carouselRef.current || carouselRef.current?.contains(document.activeElement)) {
        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault()
            goToPrevious()
            break
          case "ArrowRight":
            e.preventDefault()
            goToNext()
            break
          case " ": // Space key
            e.preventDefault()
            togglePlayPause()
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, goToPrevious, togglePlayPause])

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(goToNext, interval)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, goToNext, interval])

  // Pause on hover/focus
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)
  const handleFocus = () => setIsPaused(true)
  const handleBlur = () => setIsPaused(false)

  // Update isPlaying based on isPaused
  useEffect(() => {
    setIsPlaying(autoPlay && !isPaused)
  }, [autoPlay, isPaused])

  return (
    <div
      ref={carouselRef}
      className="relative"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Galería de imágenes"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {React.Children.map(children, (child, index) => (
            <div
              className="w-full flex-shrink-0"
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${index + 1} de ${totalSlides}`}
              aria-hidden={index !== currentIndex}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex items-center justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 px-4">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-md"
            onClick={goToPrevious}
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-md"
            onClick={goToNext}
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Play/Pause button */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute bottom-4 right-4 rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-md z-10"
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pausar reproducción automática" : "Iniciar reproducción automática"}
        aria-pressed={!isPlaying}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>

      {/* Indicators */}
      {showIndicators && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className={`w-2 h-2 rounded-full p-0 ${
                index === currentIndex ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a imagen ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
      )}

      {/* Live region for screen reader announcements */}
      <div className="sr-only" aria-live="polite" ref={announcerRef}>
        Mostrando imagen {currentIndex + 1} de {totalSlides}
      </div>
    </div>
  )
}
