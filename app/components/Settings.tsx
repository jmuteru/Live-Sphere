import { useGlobeStore } from "@/lib/store"

export default function Settings() {
  const {
    autoRotate,
    toggleAutoRotate,
    rotationSpeed,
    setRotationSpeed,
    globeConfig,
    updateGlobeConfig
  } = useGlobeStore()

  return (
    <div className="fixed right-4 top-4 z-50 w-64 rounded-lg bg-gray-800 p-4 shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-white">Globe Settings</h2>
      
      <div className="space-y-4">
        {/* Auto-rotate toggle */}
        <div className="flex items-center justify-between">
          <label htmlFor="auto-rotate" className="text-sm text-gray-300">
            Auto-rotate
          </label>
          <input
            id="auto-rotate"
            type="checkbox"
            checked={autoRotate}
            onChange={toggleAutoRotate}
            className="h-4 w-4 rounded border-gray-300 bg-gray-700"
          />
        </div>

        {/* Rotation speed slider */}
        <div className="space-y-2">
          <label htmlFor="rotation-speed" className="text-sm text-gray-300">
            Rotation Speed: {rotationSpeed.toFixed(1)}
          </label>
          <input
            id="rotation-speed"
            type="range"
            min="0.1"
            max="2.0"
            step="0.1"
            value={rotationSpeed}
            onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
            disabled={!autoRotate}
            className="w-full"
          />
        </div>

        {/* Atmosphere toggle */}
        <div className="flex items-center justify-between">
          <label htmlFor="show-atmosphere" className="text-sm text-gray-300">
            Show Atmosphere
          </label>
          <input
            id="show-atmosphere"
            type="checkbox"
            checked={globeConfig.showAtmosphere}
            onChange={(e) => updateGlobeConfig({ showAtmosphere: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 bg-gray-700"
          />
        </div>

        {/* Stars background toggle */}
        <div className="flex items-center justify-between">
          <label htmlFor="show-stars" className="text-sm text-gray-300">
            Show Stars Background
          </label>
          <input
            id="show-stars"
            type="checkbox"
            checked={globeConfig.showStars}
            onChange={(e) => updateGlobeConfig({ showStars: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 bg-gray-700"
          />
        </div>

        {/* Custom globe image URL */}
        <div className="space-y-2">
          <label htmlFor="globe-image" className="text-sm text-gray-300">
            Custom Globe Image URL
          </label>
          <input
            id="globe-image"
            type="text"
            value={globeConfig.customGlobeImage || ''}
            onChange={(e) => updateGlobeConfig({ customGlobeImage: e.target.value || null })}
            placeholder="Enter image URL..."
            className="w-full rounded bg-gray-700 px-2 py-1 text-sm text-white placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  )
} 