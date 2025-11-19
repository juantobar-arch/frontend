"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Droplets, Gauge, Calendar } from "lucide-react";

interface WeatherStatsProps {
  temperature: number;
  humidity: number;
  pressure: number;
}

export default function WeatherStats({ temperature, humidity, pressure }: WeatherStatsProps) {
  // Formatear la fecha actual
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tarjeta de Temperatura */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Temperatura</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{temperature.toFixed(1)}°C</div>
            <p className="text-xs text-muted-foreground">
              Temperatura actual
            </p>
          </CardContent>
        </Card>

        {/* Tarjeta de Humedad */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Humedad</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{humidity}%</div>
            <p className="text-xs text-muted-foreground">
              Humedad relativa
            </p>
          </CardContent>
        </Card>

        {/* Tarjeta de Presión */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Presión</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pressure} hPa</div>
            <p className="text-xs text-muted-foreground">
              Presión atmosférica
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Última actualización */}
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>Última actualización: {formatDate(new Date())}</span>
        </div>
      </div>
    </div>
  );
}