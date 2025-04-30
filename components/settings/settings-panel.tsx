"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"

import { useGlobeStore } from "@/lib/store"
import { eventTypes } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import EventTypeToggle from "@/components/settings/event-type-toggle"

export default function SettingsPanel() {
  const {
    toggleSettings,
    autoRotate,
    toggleAutoRotate,
    rotationSpeed,
    setRotationSpeed,
    filteredEventTypes,
    toggleEventType,
    globeConfig,
    updateGlobeConfig,
  } = useGlobeStore()

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute left-4 top-16 z-20 w-80 rounded-lg bg-background p-6 shadow-lg mt-64"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Settings</h2>
        <Button variant="ghost" size="icon" onClick={toggleSettings}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Globe settings */}
        <div>
          <h3 className="mb-3 font-semibold">Globe Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-rotate" className="text-sm">
                Auto-Rotate
              </Label>
              <Switch id="auto-rotate" checked={autoRotate} onCheckedChange={toggleAutoRotate} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="rotation-speed" className="text-sm">
                  Rotation Speed
                </Label>
                <span className="text-xs text-muted-foreground">{rotationSpeed.toFixed(1)}</span>
              </div>
              <Slider
                id="rotation-speed"
                min={0.1}
                max={2.0}
                step={0.1}
                value={[rotationSpeed]}
                onValueChange={(value) => setRotationSpeed(value[0])}
                disabled={!autoRotate}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-atmosphere" className="text-sm">
                Show Atmosphere
              </Label>
              <Switch
                id="show-atmosphere"
                checked={globeConfig.showAtmosphere}
                onCheckedChange={(checked) => updateGlobeConfig({ showAtmosphere: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-stars" className="text-sm">
                Show Stars Background
              </Label>
              <Switch
                id="show-stars"
                checked={globeConfig.showStars}
                onCheckedChange={(checked) => updateGlobeConfig({ showStars: checked })}
              />
            </div>

      
          </div>
        </div>

        

      </div>
    </motion.div>
  )
}
