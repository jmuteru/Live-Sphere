'use client';

import { useState } from 'react';
import Globe from '@/components/Globe';
import { Event, events } from '@/data/events';
import { countries, type Country } from '@/lib/countries';
import { 
  newsData, 
  weatherData, 
  earthquakeData, 
  volcanoData, 
  stockData, 
  sportsData,
  NewsItem,
  WeatherData,
  EarthquakeData,
  VolcanoData,
  StockData,
  SportsData
} from '@/data/db';

type EventCategory = 'news' | 'weather' | 'earthquake' | 'volcano' | 'stock' | 'sports' | 'all';
type EventData = NewsItem | WeatherData | EarthquakeData | VolcanoData | StockData | SportsData;

interface WeatherForecast {
  date: string;
  high: number;
  low: number;
  condition: string;
}

interface StockMover {
  symbol: string;
  name: string;
  change_percent: number;
}

export default function NewsPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all');
  const [displayedData, setDisplayedData] = useState<EventData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountrySelect = (country: Country) => {
    handleCountryClick(country.code);
    setSearchQuery('');
  };

  const handleCountryClick = (country: string) => {
    if (!country) {
      setIsNewsOpen(false);
      setSelectedCountry('');
      return;
    }

    const filteredData = getFilteredData(country.toLowerCase(), selectedCategory);
    setDisplayedData(filteredData);
    setSelectedCountry(country);
    setIsNewsOpen(true);
  };

  const getFilteredData = (countryCode: string, category: EventCategory): EventData[] => {
    if (category === 'all') {
      return [
        ...newsData.filter((item: NewsItem) => item.country_code.toLowerCase() === countryCode),
        ...weatherData.filter((item: WeatherData) => item.country_code.toLowerCase() === countryCode),
        ...earthquakeData.filter((item: EarthquakeData) => item.country_code.toLowerCase() === countryCode),
        ...volcanoData.filter((item: VolcanoData) => item.country_code.toLowerCase() === countryCode),
        ...stockData.filter((item: StockData) => item.country_code.toLowerCase() === countryCode),
        ...sportsData.filter((item: SportsData) => item.country_code.toLowerCase() === countryCode)
      ];
    }

    const dataMap = {
      news: newsData,
      weather: weatherData,
      earthquake: earthquakeData,
      volcano: volcanoData,
      stock: stockData,
      sports: sportsData
    };

    return dataMap[category].filter((item: EventData) => item.country_code.toLowerCase() === countryCode);
  };

  const handleCategoryChange = (category: EventCategory) => {
    setSelectedCategory(category);
    if (selectedCountry) {
      const filteredData = getFilteredData(selectedCountry.toLowerCase(), category);
      setDisplayedData(filteredData);
    }
  };

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

  const renderEventData = (data: EventData) => {
    if ('text' in data) { // NewsItem
      return (
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 text-white">
          {data.image && (
            <img src={data.image} alt={data.title} className="mb-2 h-48 w-full rounded-lg object-cover" />
          )}
          <h3 className="mb-2 font-semibold">{data.title}</h3>
          <p className="text-sm text-gray-300">{data.text}</p>
          <div className="mt-2 flex items-center justify-between">
            <a href={data.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">
              Read more
            </a>
            <span className="text-sm text-gray-400">
              {new Date(data.publish_date).toLocaleDateString()}
            </span>
          </div>
        </div>
      );
    }

    if ('temperature' in data) { // WeatherData
      return (
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">{data.condition}</h3>
              <p className="text-3xl font-bold">{data.temperature}°C</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">Humidity: {data.humidity}%</p>
              <p className="text-sm text-gray-300">Wind: {data.wind_speed} km/h</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="mb-2 font-semibold">Forecast</h4>
            <div className="grid grid-cols-2 gap-2">
              {data.forecast.map((day: WeatherForecast, index: number) => (
                <div key={index} className="rounded border border-gray-600 p-2">
                  <p className="text-sm">{new Date(day.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-300">High: {day.high}°C</p>
                  <p className="text-sm text-gray-300">Low: {day.low}°C</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if ('magnitude' in data) { // EarthquakeData
      return (
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 text-white">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-orange-500 p-3">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Magnitude {data.magnitude}</h3>
              <p className="text-gray-300">{data.location}</p>
              <p className="text-sm text-gray-400">Depth: {data.depth}km</p>
              <p className="mt-2 text-sm text-gray-400">
                {new Date(data.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if ('status' in data) { // VolcanoData
      return (
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 text-white">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-purple-500 p-3">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold">{data.name}</h3>
              <p className="text-gray-300">Status: {data.status}</p>
              <p className="text-sm text-gray-400">Alert Level: {data.alert_level}</p>
              <p className="mt-2 text-sm text-gray-400">
                Last Eruption: {new Date(data.last_eruption).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if ('market_index' in data) { // StockData
      return (
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 text-white">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">{data.market_index}</h3>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold">{data.current_value.toFixed(2)}</p>
              <p className={`text-sm ${data.change_percent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {data.change_percent >= 0 ? '+' : ''}{data.change_percent}%
              </p>
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Top Movers</h4>
            <div className="space-y-2">
              {data.top_movers.map((mover: StockMover, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{mover.symbol}</p>
                    <p className="text-sm text-gray-300">{mover.name}</p>
                  </div>
                  <p className={`${mover.change_percent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {mover.change_percent >= 0 ? '+' : ''}{mover.change_percent}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if ('sport' in data) { // SportsData
      return (
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 text-white">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">{data.sport}</h3>
            <p className="text-gray-300">{data.event}</p>
          </div>
          {data.teams && (
            <div className="mb-4 text-center">
              <p className="text-lg font-medium">{data.teams[0]} vs {data.teams[1]}</p>
              {data.result && <p className="text-2xl font-bold">{data.result}</p>}
            </div>
          )}
          {data.highlights && (
            <p className="text-sm text-gray-300">{data.highlights}</p>
          )}
          <p className="mt-2 text-sm text-gray-400">
            {new Date(data.timestamp).toLocaleString()}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      {/* News Panel */}
      <div
        className={`fixed left-0 top-0 h-full w-[400px] transform bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out ${
          isNewsOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-hidden flex flex-col">
          {/* Header with title and close button */}
          <div className="border-b border-gray-700 bg-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-white">GlobeEvents</h2>
                <span className="rounded bg-green-500 px-2 py-0.5 text-xs font-semibold text-white">
                  LIVE
                </span>
              </div>
              <button
                onClick={() => setIsNewsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Country name and search section */}
          <div className="p-4 space-y-4">
            <h3 className="text-xl font-semibold text-white">
              {selectedCountry ? countries.find(c => c.code === selectedCountry.toLowerCase())?.name || selectedCountry : 'Select a country'}
            </h3>
            
            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg bg-gray-700 px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* Search Results Dropdown */}
              {searchQuery && (
                <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-lg bg-gray-800 shadow-lg">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country)}
                        className="flex w-full items-center space-x-2 px-4 py-2 text-left text-white hover:bg-gray-700"
                      >
                        <span className="text-lg">{country.flag}</span>
                        <span>{country.name}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-400">
                      No countries found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="grid grid-cols-2 gap-2 p-4">
            {eventCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryChange(category.name as EventCategory)}
                className={`flex items-center justify-center space-x-2 rounded p-2 text-white transition-colors ${
                  selectedCategory === category.name ? category.color : 'bg-gray-700'
                } ${category.hoverColor}`}
              >
                {category.icon}
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {displayedData.length > 0 ? (
                displayedData.map((data, index) => (
                  <div key={data.id}>
                    {renderEventData(data)}
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400">
                  {selectedCountry
                    ? `No ${selectedCategory === 'all' ? 'data' : selectedCategory} available for this country`
                    : 'Select a country to view data'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Globe Container */}
      <div
        className={`h-full w-full transition-all duration-300 ${
          isNewsOpen ? 'pl-[400px]' : ''
        }`}
      >
        <Globe events={events} onCountryClick={handleCountryClick} />
      </div>
    </div>
  );
} 