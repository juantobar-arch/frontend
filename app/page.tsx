"use client";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WeatherHeading from "@/components/weather/WeatherHeading";
import WeatherStats from "@/components/weather/WeatherStats";
import WeatherChips from "@/components/weather/WeatherChips";
import WeatherCharts from "@/components/weather/WeatherCharts";

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  humidity: number;
  pressure: number;
  weather: string;
  description: string;
  icon: string;
  timestamp: string;
  coord?: {
    lon: number;
    lat: number;
  };
}

interface ApiError {
  error?: string;
  message?: string;
}

type WeatherApiResponse = WeatherData[] | ApiError;

export default function Home() {
  const [cities, setCities] = useState<WeatherData[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("Bogota");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos del clima para todas las ciudades
  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/weather/all");

        // Primero obtener el texto de la respuesta
        const responseText = await res.text();
        let data: WeatherData[] | { error?: string; message?: string } | null =
          null;

        try {
          // Intentar analizar como JSON
          data = JSON.parse(responseText);
        } catch (e) {
          // Si no es JSON válido, lanzar error con el texto de respuesta
          throw new Error(
            `Respuesta inválida del servidor: ${responseText.substring(0, 200)}`
          );
        }

        // Verificar si hay un error en la respuesta
        if (!res.ok) {
          let errorMessage = `Error ${res.status}: ${res.statusText}`;

          // Si hay datos de error en la respuesta, intentar extraer el mensaje
          if (data && typeof data === "object") {
            const errorResponse = data as any;
            errorMessage =
              errorResponse.message || errorResponse.error || errorMessage;
          }

          // Safe error logging that works in all environments
          try {
            // Try structured logging if available
            if (process.env.NODE_ENV === "development") {
              console.log("[DEV] Error en la respuesta:", {
                status: res.status,
                statusText: res.statusText,
                data,
              });
            }
          } catch (logError) {
            // Fallback to basic logging if structured logging fails
            console.log(`Error ${res.status}: ${res.statusText}`);
          }

          throw new Error(errorMessage);
        }

        if (Array.isArray(data) && data.length > 0) {
          setCities(data);
          // Seleccionar la primera ciudad por defecto si no hay una seleccionada
          if (
            !selectedCity ||
            !data.some((city: any) => city.city === selectedCity)
          ) {
            setSelectedCity(data[0].city);
          }
        }
      } catch (err) {
        console.error("Error fetching weather data:", err);
        // Usar datos de ejemplo como respaldo
        // En caso de error, usar datos de ejemplo
        const mockData: WeatherData[] = [
          {
            city: "Bogotá",
            country: "CO",
            temperature: 18,
            humidity: 75,
            pressure: 1012,
            weather: "Clouds",
            description: "nubes dispersas",
            icon: "03d",
            timestamp: new Date().toISOString(),
          },
          {
            city: "Medellín",
            country: "CO",
            temperature: 22,
            humidity: 68,
            pressure: 1015,
            weather: "Clear",
            description: "cielo claro",
            icon: "01d",
            timestamp: new Date().toISOString(),
          },
        ];
        setCities(mockData);
        if (
          !selectedCity ||
          !mockData.some((city) => city.city === selectedCity)
        ) {
          setSelectedCity(mockData[0].city);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();

    // Actualizar cada minuto para obtener datos en tiempo real
    const interval = setInterval(fetchWeatherData, 60000);

    return () => clearInterval(interval);
  }, [selectedCity]);

  // Filtrar la ciudad seleccionada
  const currentWeather = cities.find((city) => city.city === selectedCity);

  // Crear lista de ciudades únicas con formato "Ciudad, País"
  const cityList = Array.from(
    new Map(
      cities.map((city) => [`${city.city}, ${city.country}`, city])
    ).values()
  ).map((city) => `${city.city}, ${city.country}`);

  // Ordenar ciudades alfabéticamente
  cityList.sort((a, b) => a.localeCompare(b));

  // Si no hay ciudad seleccionada y hay ciudades disponibles, seleccionar la primera
  useEffect(() => {
    if (cities.length > 0 && !selectedCity) {
      setSelectedCity(cities[0].city);
    }
  }, [cities, selectedCity]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando datos del clima...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!currentWeather) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">
          No se encontraron datos para la ciudad seleccionada.
        </div>
      </div>
    );
  }

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <Header
        cities={cityList}
        onSelectCity={(city) => {
          // Extraer solo el nombre de la ciudad (antes de la coma)
          const cityName = city.split(",")[0].trim();
          setSelectedCity(cityName);
        }}
        selectedCity={
          `${currentWeather?.city}, ${currentWeather?.country}` || ""
        }
      />

      <main className="flex flex-col gap-6 py-6 flex-1 px-4 sm:px-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : currentWeather ? (
          <>
            <WeatherHeading
              city={currentWeather.city}
              condition={currentWeather.weather}
              description={currentWeather.description}
            />

            <WeatherStats
              temperature={currentWeather.temperature}
              humidity={currentWeather.humidity}
              pressure={currentWeather.pressure}
            />

            <WeatherChips />

            {/* Mostrar datos históricos si están disponibles */}
            {cities.length > 1 ? (
              <WeatherCharts
                data={cities.filter((c) => c.city === selectedCity)}
              />
            ) : (
              <div className="text-center text-gray-500 py-4">
                No hay suficientes datos históricos para mostrar gráficos.
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No se encontraron datos para la ciudad seleccionada.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
