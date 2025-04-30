// Event types
export type EventType = "news" | "weather" | "earthquake" | "volcano" | "stock" | "sports"

export const eventTypes: EventType[] = ["news", "weather", "earthquake", "volcano", "stock", "sports"]

// Event interface
export interface Event {
  id: string
  type: EventType
  title: string
  description: string
  content?: string
  location: string
  lat: number
  lng: number
  timestamp: string
  source: string
  image?: string
  relatedEvents?: Event[]
}

// Generate mock events
export const mockEvents: Event[] = [
  // News events
  {
    id: "news-1",
    type: "news",
    title: "Major Peace Treaty Signed",
    description: "World leaders from 15 countries have signed a groundbreaking peace agreement aimed at ending a decades-long conflict. The treaty promises significant political, economic, and humanitarian reforms.",
    content:
      "After years of intense negotiations, world leaders have gathered in Geneva to sign a historic peace treaty, marking the end of a violent conflict that has lasted for over 40 years. The treaty includes provisions for joint economic development, the creation of demilitarized zones, and a commitment to human rights protection. Both sides have agreed to lay down arms, and a peacekeeping force will be deployed to ensure stability in the region. This agreement marks a turning point in the efforts to restore peace and rebuild communities devastated by war.",
    location: "Geneva, Switzerland",
    lat: 46.2044,
    lng: 6.1432,
    timestamp: "2025-04-27T09:30:00Z",
    source: "Global News Network",
    image: "https://img.freepik.com/free-photo/close-up-woman-holding-peace-placard_23-2149163243.jpg",
  },
  {
    id: "news-2",
    type: "news",
    title: "Breakthrough in Renewable Energy",
    description: "A team of scientists has developed a revolutionary solar technology capable of achieving 70% energy efficiency, a major leap towards sustainable energy solutions.",
    location: "Tokyo, Japan",
    lat: 35.6762,
    lng: 139.6503,
    timestamp: "2025-04-26T14:15:00Z",
    source: "Science Today",
    image: "https://img.freepik.com/free-photo/sunny-landscape-with-windmills_1112-102.jpg",
  },

  // Weather events
  {
    id: "weather-1",
    type: "weather",
    title: "Hurricane Marcus Approaches",
    description: "Meteorologists are tracking Hurricane Marcus, a Category 4 storm expected to hit the Florida coastline within 48 hours. Authorities have issued evacuation orders in vulnerable areas.",
    location: "Miami, USA",
    lat: 25.7617,
    lng: -80.1918,
    timestamp: "2025-04-27T18:00:00Z",
    source: "Weather Alert System",
    image: "https://img.freepik.com/premium-psd/hurricane-from-space_957244-32228.jpg",
  },
  {
    id: "weather-2",
    type: "weather",
    title: "Record-Breaking Heatwave",
    description: "A heatwave in Dubai has seen temperatures rise to an unprecedented 50°C for the third consecutive day. Authorities have urged residents to stay indoors and stay hydrated.",
    location: "Dubai, UAE",
    lat: 25.2048,
    lng: 55.2708,
    timestamp: "2025-04-27T12:45:00Z",
    source: "Climate Monitor",
    image: "https://img.freepik.com/free-photo/beautiful-landscape-cityscape-seoul-city_74190-3202.jpg",
  },

  // Earthquake events
  {
    id: "earthquake-1",
    type: "earthquake",
    title: "7.2 Magnitude Earthquake",
    description: "A powerful 7.2 magnitude earthquake has struck the coastal region of Chile, triggering a tsunami warning. Local authorities are advising residents to move to higher ground.",
    location: "Santiago, Chile",
    lat: -33.4489,
    lng: -70.6693,
    timestamp: "2025-04-27T03:15:00Z",
    source: "Seismic Alert Network",
    image: "https://img.freepik.com/free-photo/marrakesh-city-after-earthquake_23-2150811913.jpg",
  },
  {
    id: "earthquake-2",
    type: "earthquake",
    title: "5.8 Magnitude Earthquake",
    description: "A 5.8 magnitude earthquake has hit Istanbul, causing minor damage to buildings and infrastructure. No major injuries have been reported, but authorities are assessing the situation.",
    location: "Istanbul, Turkey",
    lat: 41.0082,
    lng: 28.9784,
    timestamp: "2025-04-26T22:30:00Z",
    source: "Geological Survey",
    image: "https://img.freepik.com/free-photo/marrakesh-city-after-earthquake_23-2150811913.jpg",
  },

  // Volcano events
  {
    id: "volcano-1",
    type: "volcano",
    title: "Mount Fuji Eruption Warning",
    description: "Increased seismic activity near Mount Fuji has led to evacuation orders for the surrounding areas, as experts warn of a potential eruption in the coming days.",
    location: "Honshu, Japan",
    lat: 35.3606,
    lng: 138.7274,
    timestamp: "2025-04-27T05:45:00Z",
    source: "Volcanic Observatory",
    image: "https://img.freepik.com/free-photo/beautiful-shot-active-volcano-with-flowing-lava-smoke-clear-sky_181624-56865.jpg",
  },
  {
    id: "volcano-2",
    type: "volcano",
    title: "Etna Volcanic Activity",
    description: "Mount Etna has been erupting for several days, sending plumes of ash 5 kilometers into the atmosphere. Flights in the region have been affected due to ash clouds.",
    location: "Sicily, Italy",
    lat: 37.751,
    lng: 14.9934,
    timestamp: "2025-04-26T19:20:00Z",
    source: "European Volcano Network",
    image: "https://img.freepik.com/free-photo/beautiful-shot-active-volcano-with-flowing-lava-smoke-clear-sky_181624-56865.jpg",
  },

  // Stock market events
  {
    id: "stock-1",
    type: "stock",
    title: "Tech Stock Crash",
    description: "Technology stocks have dropped by 15% following a surprise regulatory announcement, sending shockwaves through the financial markets.",
    location: "New York, USA",
    lat: 40.7128,
    lng: -74.006,
    timestamp: "2025-04-27T14:30:00Z",
    source: "Financial Times",
    image: "https://img.freepik.com/free-photo/stock-exchange-trading-forex-finance-graphic-concept_53876-122998.jpg",
  },
  {
    id: "stock-2",
    type: "stock",
    title: "Cryptocurrency Surge",
    description: "Bitcoin has surged to an all-time high after major institutional investors have adopted the cryptocurrency, driving up its value.",
    location: "London, UK",
    lat: 51.5074,
    lng: -0.1278,
    timestamp: "2025-04-27T10:15:00Z",
    source: "Crypto Tracker",
    image: "https://img.freepik.com/free-vector/gradient-stock-market-concept_23-2149166910.jpg",
  },

  // Sports events
  {
    id: "sports-1",
    type: "sports",
    title: "World Cup Final",
    description: "Brazil and Germany are set to face off in the most anticipated World Cup final, with billions of fans eagerly awaiting the outcome of this iconic matchup.",
    location: "Doha, Qatar",
    lat: 25.2854,
    lng: 51.531,
    timestamp: "2025-04-27T19:00:00Z",
    source: "Sports Global",
    image: "https://img.freepik.com/free-photo/view-soccer-gold-cup-field_23-2150885845.jpg",
  },
  {
    id: "sports-2",
    type: "sports",
    title: "Olympic Record Broken",
    description: "Swimmer shatters 200m freestyle world record by 2 seconds.",
    location: "Paris, France",
    lat: 48.8566,
    lng: 2.3522,
    timestamp: "2025-04-27T16:45:00Z",
    source: "Olympic Committee",
    image: "https://img.freepik.com/free-photo/portrait-female-athletes-competing-olympic-games_23-2151450263.jpg",
  },
]

