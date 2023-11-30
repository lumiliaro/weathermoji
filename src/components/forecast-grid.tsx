import { Card, Text, SimpleGrid, UnstyledButton, Group } from "@mantine/core";

import classes from "./forecast-grid.module.css";
import { type WeatherCondition } from "~/utils/weather-conditions";
import OpenMeteoLink from "./open-meteo-link";
import { type OpenMeteoGeoCodingForecast } from "~/server/api/routers/types";

export function ForecastGrid(props: {
  forecastEmojies: (WeatherCondition | undefined)[] | undefined;
  forecast: OpenMeteoGeoCodingForecast | undefined;
}) {
  if (!props.forecastEmojies) {
    return <></>;
  }

  const items = props.forecastEmojies.map((day, index) => (
    <UnstyledButton key={index} className={classes.item}>
      <Text fz="80">{day?.emoji}</Text>
      <Text size="lg" fw={700}>
        {index === 0 ? "Today" : index === 1 ? "Tomorrow" : `Day ${index + 1}`}
      </Text>
      <Text fz={14} c="dimmed">
        Low: {props.forecast?.daily.temperature_2m_min[index]}°C | High:{" "}
        {props.forecast?.daily.temperature_2m_max[index]}°C
      </Text>
      <Text fz={12} c="dimmed">
        {day?.name}
      </Text>
      <Text size="xs" c="dimmed"></Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" m={"lg"} className={classes.card}>
      <Group justify="space-between">
        <Text className={classes.title}>Forecast</Text>
        <OpenMeteoLink />
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 3, md: 4, lg: 7 }} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
}
