"use client"

import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"

import { useGlobeStore } from "@/lib/store"
import { mockEvents } from "@/lib/mock-data"
import Header from "@/components/ui/header"
import EventFeed from "@/components/events/event-feed"
import EventModal from "@/components/events/event-modal"
import SettingsPanel from "@/components/settings/settings-panel"
import GlobeComponent from "@/components/globe/globe-component"
import LayerControls from "@/components/globe/layer-controls"

export default function GlobeContainer() {
  const [isClient, setIsClient] = useState(false)
  const { selectedEvent, setSelectedEvent, isSettingsOpen, filteredEventTypes } = useGlobeStore()

  // Filter events based on selected types
  const filteredEvents = mockEvents.filter((event) => filteredEventTypes.includes(event.type))

  // Handle client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    )
  }

  return (
    <>
      <Header />

      <div className="relative h-screen w-full">
        {/* Globe visualization */}
        <GlobeComponent events={filteredEvents} />

        {/* Layer controls */}
        <LayerControls />

        {/* Event feed sidebar */}
        <EventFeed events={filteredEvents} />

        {/* Event detail modal */}
        <AnimatePresence>
          {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        </AnimatePresence>

        {/* Settings panel */}
          <AnimatePresence>{isSettingsOpen && <SettingsPanel />}</AnimatePresence>


      </div>
    </>
  )
}
