import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const apiKey = "YOUR_OPENWEATHER_API_KEY"; // replace with your key

  const getWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">🌤 Weather App</h1>

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

      {weather && weather.main && (
        <div className="bg-white/20 p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold">{weather.name}</h2>
          <p className="text-xl capitalize">{weather.weather[0].description}</p>
          <p className="text-3xl font-semibold">{weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
