"use client";
import { useState, useEffect } from "react";

interface HeaderProps {
  cities: string[];
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export default function Header({
  cities,
  selectedCity,
  onSelectCity,
}: HeaderProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Actualizar la búsqueda cuando cambia la ciudad seleccionada
  useEffect(() => {
    if (selectedCity) {
      setQuery(selectedCity);
    }
  }, [selectedCity]);

  const filteredCities = cities.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectCity = (city: string) => {
    setQuery(city);
    onSelectCity(city);
    setShowDropdown(false);
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-sm relative z-20">
      <h1 className="text-2xl font-bold text-black dark:text-white select-none">
        Weather ETL
      </h1>

      <div className="relative w-64">
        {/* Input de búsqueda */}
        <input
          type="text"
          value={query}
          placeholder="Buscar ciudad..."
          onFocus={() => {
            setIsFocused(true);
            setShowDropdown(true);
          }}
          onBlur={() =>
            setTimeout(() => {
              setIsFocused(false);
              setShowDropdown(false);
            }, 200)
          }
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                     bg-gray-50 dark:bg-gray-800 text-black dark:text-white
                     focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
        />

        {/* Dropdown de sugerencias */}
        {showDropdown && query && (
          <ul
            className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 
                         dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50"
          >
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <li
                  key={city}
                  onMouseDown={() => handleSelectCity(city)}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 
                             transition-colors ${
                               selectedCity === city
                                 ? "bg-blue-100 dark:bg-blue-900"
                                 : "text-gray-800 dark:text-gray-200"
                             }`}
                >
                  {city}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
                No hay resultados
              </li>
            )}
          </ul>
        )}
      </div>
    </header>
  );
}
