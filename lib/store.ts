"use client"

import { create } from "zustand"
import { type Event, type EventType, eventTypes } from "@/lib/mock-data"

// Available layer types
type LayerType = "points" | "arcs" | "polygons" | "hexed-polygons"

// Globe configuration
interface GlobeConfig {
  showAtmosphere: boolean
  showStars: boolean
  customGlobeImage: string | null
}

interface GlobeState {
  // UI state
  isDarkMode: boolean
  toggleDarkMode: () => void
  isFeedOpen: boolean
  toggleFeed: () => void
  isSettingsOpen: boolean
  toggleSettings: () => void
  isLayerControlsOpen: boolean
  toggleLayerControls: () => void

  // Globe settings
  autoRotate: boolean
  toggleAutoRotate: () => void
  rotationSpeed: number
  setRotationSpeed: (speed: number) => void
  activeLayer: LayerType
  setActiveLayer: (layer: LayerType) => void
  globeConfig: GlobeConfig
  updateGlobeConfig: (config: Partial<GlobeConfig>) => void

  // Event filters
  filteredEventTypes: EventType[]
  toggleEventType: (type: EventType) => void

  // Selected event
  selectedEvent: Event | null
  setSelectedEvent: (event: Event | null) => void
  hoveredEvent: Event | null
  setHoveredEvent: (event: Event | null) => void
}

export const useGlobeStore = create<GlobeState>((set) => ({
  // UI state
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  isFeedOpen: true,
  toggleFeed: () => set((state) => ({ isFeedOpen: !state.isFeedOpen })),
  isSettingsOpen: false,
  toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),
  isLayerControlsOpen: false,
  toggleLayerControls: () => set((state) => ({ isLayerControlsOpen: !state.isLayerControlsOpen })),

  // Globe settings
  autoRotate: true,
  toggleAutoRotate: () => set((state) => ({ autoRotate: !state.autoRotate })),
  rotationSpeed: 0.1,
  setRotationSpeed: (speed: number) => set({ rotationSpeed: speed }),
  activeLayer: "polygons",
  setActiveLayer: (layer: LayerType) => set({ activeLayer: layer }),
  globeConfig: {
    showAtmosphere: true,
    showStars: true,
    customGlobeImage: null,
  },
  updateGlobeConfig: (config: Partial<GlobeConfig>) =>
    set((state) => ({
      globeConfig: { ...state.globeConfig, ...config },
    })),

  // Event filters
  filteredEventTypes: [...eventTypes], // Start with all event types enabled
  toggleEventType: (type) =>
    set((state) => {
      // If this is the only active type, don't allow toggling it off
      if (state.filteredEventTypes.length === 1 && state.filteredEventTypes.includes(type)) {
        return state
      }

      // Toggle the event type
      return {
        filteredEventTypes: state.filteredEventTypes.includes(type)
          ? state.filteredEventTypes.filter((t) => t !== type)
          : [...state.filteredEventTypes, type],
      }
    }),

  // Selected event
  selectedEvent: null,
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  hoveredEvent: null,
  setHoveredEvent: (event) => set({ hoveredEvent: event }),
}))
