"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dataDay = [
  { time: "00h", temp: 15 },
  { time: "03h", temp: 14 },
  { time: "06h", temp: 16 },
  { time: "09h", temp: 18 },
  { time: "12h", temp: 22 },
  { time: "15h", temp: 23 },
  { time: "18h", temp: 19 },
  { time: "21h", temp: 17 },
];

const dataWeek = [
  { day: "Mon", temp: 18 },
  { day: "Tue", temp: 20 },
  { day: "Wed", temp: 22 },
  { day: "Thu", temp: 21 },
  { day: "Fri", temp: 19 },
  { day: "Sat", temp: 23 },
  { day: "Sun", temp: 20 },
];

export default function WeatherCharts() {
  return (
    <div className="px-4 sm:px-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Temperature Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="day" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="day">Last 24h</TabsTrigger>
              <TabsTrigger value="week">Last 7 Days</TabsTrigger>
            </TabsList>

            <TabsContent value="day">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dataDay}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="time" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="temp"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="week">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dataWeek}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="day" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="temp"
                      stroke="#f97316"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
