export type OpenMeteoGeoCodingLocationResults = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  admin3_id: number;
  admin4_id: number;
  timezone: string;
  population: number;
  postcodes: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
};

export type OpenMeteoGeoCodingLocation = {
  generationtime_ms: number;
  results: OpenMeteoGeoCodingLocationResults[];
};

export type OpenMeteoGeoCodingForecast = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
};
