import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  type OpenMeteoGeoCodingLocation,
  type OpenMeteoGeoCodingForecast,
  type OpenMeteoGeoCodingLocationResults,
} from "./types";

export const weatherRouter = createTRPCRouter({
  getLocations: publicProcedure
    .input(z.object({ location: z.string().trim().min(3) }))
    .output(z.custom<OpenMeteoGeoCodingLocation>())
    .query(async ({ input }) => {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${input.location}&count=5&language=en&format=json`,
      );
      const locations = (await response.json()) as OpenMeteoGeoCodingLocation;

      return locations;
    }),

  getForecast: publicProcedure
    .input(
      z.object({
        latitude: z.string().trim().min(1),
        longitude: z.string().trim().min(1),
        days: z
          .literal(1)
          .or(z.literal(3))
          .or(z.literal(7))
          .or(z.literal(14))
          .or(z.literal(16)),
      }),
    )
    .output(z.custom<OpenMeteoGeoCodingForecast>())
    .query(async ({ input }) => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${input.latitude}&longitude=${input.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=${input.days}&models=best_match`,
      );
      return (await response.json()) as OpenMeteoGeoCodingForecast;
    }),
});
