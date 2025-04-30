"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { X, ExternalLink, Share2, Bookmark } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import type { Event } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EventCard from "@/components/events/event-card"

interface EventModalProps {
  event: Event
  onClose: () => void
}

export default function EventModal({ event, onClose }: EventModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  // Format timestamp
  const formattedDate = new Date(event.timestamp).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  })

  const timeAgo = formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-lg bg-background shadow-xl"
      >
        {/* Close button */}
        <Button variant="ghost" size="icon" className="absolute right-2 top-2 z-10" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>

        {/* Event image */}
        {event.image && (
          <div className="relative h-64 w-full">
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-full w-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <Badge className="mb-2">{event.type}</Badge>
              <h2 className="text-2xl font-bold text-white">{event.title}</h2>
            </div>
          </div>
        )}

        {/* Event content */}
        <div className="max-h-[calc(90vh-16rem)] overflow-y-auto p-6">
          {!event.image && <h2 className="mb-4 text-2xl font-bold">{event.title}</h2>}

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{event.source}</span>
              <span>•</span>
              <span title={formattedDate}>{timeAgo}</span>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="icon" title="Share">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" title="Bookmark">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mb-6 rounded-md bg-muted p-3 text-sm">
            <strong>Location:</strong> {event.location} ({event.lat.toFixed(2)}, {event.lng.toFixed(2)})
          </div>

          <div className="space-y-4">
            <p>{event.description}</p>
            <p>
              {event.content}
            </p>
          </div>

          {/* Related events */}
          {event.relatedEvents && event.relatedEvents.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold">Related Events</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {event.relatedEvents.map((relatedEvent) => (
                  <EventCard key={relatedEvent.id} event={relatedEvent} compact />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <Button className="w-full" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Read Full Article <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
