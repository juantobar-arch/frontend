import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Definición de tipos para los datos del clima
type WeatherData = {
  time?: string | number | Date;
  temperature?: string | number;
  humidity?: string | number;
  pressure?: string | number;
  wind_speed?: string | number;
  weather?: string;
  // Campos adicionales que podrían venir de la API
  city?: string;
  country?: string;
  [key: string]: any; // Para manejar propiedades adicionales
};

type ChartData = {
  time: string;
  timeDisplay: string;
  temperature: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
};

type Props = {
  data: WeatherData[];
};

export default function WeatherCharts({ data }: Props) {
  console.log('Datos recibidos en WeatherCharts:', JSON.stringify(data, null, 2));
  // Procesar los datos para el gráfico
  const processData = (data: WeatherData[]): ChartData[] => {
    if (!Array.isArray(data)) {
      console.error('Los datos no son un array:', data);
      return [];
    }

    // Mapear los datos a un formato consistente
    const processed = data
      .filter((d) => d && (d.time || d.timestamp)) // Filtrar entradas nulas/undefined y sin tiempo
      .map((d) => {
        try {
          // Usar timestamp si está disponible, de lo contrario usar time
          const timeValue = d.timestamp || d.time;
          const time = new Date(timeValue);
          
          if (isNaN(time.getTime())) {
            console.warn('Fecha inválida:', timeValue);
            return null;
          }

          // Asegurarse de que los valores numéricos sean números válidos
          const temperature = parseFloat(String(d.temperature || 0));
          const humidity = parseFloat(String(d.humidity || 0));
          const pressure = parseFloat(String(d.pressure || 0));
          const wind_speed = parseFloat(String(d.wind_speed || 0));

          return {
            ...d,
            time: time.toISOString(),
            timeDisplay: format(time, 'HH:mm', { locale: es }),
            temperature,
            humidity,
            pressure,
            wind_speed,
          };
        } catch (error) {
          console.error('Error procesando dato:', d, error);
          return null;
        }
      })
      .filter((d): d is ChartData => d !== null) // Filtrar valores nulos
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

    console.log('Datos procesados para gráficos:', processed);
    return processed;
  };

  const chartData = processData(data);

  if (chartData.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          No hay datos disponibles para mostrar en las gráficas
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>Verifica la consola del navegador para más detalles.</p>
          <p>Datos recibidos: {JSON.stringify(data, null, 2)}</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
          <p className="font-medium text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`tooltip-${index}`} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}{entry.name === 'temperature' ? '°C' : 
                               entry.name === 'humidity' ? '%' : 
                               entry.name === 'pressure' ? ' hPa' : 
                               entry.name === 'wind_speed' ? ' m/s' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = (title: string, dataKey: keyof ChartData, color: string, unit: string = '') => (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="timeDisplay" 
              stroke="#888" 
              tick={{ fontSize: 12 }}
              tickMargin={8}
            />
            <YAxis 
              stroke="#888" 
              tickFormatter={(value) => `${value}${unit}`}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
              isAnimationActive={false}
              name={title}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  return (
    <div className="px-4 sm:px-6 max-w-6xl mx-auto w-full">
      <h2 className="text-xl font-semibold mb-4">Estadísticas del Clima</h2>
      
      {renderChart('Temperatura', 'temperature', '#3b82f6', '°C')}
      {renderChart('Humedad', 'humidity', '#06b6d4', '%')}
      {renderChart('Presión Atmosférica', 'pressure', '#8b5cf6', ' hPa')}
      
      {chartData[0]?.wind_speed !== undefined && (
        renderChart('Velocidad del Viento', 'wind_speed', '#10b981', ' m/s')
      )}
    </div>
  );
}
