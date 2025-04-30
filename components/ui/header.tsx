"use client"

import { Settings, Moon, Sun, RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"
import { useGlobeStore } from "@/lib/store"
import { Button } from "@/components/ui/button"

export default function Header() {
  const { isDarkMode, toggleDarkMode, isSettingsOpen, toggleSettings, autoRotate, toggleAutoRotate } = useGlobeStore()

  return (
    <header className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
     
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-md"
          onClick={toggleAutoRotate}
          title={autoRotate ? "Stop Auto-Rotation" : "Start Auto-Rotation"}
        >
          <RotateCcw className={cn("h-5 w-5", autoRotate && "animate-spin-slow text-primary")} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-md"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Button
          variant={isSettingsOpen ? "default" : "outline"}
          size="icon"
          className={cn(
            "rounded-full bg-background/80 backdrop-blur-md",
            isSettingsOpen && "bg-primary text-primary-foreground",
          )}
          onClick={toggleSettings}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
