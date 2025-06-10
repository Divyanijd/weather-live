import React, { useEffect, useState } from "react";
import bgImage from "/src/assets/Reac.png";
import cloudRainImg from "/src/assets/Vector.png";
import dropletsImg from "/src/assets/Vect.png";
import cloudSunImg from "/src/assets/Group 27.png";
import "./Card.css";

export default function Card() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/weather/today?city=surat");
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      }
    };

    fetchWeather();
  }, []);

  // Get current date and time formatted
  const now = new Date();

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayName = days[now.getDay()];
  const monthName = months[now.getMonth()];
  const dayNumber = now.getDate();

  // Format time as HH:MM AM/PM
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12
    return `${hours}:${minutes} ${ampm}`;
  };

  const currentTime = formatTime(now);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-2 mt-15"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 md:px-0">

        {/* Left Section */}
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="mx-auto md:ml-60 w-full px-4 md:px-0">
              <h2 className="text-3xl font-bold text-black">
                {weather?.city || "San Francisco"}
              </h2>
              <p className="text-lg text-black">
                {dayName}, {monthName} {dayNumber} &nbsp; | &nbsp; Update As Of {currentTime}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row w-full max-w-sm justify-around bg-white/70 rounded-xl p-6 sm:p-10 shadow-md space-y-4 sm:space-y-0">

                {/* Weather Info Block 1 */}
                <div className="flex flex-col items-center text-gray-800">
                  <div className="flex items-center gap-1 text-sm">
                    <img src={cloudRainImg} alt="Wind" className="w-10 h-10 mt-5 mr-2" />
                    <span>{weather ? weather.wind : "3 m/s"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm mt-1">
                    <img src={dropletsImg} alt="Humidity" className="w-10 h-10 mr-5" />
                    <span> {weather ? weather.humidity : "78%"}</span>
                  </div>
                </div>

                {/* Weather Info Block 2 */}
                <div className="flex flex-col items-center text-gray-800">
                  <div className="flex items-center gap-1 text-sm">
                    <img src={cloudRainImg} alt="Feels Like" className="w-10 h-10 mt-5 mr-2" />
                    <span>{weather ? weather.wind : "3 m/s"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm mt-1">
                    <img src={dropletsImg} alt="Pressure" className="w-10 h-10 mr-4" />
                   <span> {weather ? weather.humidity : "78%"}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-lg w-[180px] sm:w-[200px] mx-auto md:ml-0">
          <img
            src={cloudSunImg}
            alt="Cloud and Sun"
            className="w-12 h-32 md:w-16 md:h-40 mb-4 object-contain"
          />
          <p className="text-2xl font-bold text-black">{weather ? weather.temp : "23°C"}</p>
          <p className="text-base text-gray-600">Max {weather ? weather.temp : "31°C"}</p>
        </div>

      </div>
    </div>
  );
}
