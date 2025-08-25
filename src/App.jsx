import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(`https://wttr.in/${city}?format=j1`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">🌤 Free Weather Forecast</h1>

      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          className="p-2 rounded-xl text-black"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={getWeather}
          className="bg-yellow-400 px-4 py-2 rounded-xl font-semibold hover:bg-yellow-500 transition"
        >
          Search
        </button>
      </div>

      {weather && (
        <div className="bg-white/20 p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold">{city}</h2>
          <p className="text-xl">
            {weather.current_condition[0].weatherDesc[0].value}
          </p>
          <p className="text-3xl font-semibold">
            {weather.current_condition[0].temp_C}°C
          </p>
          <p>Humidity: {weather.current_condition[0].humidity}%</p>
        </div>
      )}

      {weather && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {weather.weather.slice(0, 3).map((day, index) => (
            <div
              key={index}
              className="bg-white/20 p-4 rounded-xl text-center shadow"
            >
              <p className="font-bold">Day {index + 1}</p>
              <p className="capitalize">{day.hourly[4].weatherDesc[0].value}</p>
              <p className="text-xl">{day.avgtempC}°C</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
