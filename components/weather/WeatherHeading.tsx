type Props = {
  city: string;
  country?: string;
  condition: string;
  description?: string;
};

export default function WeatherHeading({
  city,
  country = "",
  condition,
  description,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-black dark:text-white text-3xl sm:text-4xl font-black leading-tight">
        {city}
        {country && `, ${country}`}
      </h1>
      <div className="flex items-center gap-2">
        <span className="text-2xl">{getWeatherIcon(condition)}</span>
        <div>
          <p className="text-gray-200 dark:text-gray-300 text-lg font-medium capitalize">
            {condition}
          </p>
          {description && (
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Función auxiliar para obtener iconos según la condición del clima
function getWeatherIcon(condition: string) {
  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes("cloud")) return "☁️";
  if (conditionLower.includes("rain")) return "🌧️";
  if (conditionLower.includes("sun") || conditionLower.includes("clear"))
    return "☀️";
  if (conditionLower.includes("snow")) return "❄️";
  if (conditionLower.includes("thunder") || conditionLower.includes("storm"))
    return "⛈️";
  if (conditionLower.includes("fog") || conditionLower.includes("mist"))
    return "🌫️";

  return "🌡️"; // Por defecto
}
