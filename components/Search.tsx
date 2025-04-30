'use client'

import { useState } from 'react'
import { type Country } from '@/lib/countries'

interface SearchProps {
  onSearch: (query: string) => void;
  onCountrySelect: (country: Country) => void;
  placeholder?: string;
  countries: Country[];
}

export default function Search({ onSearch, onCountrySelect, placeholder = "Search...", countries }: SearchProps) {
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)

  const filteredCountries = countries.filter((country: Country) => 
    country.name.toLowerCase().includes(query.toLowerCase())
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setShowResults(value.length > 0)
    onSearch(value)
  }

  const handleCountryClick = (country: Country) => {
    setQuery(country.name)
    setShowResults(false)
    onCountrySelect(country)
  }

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => setShowResults(query.length > 0)}
        placeholder={placeholder}
        className="w-full rounded-lg bg-gray-700 px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-lg bg-gray-800 shadow-lg">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country: Country) => (
              <button
                key={country.code}
                onClick={() => handleCountryClick(country)}
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
  )
} 