import type React from "react"
import { cn } from "@/lib/utils"

interface BentoGridProps {
  className?: string
  children: React.ReactNode
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto", className)}>{children}</div>
}

interface BentoGridItemProps {
  className?: string
  title?: string
  description?: string
  header?: React.ReactNode
  icon?: React.ReactNode
  children?: React.ReactNode
  colSpan?: number
  rowSpan?: number
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  children,
  colSpan = 1,
  rowSpan = 1,
}: BentoGridItemProps) {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className,
      )}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      {header && <div className="flex flex-col gap-1">{header}</div>}
      {children}
    </div>
  )
}
