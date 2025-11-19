import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
  );

  const data = await res.json();

  // Simplificamos la respuesta
  const cities = data.map((c: any) => ({
    name: c.name,
    country: c.country,
    lat: c.lat,
    lon: c.lon,
  }));

  return NextResponse.json(cities);
}
