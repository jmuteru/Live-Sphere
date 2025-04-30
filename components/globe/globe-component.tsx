"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import Globe from "react-globe.gl"
import * as THREE from "three"
import { scaleSequentialSqrt } from "d3-scale"
import { interpolateYlOrRd } from "d3-scale-chromatic"

import { useGlobeStore } from "@/lib/store"
import type { Event, EventType } from "@/lib/mock-data"
import { getEventColor } from "@/lib/utils"
import { countries, type Country } from '@/lib/countries'
import Search from '@/components/Search'
import {
  newsData,
  weatherData,
  earthquakeData,
  volcanoData,
  stockData,
  sportsData,
  type NewsItem,
  type WeatherData,
  type EarthquakeData,
  type VolcanoData,
  type StockData,
  type SportsData
} from '../../app/data/db'

interface GlobeComponentProps {
  events: Event[]
}

type EventCategory = 'news' | 'weather' | 'earthquake' | 'volcano' | 'stock' | 'sports' | 'all';

interface BaseItem {
  country_code: string;
}

interface FilterableData extends BaseItem {
  [key: string]: any;
}

function useLocalData() {
  const [selectedData, setSelectedData] = useState<FilterableData[]>([])
  const [loading, setLoading] = useState(false)
  const [country, setCountry] = useState<string | null>(null)
  const [category, setCategory] = useState<string>('')

  const getLocalData = (countryCode: string, cat: string = '') => {
    setLoading(true)
    setCountry(countryCode)
    setCategory(cat)
    try {
      let filteredData: FilterableData[] = [];
      const code = countryCode.toLowerCase();

      if (!cat || cat === 'all') {
        filteredData = [
          ...newsData.filter((item: NewsItem) => item.country_code.toLowerCase() === code),
          ...weatherData.filter((item: WeatherData) => item.country_code.toLowerCase() === code),
          ...earthquakeData.filter((item: EarthquakeData) => item.country_code.toLowerCase() === code),
          ...volcanoData.filter((item: VolcanoData) => item.country_code.toLowerCase() === code),
          ...stockData.filter((item: StockData) => item.country_code.toLowerCase() === code),
          ...sportsData.filter((item: SportsData) => item.country_code.toLowerCase() === code)
        ];
      } else {
        const dataMap: Record<string, FilterableData[]> = {
          news: newsData,
          weather: weatherData,
          earthquake: earthquakeData,
          volcano: volcanoData,
          stock: stockData,
          sports: sportsData
        };
        filteredData = dataMap[cat].filter((item: FilterableData) => item.country_code.toLowerCase() === code);
      }

      setSelectedData(filteredData);
    } finally {
      setLoading(false)
    }
  }

  return { data: selectedData, loading, getLocalData, country, setCountry, category, setCategory }
}

