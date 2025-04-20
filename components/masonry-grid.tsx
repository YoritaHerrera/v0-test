"use client"

import React, { useRef, useEffect, useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface MasonryGridProps {
  children: React.ReactNode[]
  columnCount?: { mobile: number; tablet: number; desktop: number }
  gap?: number
}

export function MasonryGrid({
  children,
  columnCount = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 16,
}: MasonryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState<React.ReactNode[][]>([])

  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")

  const getColumnCount = () => {
    if (isMobile) return columnCount.mobile
    if (isTablet) return columnCount.tablet
    return columnCount.desktop
  }

  useEffect(() => {
    const currentColumnCount = getColumnCount()
    const newColumns: React.ReactNode[][] = Array.from({ length: currentColumnCount }, () => [])

    // Distribute children among columns
    React.Children.forEach(children, (child, index) => {
      if (React.isValidElement(child)) {
        const columnIndex = index % currentColumnCount
        newColumns[columnIndex].push(child)
      }
    })

    setColumns(newColumns)
  }, [children, isMobile, isTablet])

  return (
    <div
      ref={gridRef}
      className="w-full"
      style={{ display: "grid", gridTemplateColumns: `repeat(${getColumnCount()}, 1fr)`, gap: `${gap}px` }}
      role="region"
      aria-label="Image masonry gallery"
    >
      {columns.map((column, columnIndex) => (
        <div key={`column-${columnIndex}`} className="flex flex-col gap-4">
          {column.map((item, itemIndex) => (
            <div key={`item-${columnIndex}-${itemIndex}`}>{item}</div>
          ))}
        </div>
      ))}
    </div>
  )
}
