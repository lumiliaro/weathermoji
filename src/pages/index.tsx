import { Container, Text, Title } from "@mantine/core";
import Head from "next/head";
import { useMemo, useState } from "react";
import { ForecastGrid } from "~/components/forecast-grid";
import OpenMeteoLink from "~/components/open-meteo-link";
import { SeachInput } from "~/components/search-input";

import { api } from "~/utils/api";
import {
  type WeatherCondition,
  weatherConditions,
} from "~/utils/weather-conditions";

export default function Home() {
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  const forecast = api.weather.getForecast.useQuery(
    {
      latitude,
      longitude,
      days: 7,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const forecastEmojies: (WeatherCondition | undefined)[] | undefined =
    useMemo(() => {
      if (forecast.isSuccess) {
        return forecast.data?.daily.weather_code.map((code) => {
          return weatherConditions.find((condition) => condition.code === code);
        });
      }
    }, [forecast.data?.daily.weather_code]);

  return (
    <>
      <Head>
        <title>Weathermoji</title>
        <meta name="description" content="Emoji weather forecast" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container size={"lg"} my={30}>
          <Title order={1} ta="center">
            Weatherm☀ji
          </Title>
          <Text c="dimmed" fz="sm" ta="center">
            Enter your location to get your emoji weather forecast
          </Text>

          <Container p={30} size={"xs"}>
            <SeachInput
              searchHandler={(latitude, longitude) => {
                setLatitude(latitude);
                setLongitude(longitude);
              }}
            />
            <OpenMeteoLink />
          </Container>
        </Container>
        {forecastEmojies && (
          <ForecastGrid
            forecastEmojies={forecastEmojies}
            forecast={forecast.data}
          />
        )}
      </main>
    </>
  );
}
