import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json({ error: "Ciudad no especificada" }, { status: 400 });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Falta la API key de OpenWeather" }, { status: 500 });
  }

  try {
    // Petición al endpoint correcto de OpenWeather
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Respuesta de OpenWeather:", text);
      return NextResponse.json({ error: "Error al consultar OpenWeather" }, { status: res.status });
    }

    const data = await res.json();

    const weather = {
      city: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      weather: data.weather[0].main,
      description: data.weather[0].description,
      wind_speed: data.wind.speed,
      time: new Date().toISOString(),
    };

    return NextResponse.json(weather);
  } catch (error) {
    console.error("Error al obtener datos del clima:", error);
    return NextResponse.json({ error: "Error al obtener datos del clima" }, { status: 500 });
  }
}
