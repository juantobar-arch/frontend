// app/api/weather/all/route.ts
import { NextResponse } from "next/server";

// Lista de ciudades principales para buscar en la API
const MAJOR_CITIES = [
  // América
  "Bogota,CO",
  "Medellin,CO",
  "Buenos Aires,AR",
  "Sao Paulo,BR",
  "Lima,PE",
  "Santiago,CL",
  "Mexico City,MX",
  "New York,US",
  "Los Angeles,US",
  "Toronto,CA",
  // Europa
  "Madrid,ES",
  "Barcelona,ES",
  "Paris,FR",
  "London,UK",
  "Berlin,DE",
  "Rome,IT",
  "Amsterdam,NL",
  "Vienna,AT",
  "Prague,CZ",
  "Warsaw,PL",
  // Asia
  "Tokyo,JP",
  "Beijing,CN",
  "Seoul,KR",
  "Bangkok,TH",
  "Singapore,SG",
  "Mumbai,IN",
  "Dubai,AE",
  "Istanbul,TR",
  "Riyadh,SA",
  "Tel Aviv,IL",
  // Oceanía
  "Sydney,AU",
  "Melbourne,AU",
  "Auckland,NZ",
  // África
  "Cape Town,ZA",
  "Cairo,EG",
  "Nairobi,KE",
  "Lagos,NG",
  "Casablanca,MA",
];

// Función para obtener el clima de una ciudad
async function getWeatherForCity(cityQuery: string, apiKey: string) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        cityQuery
      )}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      console.error(`Error al consultar ${cityQuery}:`, await response.text());
      return null;
    }

    const data = await response.json();

    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp * 10) / 10, // Redondear a 1 decimal
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      weather: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      timestamp: new Date().toISOString(),
      coord: data.coord, // Guardar coordenadas para posibles usos futuros
    };
  } catch (error) {
    console.error(`Error procesando ${cityQuery}:`, error);
    return null;
  }
}

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    if (!apiKey) {
      console.error("API key de OpenWeather no configurada");
      return new Response(
        JSON.stringify({
          error: "Configuración de API no encontrada",
          message: "La API key de OpenWeather no está configurada",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log(
      "Obteniendo datos del clima para",
      MAJOR_CITIES.length,
      "ciudades..."
    );

    // Limitar a 10 ciudades para no exceder los límites de la API gratuita
    const citiesToQuery = MAJOR_CITIES.slice(0, 10);

    // Consultar el clima para cada ciudad en paralelo
    const weatherPromises = citiesToQuery.map((city) =>
      getWeatherForCity(city, apiKey)
    );

    // Esperar todas las consultas y filtrar las exitosas
    const results = await Promise.all(weatherPromises);
    const weatherData = results.filter(Boolean);

    console.log(
      `✅ Datos recibidos para ${weatherData.length} de ${citiesToQuery.length} ciudades`
    );

    if (weatherData.length === 0) {
      return new Response(
        JSON.stringify({
          error: "No se encontraron datos",
          message: "No se pudo obtener datos del clima para ninguna ciudad",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(JSON.stringify(weatherData), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error en /api/weather/all:", error);

    // En caso de error, devolver un mensaje de error claro
    return new Response(
      JSON.stringify({
        error: "Error interno del servidor",
        message: error instanceof Error ? error.message : "Error desconocido",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
