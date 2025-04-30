'use client';

import { useState, useEffect } from 'react';
import { useWorldNews } from '@/hooks/useWorldNews';
import { EventCategory, EventData } from '@/types';
import { eventCategories } from '@/constants';
import { Skeleton } from '@/components/ui/skeleton';
import { renderEventData } from '@/lib/utils';

const NewsPage = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('disasters');

  const { data, loading, error } = useWorldNews(selectedCountry);
  const [displayedData, setDisplayedData] = useState<EventData[]>([]);

  useEffect(() => {
    if (data) {
      const filtered = data[selectedCategory] || [];
      setDisplayedData(filtered);
    }
  }, [data, selectedCategory]);

  const handleCountryClick = (country: string) => {
    setSelectedCountry(country);
    setIsDrawerOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <h1 className="p-6 text-3xl font-bold">World Events</h1>

      <div className="flex flex-wrap gap-3 px-6">
        {['USA', 'Germany', 'Brazil', 'Kenya', 'Japan'].map((country) => (
          <button
            key={country}
            onClick={() => handleCountryClick(country)}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700"
          >
            {country}
          </button>
        ))}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsDrawerOpen((prev) => !prev)}
        className="fixed left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-md bg-neutral-800 px-2 py-2 text-xl hover:bg-neutral-700"
      >
        {isDrawerOpen ? '<' : '>'}
      </button>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-[360px] transform border-r border-neutral-700 bg-neutral-950 shadow-lg transition-transform duration-300 ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 p-4">
          <div>
            <h2 className="text-lg font-semibold">Live Events</h2>
            {selectedCountry && (
              <p className="text-sm text-neutral-400">{selectedCountry}</p>
            )}
          </div>
          <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-medium">
            {displayedData.length} Events
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 px-4 py-3">
          {eventCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name as EventCategory)}
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                selectedCategory === cat.name ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-300'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Events */}
        <div className="overflow-y-auto px-4 py-2 space-y-4 max-h-[calc(100vh-160px)]">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-lg bg-neutral-800" />
            ))
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : displayedData.length > 0 ? (
            displayedData.map((event, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-neutral-800 bg-neutral-900 p-4 shadow"
              >
                {renderEventData(event)}
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-neutral-400">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
