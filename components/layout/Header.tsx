"use client"
import {useState} from "react"
import SearchBar from "../ui/SearchBar"

export default function Header() {
    const [query, setQuery] = useState("");

    return (
    <header className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 px-4 py-3 sm:px-6">
      <div className="flex items-center gap-4 text-black dark:text-white">
        <div className="size-6 text-primary">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold leading-tight">ClimaData</h2>
      </div>

      <div className="flex gap-4 items-center">
        <SearchBar value={query} onChange={setQuery} placeholder="Search location..." />
        <button className="flex items-center justify-center h-10 w-10 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-background-dark text-black dark:text-white">
          <span className="material-symbols-outlined text-2xl">account_circle</span>
        </button>
      </div>
    </header>
    )
}