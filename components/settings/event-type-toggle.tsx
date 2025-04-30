"use client"

import { Newspaper, CloudRain, Activity, Flame, TrendingUp, Trophy } from "lucide-react"

import { cn } from "@/lib/utils"
import type { EventType } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"

// Get icon based on event type
function getEventIcon(type: EventType) {
  switch (type) {
    case "news":
      return <Newspaper className="h-4 w-4" />
    case "weather":
      return <CloudRain className="h-4 w-4" />
    case "earthquake":
      return <Activity className="h-4 w-4" />
    case "volcano":
      return <Flame className="h-4 w-4" />
    case "stock":
      return <TrendingUp className="h-4 w-4" />
    case "sports":
      return <Trophy className="h-4 w-4" />
    default:
      return <Newspaper className="h-4 w-4" />
  }
}

// Get color based on event type
function getEventColor(type: EventType): string {
  switch (type) {
    case "news":
      return "bg-red-500 hover:bg-red-600"
    case "weather":
      return "bg-blue-500 hover:bg-blue-600"
    case "earthquake":
      return "bg-orange-500 hover:bg-orange-600"
    case "volcano":
      return "bg-purple-500 hover:bg-purple-600"
    case "stock":
      return "bg-green-500 hover:bg-green-600"
    case "sports":
      return "bg-yellow-500 hover:bg-yellow-600"
    default:
      return "bg-gray-500 hover:bg-gray-600"
  }
}

interface EventTypeToggleProps {
  type: EventType
  isActive: boolean
  onToggle: () => void
}

export default function EventTypeToggle({ type, isActive, onToggle }: EventTypeToggleProps) {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      className={cn(
        "flex items-center justify-start gap-2 px-3 py-2 text-xs",
        isActive && getEventColor(type),
        isActive ? "text-white" : "text-foreground",
      )}
      onClick={onToggle}
    >
      {getEventIcon(type)}
      <span className="capitalize">{type}</span>
    </Button>
  )
}
