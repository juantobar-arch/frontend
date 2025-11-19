"use client";
import { useState, useEffect } from "react";

export default function SearchBar({
  onSelectCity,
}: {
  onSelectCity: (city: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchCities = async () => {
      const res = await fetch(`/api/cities?q=${query}`);
      if (!res.ok) return;
      const data = await res.json();
      setSuggestions(data);
    };

    const delay = setTimeout(fetchCities, 400);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search location..."
        className="px-4 py-2 border rounded-lg w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border rounded-lg w-full mt-1 max-h-48 overflow-y-auto z-50">
          {suggestions.map((city) => (
            <li
              key={`${city.name}-${city.country}`}
              onClick={() => {
                setQuery(city.name);
                setSuggestions([]);
                onSelectCity(city.name);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
