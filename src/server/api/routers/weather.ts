import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  type OpenMeteoGeoCodingLocation,
  type OpenMeteoGeoCodingForecast,
} from "./types";

export const weatherRouter = createTRPCRouter({
  getLocations: publicProcedure
    .input(z.object({ location: z.string().trim() }))
    .query(async ({ input }) => {
      if (input.location.length < 3) {
        return;
      }

      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${input.location}&count=5&language=en&format=json`,
      );
      const locations = (await response.json()) as OpenMeteoGeoCodingLocation;

      if (!locations) {
        return;
      }

      return locations.results;
    }),

  getForecast: publicProcedure
    .input(
      z.object({
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        days: z.number(),
      }),
    )
    .query(async ({ input }) => {
      if (input.latitude === undefined || input.longitude === undefined) {
        return;
      }

      if (input.days < 1) {
        return;
      }

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${input.latitude}&longitude=${input.longitude}&daily=weather_code,precipitation_probability_max&timezone=auto&models=best_match&forecast_days=${input.days}`,
      );
      const forecast = (await response.json()) as OpenMeteoGeoCodingForecast;

      if (!forecast) {
        throw new Error("Failed to fetch forecast");
      }

      return forecast;
    }),
});