function NewsSidebar({ data, loading, country, category, setCategory, onCategoryChange, onCountrySelect, onClose }: {
  data: any[],
  loading: boolean,
  country: string | null,
  category: string,
  setCategory: (cat: string) => void,
  onCategoryChange: (cat: string) => void,
  onCountrySelect: (country: Country) => void,
  onClose: () => void
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(true)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Add any additional search logic here
  }

  const eventCategories = [
    {
      name: 'news',
      label: 'News',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
        </svg>
      )
    },
    {
      name: 'weather',
      label: 'Weather',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      )
    },
    {
      name: 'earthquake',
      label: 'Earthquake',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      name: 'volcano',
      label: 'Volcano',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      )
    },
    {
      name: 'stock',
      label: 'Stock',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      name: 'sports',
      label: 'Sports',
      color: 'bg-yellow-500',
      hoverColor: 'hover:bg-yellow-600',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    }
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="transition-all ease-in-out duration-700 fixed left-4 top-4 z-50 p-2 bg-gray-900 rounded-lg shadow-lg hover:bg-gray-800 "
      >
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    )
  }

  return (
    <div className="fixed left-0 top-0 w-96 h-[400px] bg-transparent shadow-lg overflow-y-hidden p-4 z-50 ">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          {/* <h2 className="text-2xl font-bold text-white">Live Sphere</h2> */}
          <h2 className="rounded bg-green-500 px-2 py-0.5 text-sm font-semibold text-white">
            LIVE SPHERE
          </h2>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mb-4">
        <div className="mb-4">
          <Search
            onSearch={handleSearch}
            onCountrySelect={onCountrySelect}
            placeholder="Search countries..."
            countries={countries}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {eventCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onCategoryChange(cat.name)}
              className={`flex items-center justify-center space-x-2 rounded-lg p-2 text-white transition-all duration-200 ${category === cat.name ? cat.color : 'bg-gray-700'
                } ${cat.hoverColor} transform hover:scale-105`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}

      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
            {'title' in item && (
              <>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-gray-300 mt-2">{item.text}</p>
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block">
                    Read more →
                  </a>
                )}
              </>
            )}
            {'temperature' in item && (
              <div className="text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl">{item.temperature}°C</h3>
                  <p className="text-gray-300">{item.condition}</p>
                </div>
                <div className="mt-2 text-sm text-gray-300">
                  <p>Humidity: {item.humidity}%</p>
                  <p>Wind: {item.wind_speed} km/h</p>
                </div>
              </div>
            )}
            {'magnitude' in item && (
              <div className="text-white">
                <h3 className="text-xl">Magnitude {item.magnitude}</h3>
                <p className="text-gray-300">{item.location}</p>
                <p className="text-sm text-gray-400 mt-1">Depth: {item.depth}km</p>
              </div>
            )}
            {'status' in item && 'name' in item && (
              <div className="text-white">
                <h3 className="text-xl">{item.name}</h3>
                <p className="text-gray-300">Status: {item.status}</p>
                <p className="text-sm text-gray-400 mt-1">Alert Level: {item.alert_level}</p>
              </div>
            )}
            {'market_index' in item && (
              <div className="text-white">
                <h3 className="text-xl">{item.market_index}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-lg">{item.current_value.toFixed(2)}</p>
                  <p className={`text-sm ${item.change_percent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {item.change_percent >= 0 ? '+' : ''}{item.change_percent}%
                  </p>
                </div>
              </div>
            )}
            {'sport' in item && (
              <div className="text-white">
                <h3 className="text-xl">{item.sport}</h3>
                <p className="text-gray-300">{item.event}</p>
                {item.teams && (
                  <p className="text-sm text-gray-400 mt-1">{item.teams.join(' vs ')}</p>
                )}
                {item.result && (
                  <p className="font-semibold mt-1">{item.result}</p>
                )}
              </div>
            )}
          </div>
        ))}
        {!loading && data.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            <span className="p-1 text-md">⚠️</span>
            <span>API usage has been temporarily suspended due to usage limits being reached.Thank you for your patience and understanding.</span> 
            </div>
        )}
      </div>
    </div>
  )
}

function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += ("00" + ((hash >> (i * 8)) & 0xff).toString(16)).slice(-2);
  }
  return color;
}

export default function GlobeComponent({ events }: GlobeComponentProps) {
  const globeRef = useRef<any>(null)
  const {
    activeLayer,
    isDarkMode,
    autoRotate,
    rotationSpeed,
    setSelectedEvent,
    hoveredEvent,
    setHoveredEvent,
    globeConfig,
  } = useGlobeStore()

  const [countries, setCountries] = useState<{ features: any[] }>({ features: [] })
  const [atmosphereColor, setAtmosphereColor] = useState<string>(isDarkMode ? "#1a4275" : "#4285F4")
  const [isGlobeReady, setIsGlobeReady] = useState(false)
  const [hoverD, setHoverD] = useState<any>()
  const localDataHook = useLocalData()

  // Load country data for polygons layer
  useEffect(() => {
    fetch("/assets/countries.geojson")
      .then((res) => res.json())
      .then(setCountries)
  }, [])

  // GDP per capita (avoiding countries with small pop)
  const getVal = (feat: any) =>
    feat.properties.GDP_MD_EST && feat.properties.POP_EST
      ? feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST)
      : 0

  const colorScale = scaleSequentialSqrt(interpolateYlOrRd)
  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  )
  colorScale.domain([0, maxVal])

  // Update atmosphere color when theme changes
  useEffect(() => {
    setAtmosphereColor(isDarkMode ? "#1a4275" : "#4285F4")
  }, [isDarkMode])

  // Handle auto-rotation
  useEffect(() => {
    if (!globeRef.current || !isGlobeReady) return

    let rotationFrame: number

    const rotateGlobe = () => {
      if (globeRef.current && autoRotate) {
        const controls = globeRef.current.controls()
        if (controls) {
          controls.autoRotate = true
          controls.autoRotateSpeed = rotationSpeed
          controls.update()
        }
      } else if (globeRef.current) {
        const controls = globeRef.current.controls()
        if (controls) {
          controls.autoRotate = false
        }
      }

      rotationFrame = requestAnimationFrame(rotateGlobe)
    }

    rotateGlobe()

    return () => {
      cancelAnimationFrame(rotationFrame)
      if (globeRef.current) {
        const controls = globeRef.current.controls()
        if (controls) {
          controls.autoRotate = false
        }
      }
    }
  }, [autoRotate, rotationSpeed, isGlobeReady])

  // Convert events to the format expected by react-globe.gl
  const pointsData = events.map((event) => ({
    ...event,
    size: hoveredEvent?.id === event.id ? 0.8 : 0.5,
    color: getEventColor(event.type as EventType),
  }))

  // Arc data for connections between events
  const arcsData =
    events.length > 1
      ? events.slice(0, -1).map((event, idx) => ({
        startLat: event.lat,
        startLng: event.lng,
        endLat: events[idx + 1].lat,
        endLng: events[idx + 1].lng,
        color: getEventColor(event.type as EventType),
      }))
      : []

  // Labels data
  const labelsData = events.map((event) => ({
    ...event,
    text: event.title,
    size: 0.8,
    color: getEventColor(event.type as EventType),
  }))

  // Heatmap data
  const heatmapData = events.map((event) => ({
    lat: event.lat,
    lng: event.lng,
    weight: Math.random() * 10, // Random weight for demo
  }))

  // Determine which data to use based on active layer
  const getLayerData = (layerType: string) => {
    switch (layerType) {
      case "points":
        return { pointsData }
      case "arcs":
        return { arcsData }
      case "polygons":
        return { polygonsData: countries.features }
      case "hexbin":
        return { hexBinPointsData: pointsData }
      case "labels":
        return { labelsData }
      case "heatmap":
        return { heatmapsData: [heatmapData] }
      case "custom":
        return { pointsData } // We'll use points data for custom layer too
      default:
        return { pointsData }
    }
  }

  // Get the appropriate data for the active layer
  const activeLayerData = getLayerData(activeLayer)

  // Update the polygon click handler to only handle globe rotation
  const handlePolygonClick = (country: any) => {
    const code = country.properties.ISO_A2 || country.properties.ISO_A3 || country.properties.name
    if (code) {
      const selectedCountry = countries.features.find((c: any) =>
        (c.properties.ISO_A2 || c.properties.ISO_A3 || c.properties.name).toLowerCase() === code.toLowerCase()
      )
      if (selectedCountry?.properties) {
        const lat = selectedCountry.properties.latitude || 0
        const lng = selectedCountry.properties.longitude || 0
        rotateGlobeToLocation(lat, lng)
      }
    }
  }

  // Add function to rotate globe to country
  const rotateGlobeToLocation = (lat: number, lng: number) => {
    if (globeRef.current) {
      const controls = globeRef.current.controls()
      if (controls) {
        // Disable auto-rotation while moving to target
        controls.autoRotate = false

        // Convert to radians
        const phi = (90 - lat) * (Math.PI / 180)
        const theta = (lng + 180) * (Math.PI / 180)

        // Calculate target position
        const radius = 2 // Adjust this value based on your globe size
        const x = -radius * Math.sin(phi) * Math.cos(theta)
        const y = radius * Math.cos(phi)
        const z = radius * Math.sin(phi) * Math.sin(theta)

        // Animate to new position
        globeRef.current.pointOfView({
          lat,
          lng,
          altitude: 2.5
        }, 1000) // 1000ms animation duration
      }
    }
  }

  // Handle country selection from search
  const handleCountrySelect = (selectedCountry: Country) => {
    if (selectedCountry.coordinates) {
      const { lat, lng } = selectedCountry.coordinates
      // Stop auto-rotation before moving to the new location
      if (globeRef.current) {
        const controls = globeRef.current.controls()
        if (controls) {
          controls.autoRotate = false
        }
      }
      rotateGlobeToLocation(lat, lng)

      // Find the country polygon to show the popup
      const countryPolygon = countries.features.find((c: any) =>
        (c.properties.ISO_A2 || c.properties.ISO_A3 || c.properties.name).toLowerCase() === selectedCountry.code.toLowerCase()
      )
      if (countryPolygon) {
        setHoverD(countryPolygon)
      }

      // Also trigger the data loading for this country
      if (selectedCountry.code) {
        localDataHook.getLocalData(selectedCountry.code, localDataHook.category)
      }
    }
  }

  return (
    <div className="absolute inset-0">
      <Globe
        ref={globeRef}
        onGlobeReady={() => setIsGlobeReady(true)}
        globeImageUrl={
          globeConfig.customGlobeImage ||
          "/assets/earth-night.jpg"
        }
        backgroundImageUrl={globeConfig.showStars ? "/assets/night-sky.png" : null}
        backgroundColor="rgba(0,0,0,0)"
        // Atmosphere configuration
        atmosphereColor={atmosphereColor}
        atmosphereAltitude={globeConfig.showAtmosphere ? 0.15 : 0}
        // Polygons layer (countries)
        polygonsData={activeLayer === "polygons" ? countries.features.filter((d: any) => d.properties && d.properties.name) : []}
        polygonAltitude={(d: any) => (d === hoverD ? 0.12 : 0.06)}
        polygonCapColor={(d: any) => {
          const code = d.properties.ISO_A2 || d.properties.ISO_A3 || d.properties.name;
          return stringToColor(code || "");
        }}
        polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
        polygonStrokeColor={() => "#111"}
        polygonLabel={({ properties: d }: any) =>
          `<div><b>${d.name || ""}</b></div>`
        }
        onPolygonHover={setHoverD}
        onPolygonClick={handlePolygonClick}
        polygonsTransitionDuration={300}
        onGlobeClick={() => setHoverD(null)}
        // Hexed polygons layer
        hexPolygonsData={activeLayer === "hexed-polygons" ? countries.features : []}
        hexPolygonResolution={3}
        hexPolygonMargin={0.3}
        hexPolygonUseDots={true}
        hexPolygonColor={() => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}`}
        hexPolygonLabel={({ properties: d }: any) =>
          `<div><b>${d.ADMIN || d.name || ""}</b></div>`
        }
        // Remove points/arcs/other layers from default view
        pointsData={[]}
        arcsData={[]}
        hexBinPointsData={[]}
        labelsData={[]}
        heatmapsData={[]}
        customLayerData={[]}
      />
      <NewsSidebar
        data={localDataHook.data}
        loading={localDataHook.loading}
        country={localDataHook.country}
        category={localDataHook.category}
        setCategory={localDataHook.setCategory}
        onCategoryChange={cat => {
          if (localDataHook.country) localDataHook.getLocalData(localDataHook.country, cat)
        }}
        onCountrySelect={handleCountrySelect}
        onClose={() => localDataHook.setCountry(null)}
      />
    </div>
  )
}
