import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WeatherHeading from "@/components/weather/WeatherHeading";
import WeatherStats from "@/components/weather/WeatherStats";
import WeatherChips from "@/components/weather/WeatherChips";
import WeatherCharts from "@/components/weather/WeatherCharts";

export default function Home() {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <Header />

      <main className="flex flex-col gap-6 py-6 flex-1">
        <div className="px-4 sm:px-6">
          <WeatherHeading city="Madrid" country="Spain" condition="Partly Cloudy" />
        </div>

        <WeatherStats />

        <WeatherChips />

        <WeatherCharts />
      </main>

      <Footer />
    </div>
  );
}
