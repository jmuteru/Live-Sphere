export interface NewsItem {
  id: string;
  title: string;
  text: string;
  url: string;
  image: string;
  publish_date: string;
  authors: string[];
  country_code: string;
  category: 'news' | 'weather' | 'earthquake' | 'volcano' | 'stock' | 'sports';
  sentiment: number;
}

export interface WeatherData {
  id: string;
  country_code: string;
  temperature: number;
  condition: string;
  humidity: number;
  wind_speed: number;
  forecast: {
    date: string;
    high: number;
    low: number;
    condition: string;
  }[];
  last_updated: string;
}

export interface EarthquakeData {
  id: string;
  country_code: string;
  magnitude: number;
  depth: number;
  location: string;
  timestamp: string;
  coordinates: [number, number];
}

export interface VolcanoData {
  id: string;
  country_code: string;
  name: string;
  status: 'active' | 'dormant' | 'warning';
  last_eruption: string;
  alert_level: string;
  coordinates: [number, number];
}

export interface StockData {
  id: string;
  country_code: string;
  market_index: string;
  current_value: number;
  change_percent: number;
  volume: number;
  top_movers: {
    symbol: string;
    name: string;
    change_percent: number;
  }[];
  last_updated: string;
}

export interface SportsData {
  id: string;
  country_code: string;
  sport: string;
  event: string;
  teams?: [string, string];
  result?: string;
  timestamp: string;
  highlights?: string;
}

// Recent news data (last 24 hours)
export const newsData: NewsItem[] = [
  {
    id: "us-tech-1",
    country_code: "us",
    category: "news",
    title: "Tech Giants Announce AI Collaboration",
    text: "Major tech companies have joined forces to establish standards for artificial intelligence development, focusing on safety and ethical considerations. The collaboration aims to address concerns about AI's impact on society while promoting innovation.",
    url: "#",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    publish_date: new Date(Date.now() - 3600000).toISOString(),
    authors: ["Tech Report Team"],
    sentiment: 0.8
  },
  {
    id: "jp-tech-1",
    country_code: "jp",
    category: "news",
    title: "Japan Unveils Next-Generation Robotics Initiative",
    text: "Japanese researchers have announced breakthrough developments in humanoid robotics, with new models showing unprecedented dexterity and learning capabilities. The initiative is backed by major industrial partners.",
    url: "#",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    publish_date: new Date(Date.now() - 7200000).toISOString(),
    authors: ["Tokyo Science Bureau"],
    sentiment: 0.9
  },
  {
    id: "gb-climate-1",
    country_code: "gb",
    category: "news",
    title: "UK Accelerates Green Energy Transition",
    text: "The United Kingdom has announced ambitious new targets for renewable energy adoption, with plans to increase offshore wind capacity and invest in green hydrogen production facilities.",
    url: "#",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7",
    publish_date: new Date(Date.now() - 10800000).toISOString(),
    authors: ["Environmental Policy Unit"],
    sentiment: 0.7
  }
];

// Weather data
export const weatherData: WeatherData[] = [
  {
    id: "us-weather-1",
    country_code: "us",
    temperature: 22,
    condition: "Partly Cloudy",
    humidity: 65,
    wind_speed: 12,
    forecast: [
      {
        date: new Date(Date.now() + 86400000).toISOString(),
        high: 24,
        low: 18,
        condition: "Sunny"
      },
      {
        date: new Date(Date.now() + 172800000).toISOString(),
        high: 23,
        low: 17,
        condition: "Scattered Showers"
      }
    ],
    last_updated: new Date().toISOString()
  }
];

// Earthquake data
export const earthquakeData: EarthquakeData[] = [
  {
    id: "jp-eq-1",
    country_code: "jp",
    magnitude: 4.5,
    depth: 35,
    location: "Off coast of Fukushima",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    coordinates: [37.7749, 140.4731]
  }
];

// Volcano activity
export const volcanoData: VolcanoData[] = [
  {
    id: "id-vol-1",
    country_code: "id",
    name: "Mount Merapi",
    status: "warning",
    last_eruption: new Date(Date.now() - 604800000).toISOString(),
    alert_level: "Level 3",
    coordinates: [-7.5407, 110.4457]
  }
];

// Stock market data
export const stockData: StockData[] = [
  {
    id: "us-stock-1",
    country_code: "us",
    market_index: "S&P 500",
    current_value: 4892.37,
    change_percent: 0.35,
    volume: 2750000000,
    top_movers: [
      {
        symbol: "TECH",
        name: "TechCorp Inc.",
        change_percent: 3.2
      },
      {
        symbol: "ENRG",
        name: "Clean Energy Ltd.",
        change_percent: -2.1
      }
    ],
    last_updated: new Date().toISOString()
  }
];

// Sports events
export const sportsData: SportsData[] = [
  {
    id: "gb-sport-1",
    country_code: "gb",
    sport: "Football",
    event: "Premier League Match",
    teams: ["Manchester City", "Liverpool"],
    result: "2-1",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    highlights: "Exciting match with a last-minute goal"
  }
]; 