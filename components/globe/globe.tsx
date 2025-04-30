"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei"
import { AnimatePresence } from "framer-motion"

import { useGlobeStore } from "@/lib/store"
import { mockEvents } from "@/lib/mock-data"
import Earth from "@/components/globe/earth"
import EventMarkers from "@/components/globe/event-markers"
import Header from "@/components/ui/header"
import EventFeed from "@/components/events/event-feed"
import EventModal from "@/components/events/event-modal"
import SettingsPanel from "@/components/settings/settings-panel"

export default function Globe() {
  const [isClient, setIsClient] = useState(false)
  const controlsRef = useRef(null)
  const { selectedEvent, setSelectedEvent, isSettingsOpen, autoRotate, rotationSpeed, filteredEventTypes } =
    useGlobeStore()

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
        <Canvas gl={{ preserveDrawingBuffer: true }} className="h-full w-full bg-black">
          <Suspense fallback={null}>
            {/* Camera setup */}
            <PerspectiveCamera makeDefault position={[0, 0, 2.5]} fov={45} />

            {/* Lighting */}
            <ambientLight intensity={0.1} />
            <directionalLight position={[5, 3, 5]} intensity={0.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.2} />

            {/* Stars background */}
            <Stars radius={300} depth={60} count={5000} factor={4} fade />

            {/* Earth with event markers */}
            <Earth />
            <EventMarkers events={filteredEvents} />

            {/* Controls for rotating and zooming */}
            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              enableZoom={true}
              minDistance={1.5}
              maxDistance={4}
              autoRotate={autoRotate}
              autoRotateSpeed={rotationSpeed}
              zoomSpeed={0.8}
            />
          </Suspense>
        </Canvas>

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
