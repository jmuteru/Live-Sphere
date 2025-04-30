"use client"

import { motion } from "framer-motion"
import { Layers, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useGlobeStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

//  layer types
const layers = [
  //TODO: implement other layers...
  // { id: "points", name: "Points", description: "Show events as points on the globe" },
  // { id: "arcs", name: "Arcs", description: "Connect events with arcs" },
  { id: "polygons", name: "Countries", description: "Show country boundaries" },
  { id: "hexed-polygons", name: "Hexed Polygons", description: "Show countries as hexagonal dot polygons" },
]

export default function LayerControls() {
  const { activeLayer, setActiveLayer, isLayerControlsOpen, toggleLayerControls } = useGlobeStore()

  return (
    <div className="absolute bottom-4 left-4 z-10  top -2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isLayerControlsOpen ? "default" : "outline"}
              size="icon"
              className={cn(
                "h-12 w-12 rounded-full bg-background/80 backdrop-blur-md",
                isLayerControlsOpen && "bg-primary text-primary-foreground",
              )}
              onClick={toggleLayerControls}
            >
              <Layers className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Toggle layer controls</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isLayerControlsOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-16 left-0 w-64 rounded-lg bg-background/90 p-4 shadow-lg backdrop-blur-md"
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">Globe Layers</h3>
            <Button variant="ghost" size="icon" onClick={toggleLayerControls}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {layers.map((layer) => (
              <Button
                key={layer.id}
                variant={activeLayer === layer.id ? "default" : "outline"}
                className={cn("w-full justify-start", activeLayer === layer.id && "bg-primary text-primary-foreground")}
                onClick={() => setActiveLayer(layer.id)}
              >
                <span>{layer.name}</span>
              </Button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
