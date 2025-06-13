import React, { useEffect, useState } from 'react';
import axios from 'axios';

import sunnyIcon from '/assets/sunny.png';
import cloudyIcon from '/assets/cloudy.png';
import bg1 from '/assets/bg1.png';
import bg2 from '/assets/bg2.png';

const getIconByDescription = (desc) => {
  const lower = desc.toLowerCase();
  if (lower.includes('cloud')) return cloudyIcon;
  if (lower.includes('clear') || lower.includes('sun')) return sunnyIcon;
  return sunnyIcon; // Default fallback
};

export default function Recent() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const city = 'surat';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/weather/today?city=${city}`);
        const data = res.data;
        const icon = getIconByDescription(data.desc);

        const cardsData = Array.from({ length: 5 }, (_, i) => ({
          city: data.city,
          day: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
          temp: data.temp,
          icon,
          background: i % 2 === 0 ? bg1 : bg2,
        }));

        setCards(cardsData);
      } catch (err) {
        console.error('Failed to fetch weather:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading current weather...</p>;
  if (!cards.length) return <p className="text-center text-red-500">Failed to load weather cards.</p>;

  return (
    <div className="bg-gray-200 py-10 px-4 sm:px-6 lg:px-16 flex flex-col lg:flex-row items-start gap-10 mt-10">
      {/* Text Section */}
      <div className="w-full max-w-md lg:ml-60">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          Recent <br />
          Search <br />
          Weather
        </h2>
        <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed tracking-wide">
          <span style={{ letterSpacing: '0.3em' }}>
            Lorem Ipsum Dolor Sit Amet,
          </span>
          <br />
          Consectetur Adipiscing Elit. Bibendum <br />
          Cursus Quis.
        </p>
      </div>

      {/* Cards Section */}
      <div
        className="overflow-x-auto hide-scrollbar"
        style={{
          width: '100%',
          maxWidth: 'calc(2 * 15rem + 1.5rem)',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
        }}
      >
        <div className="flex gap-6" style={{ scrollSnapType: 'x mandatory' }}>
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-60 h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg relative"
              style={{
                backgroundImage: `url(${card.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                scrollSnapAlign: 'start',
              }}
            >
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
                <img
                  src={card.icon}
                  alt="weather"
                  className="w-10 sm:w-12 h-10 sm:h-12 mb-3"
                />
                <p className="text-lg sm:text-xl font-medium">
                  {card.city} ({card.day})
                </p>
                <p className="text-3xl sm:text-5xl font-bold mt-2">{card.temp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
