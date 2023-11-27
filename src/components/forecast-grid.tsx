import {
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
} from "@mantine/core";

import classes from "./forecast-grid.module.css";
import { type WeatherCondition } from "~/utils/weather-conditions";

export function ForecastGrid(props: {
  forecast: (WeatherCondition | undefined)[] | undefined;
}) {
  if (!props.forecast) {
    return <></>;
  }

  const items = props.forecast.map((day) => (
    <UnstyledButton key={day?.name} className={classes.item}>
      <Text>{day?.emoji}</Text>
      <Text size="xs" mt={7}>
        {day?.name}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group justify="space-between">
        <Text className={classes.title}>Forecast</Text>

        <Anchor
          href="https://open-meteo.com/"
          fz="10"
          c="dimmed"
          style={{ lineHeight: 1 }}
        >
          Weather data by Open-Meteo.com
        </Anchor>
      </Group>
      <SimpleGrid cols={7} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
}
