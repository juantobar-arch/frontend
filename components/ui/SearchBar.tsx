"use client";

type SearchBarProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <label className="flex flex-col min-w-40 !h-10 max-w-64">
      <div className="flex w-full items-stretch rounded-lg h-full">
        <div className="flex items-center justify-center pl-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-white/20 bg-white dark:bg-background-dark text-gray-500 dark:text-gray-400">
          <span className="material-symbols-outlined text-xl">search</span>
        </div>
        <input
          className="flex w-full border border-l-0 border-gray-300 dark:border-white/20 rounded-r-lg px-4 text-black dark:text-white bg-white dark:bg-background-dark focus:ring-2 focus:ring-primary/50 focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </label>
  );
}
