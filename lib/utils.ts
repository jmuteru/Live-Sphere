import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { EventType } from "./mock-data"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get color based on event type
export function getEventColor(type: EventType): string {
  switch (type) {
    case "news":
      return "#ff4136" // Red
    case "weather":
      return "#0074d9" // Blue
    case "earthquake":
      return "#ff851b" // Orange
    case "volcano":
      return "#b10dc9" // Purple
    case "stock":
      return "#2ecc40" // Green
    case "sports":
      return "#ffdc00" // Yellow
    default:
      return "#ffffff" // White
  }
}

