"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { useGlobeStore } from "@/lib/store"
import type { Event } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import EventCard from "@/components/events/event-card"

interface EventFeedProps {
  events: Event[]
}

export default function EventFeed({ events }: EventFeedProps) {
  const { isFeedOpen, toggleFeed, setSelectedEvent, hoveredEvent, setHoveredEvent } = useGlobeStore()

  return (
    <div
      className={cn(
        "absolute bottom-0 right-0 top-0 z-10 flex transition-transform duration-300",
        isFeedOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      {/* Toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute -left-12 top-1/2 h-12 w-12 -translate-y-1/2 rounded-l-lg rounded-r-none border-r-0"
        onClick={toggleFeed}
      >
        {isFeedOpen ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
      </Button>

      {/* Feed content */}
      <div className="h-full w-80 overflow-hidden bg-background/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between border-b px-4">
          <h2 className="text-xl font-bold">Live Events</h2>
          <div className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
            {events.length} Events
          </div>
        </div>

        {/* Events list */}
        <div className="h-[calc(100%-4rem)] overflow-y-auto p-4">
          <div className="flex flex-col gap-4">
            {events.length > 0 ? (
              events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedEvent(event)}
                  onMouseEnter={() => setHoveredEvent(event)}
                  onMouseLeave={() => setHoveredEvent(null)}
                  className={cn("cursor-pointer", hoveredEvent?.id === event.id && "ring-2 ring-primary")}
                >
                  <EventCard event={event} />
                </motion.div>
              ))
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-center text-muted-foreground">No events match your current filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
