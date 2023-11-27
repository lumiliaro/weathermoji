export type WeatherCondition = {
  code: number;
  name: string;
  emoji: string;
};

export const weatherConditions: WeatherCondition[] = [
  { code: 0, name: "Clear sky", emoji: "☀️" },
  { code: 1, name: "Mainly clear", emoji: "🌤️" },
  { code: 2, name: "Partly cloudy", emoji: "⛅" },
  { code: 3, name: "Overcast", emoji: "☁️" },
  { code: 45, name: "Fog and depositing rime fog", emoji: "🌫️" },
  { code: 48, name: "Fog and depositing rime fog", emoji: "🌫️" },
  { code: 51, name: "Drizzle: Light intensity", emoji: "🌧️" },
  { code: 53, name: "Drizzle: Moderate intensity", emoji: "🌧️" },
  { code: 55, name: "Drizzle: Dense intensity", emoji: "🌧️" },
  { code: 56, name: "Freezing Drizzle: Light intensity", emoji: "🌧️❄️" },
  { code: 57, name: "Freezing Drizzle: Dense intensity", emoji: "🌧️❄️" },
  { code: 61, name: "Rain: Slight intensity", emoji: "🌧️" },
  { code: 63, name: "Rain: Moderate intensity", emoji: "🌧️" },
  { code: 65, name: "Rain: Heavy intensity", emoji: "🌧️" },
  { code: 66, name: "Freezing Rain: Light intensity", emoji: "🌧️❄️" },
  { code: 67, name: "Freezing Rain: Heavy intensity", emoji: "🌧️❄️" },
  { code: 71, name: "Snow fall: Slight intensity", emoji: "❄️" },
  { code: 73, name: "Snow fall: Moderate intensity", emoji: "❄️" },
  { code: 75, name: "Snow fall: Heavy intensity", emoji: "❄️" },
  { code: 77, name: "Snow grains", emoji: "❄️" },
  { code: 80, name: "Rain showers: Slight intensity", emoji: "🌧️" },
  { code: 81, name: "Rain showers: Moderate intensity", emoji: "🌧️" },
  { code: 82, name: "Rain showers: Violent intensity", emoji: "🌧️" },
  { code: 85, name: "Snow showers: Slight intensity", emoji: "❄️" },
  { code: 86, name: "Snow showers: Heavy intensity", emoji: "❄️" },
  { code: 95, name: "Thunderstorm: Slight or moderate", emoji: "⛈️" },
  { code: 96, name: "Thunderstorm with slight hail", emoji: "⛈️❄️" },
  { code: 99, name: "Thunderstorm with heavy hail", emoji: "⛈️❄️" },
];
