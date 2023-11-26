import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type OpenMeteoGeoCodingLocation } from "./types";

const weather = {
  id: 1,
  name: "Hello World",
};

export const weatherRouter = createTRPCRouter({
  getLocations: publicProcedure
    .input(z.object({ location: z.string() }))
    .query(async ({ input }) => {
      if (input.location.length < 3) {
        return [];
      }

      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${input.location}&count=5&language=en&format=json`,
      );
      const locations = (await response.json()) as OpenMeteoGeoCodingLocation;

      if (!locations) {
        return [];
      }

      return locations.results;
    }),

  getForecast: publicProcedure
    .input(z.object({ location: z.string(), days: z.number() }))
    .query(async ({ input }) => {
      if (input.location.length < 3) {
        return [];
      }

      if (input.days < 1) {
        return [];
      }

      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${input.location}&count=5&language=en&format=json`,
      );
      const locations = (await response.json()) as OpenMeteoGeoCodingLocation;

      return locations.results;
    }),
});
