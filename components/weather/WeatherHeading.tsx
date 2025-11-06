type Props = {
  city: string;
  country: string;
  condition: string;
};

export default function WeatherHeading({ city, country, condition }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-black dark:text-white text-3xl sm:text-4xl font-black leading-tight">
        {city}, {country}
      </p>
      <p className="text-gray-500 dark:text-gray-400 text-base">{condition}</p>
    </div>
  );
}
