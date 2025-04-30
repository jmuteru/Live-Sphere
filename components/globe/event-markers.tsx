"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { useGlobeStore } from "@/lib/store"
import type { Event, EventType } from "@/lib/mock-data"

// Get color based on event type
function getEventColor(type: EventType): string {
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

interface EventMarkersProps {
  events: Event[]
}

export default function EventMarkers({ events }: EventMarkersProps) {
  const { setSelectedEvent, hoveredEvent, setHoveredEvent } = useGlobeStore()

  // Create markers using useMemo to avoid recreating them on every render
  const markers = useMemo(() => {
    return events.map((event) => {
      // Convert lat/long to 3D position
      const phi = (90 - event.lat) * (Math.PI / 180)
      const theta = (event.lng + 180) * (Math.PI / 180)

      const x = -1.02 * Math.sin(phi) * Math.cos(theta)
      const y = 1.02 * Math.cos(phi)
      const z = 1.02 * Math.sin(phi) * Math.sin(theta)

      const color = getEventColor(event.type)

      return {
        id: event.id,
        position: [x, y, z],
        color,
        event,
      }
    })
  }, [events])

  return (
    <group>
      {markers.map((marker) => (
        <EventMarker
          key={marker.id}
          position={marker.position}
          color={marker.color}
          event={marker.event}
          isHovered={hoveredEvent?.id === marker.event.id}
          onSelect={setSelectedEvent}
          onHover={setHoveredEvent}
        />
      ))}
    </group>
  )
}

// Individual marker component to handle its own animations
function EventMarker({
  position,
  color,
  event,
  isHovered,
  onSelect,
  onHover,
}: {
  position: [number, number, number]
  color: string
  event: Event
  isHovered: boolean
  onSelect: (event: Event | null) => void
  onHover: (event: Event | null) => void
}) {
  const ref = useRef<THREE.Group>(null)

  // Handle pulse animation
  useFrame(({ clock }) => {
    if (ref.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.1
      const targetScale = isHovered ? scale * 1.5 : scale

      // Smoothly interpolate current scale to target scale
      ref.current.scale.x = THREE.MathUtils.lerp(ref.current.scale.x, targetScale, 0.1)
      ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, targetScale, 0.1)
      ref.current.scale.z = THREE.MathUtils.lerp(ref.current.scale.z, targetScale, 0.1)
    }
  })

  return (
    <group
      ref={ref}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(event)
      }}
      onPointerOver={() => onHover(event)}
      onPointerOut={() => onHover(null)}
    >
      <mesh>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshBasicMaterial color={color} transparent={true} opacity={0.3} />
      </mesh>
    </group>
  )
}
