"use client"

import { formatDistanceToNow } from "date-fns"
import { Newspaper, CloudRain, Activity, Flame, TrendingUp, Trophy } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Event, EventType } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// Get icon based on event type
function getEventIcon(type: EventType) {
  switch (type) {
    case "news":
      return <Newspaper className="h-5 w-5" />
    case "weather":
      return <CloudRain className="h-5 w-5" />
    case "earthquake":
      return <Activity className="h-5 w-5" />
    case "volcano":
      return <Flame className="h-5 w-5" />
    case "stock":
      return <TrendingUp className="h-5 w-5" />
    case "sports":
      return <Trophy className="h-5 w-5" />
    default:
      return <Newspaper className="h-5 w-5" />
  }
}

// Get color based on event type
function getEventColor(type: EventType): string {
  switch (type) {
    case "news":
      return "bg-red-500"
    case "weather":
      return "bg-blue-500"
    case "earthquake":
      return "bg-orange-500"
    case "volcano":
      return "bg-purple-500"
    case "stock":
      return "bg-green-500"
    case "sports":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
}

interface EventCardProps {
  event: Event
  compact?: boolean
}

export default function EventCard({ event, compact = false }: EventCardProps) {
  const timeAgo = formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })

  return (
    <Card className="overflow-hidden">
      <CardContent className={cn("p-0", !compact && "pb-0")}>
        {!compact && event.image && (
          <div className="relative h-32 w-full overflow-hidden">
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-full w-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
              <div className="flex items-center gap-2">
                <Badge className={cn("text-white", getEventColor(event.type))}>{event.type}</Badge>
                <span className="text-xs text-white">{timeAgo}</span>
              </div>
            </div>
          </div>
        )}

        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-white",
                getEventColor(event.type),
              )}
            >
              {getEventIcon(event.type)}
            </div>

            {compact ? (
              <div className="flex items-center gap-2">
                <Badge className={cn("text-white", getEventColor(event.type))}>{event.type}</Badge>
                <span className="text-xs text-muted-foreground">{timeAgo}</span>
              </div>
            ) : (
              <h3 className="font-semibold">{event.title}</h3>
            )}
          </div>

          {!compact && (
            <>
              <p className="mb-2 text-sm text-muted-foreground line-clamp-2">{event.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{event.location}</span>
                <Badge variant="outline" className="text-xs">
                  {event.source}
                </Badge>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
