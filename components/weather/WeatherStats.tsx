const stats = [
  { label: "Current Temp", value: "18°C" },
  { label: "Max / Min", value: "22° / 15°" },
  { label: "Feels Like", value: "17°" },
  { label: "Humidity", value: "65%" },
];

export default function WeatherStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-6">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10">
          <p className="text-gray-600 dark:text-gray-300 text-base font-medium">{s.label}</p>
          <p className="text-black dark:text-white text-3xl font-bold">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
