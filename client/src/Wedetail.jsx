import React, { useEffect, useState } from "react";
import sunriseImg from "/assets/sunr.png";
import sunsetImg from "/assets/suns.png";
import cloudRainImg from "/assets/vectw.png";
import dropletsImg from "/assets/vecw.png";
import { CloudSun, CloudRain, Cloud } from "lucide-react";

const CITY = "surat";

export default function WeaDetail() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(`http://localhost:3001/api/weather/today?city=${CITY}`);
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      }
    }

    async function fetchForecast() {
      try {
        const res = await fetch(`http://localhost:3001/api/weather/forecast?city=${CITY}`);
        const data = await res.json();
        setForecast(data.forecast.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch forecast:", error);
      }
    }

    fetchWeather();
    fetchForecast();
  }, []);

  if (!weather) return <div className="text-white p-10">Loading weather data...</div>;

  return (
    <div
      className="relative bg-cover bg-center min-h-screen px-4 py-10 text-white mt-20"
      style={{ backgroundImage: "url('/src/assets/bgg.png')" }}
    >
      <div className="max-w-7xl mx-auto space-y-8 mt-10">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Today's Weather Details</h2>
          <p className="text-sm mt-2 text-gray-200">Live weather update for {CITY}.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="flex flex-wrap justify-center gap-6">
              {[{ day: "Sunrise", time: weather.sunrise, background: sunriseImg },
                { day: "Sunset", time: weather.sunset, background: sunsetImg }].map(
                (card, index) => (
                  <div
                    key={index}
                    className="relative w-40 h-40 rounded-2xl"
                    style={{
                      backgroundImage: `url(${card.background})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="relative z-10 flex flex-col justify-center items-center h-full rounded-2xl">
                      <p className="text-xl font-medium">{card.day}</p>
                      <p className="text-3xl font-bold mt-2">{card.time}</p>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-around gap-6 p-4 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl">
              <div className="flex flex-col items-center gap-6 text-white">
                <div className="flex items-center gap-2">
                  <img src={cloudRainImg} alt="Wind" className="w-10 h-10" />
                  <span>Wind {weather.wind}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={dropletsImg} alt="Humidity" className="w-10 h-10" />
                  <span>Humidity {weather.humidity}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl h-full">
              <div className="flex flex-col gap-10">
                <p className="text-4xl font-bold">
                  {weather.temp} <span className="text-2xl">Feels Like {weather.feels_like}</span>
                </p>

                <div className="flex overflow-x-auto gap-6 pb-2 scrollbar-hide">
                  {forecast.map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-white min-w-[80px]">
                      <div className="mb-1">
                        {item.desc.includes("rain") ? (
                          <CloudRain size={35} />
                        ) : item.desc.includes("cloud") ? (
                          <Cloud size={35} />
                        ) : (
                          <CloudSun size={35} />
                        )}
                      </div>
                      <p className="font-normal">{item.temp}</p>
                      <p className="text-sm">{item.time}</p>
                      <p className="text-sm text-white/80 capitalize">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-yellow-300 font-medium">News Update</p>
              </div>
              <button className="text-sm hover:underline">View Tomorrow Forecast →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
