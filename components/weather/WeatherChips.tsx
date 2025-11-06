const chips = [
  { label: "Last 24h", active: true },
  { label: "Last 7 Days" },
  { label: "Month" },
];

export default function WeatherChips() {
  return (
    <div className="flex gap-3 px-4 sm:px-6 flex-wrap">
      {chips.map((chip) => (
        <div
          key={chip.label}
          className={`flex h-9 items-center justify-center rounded-lg px-4 cursor-pointer text-sm font-medium ${
            chip.active
              ? "bg-primary text-white"
              : "bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-black dark:text-white border border-gray-200 dark:border-white/10"
          }`}
        >
          {chip.label}
        </div>
      ))}
    </div>
  );
}
