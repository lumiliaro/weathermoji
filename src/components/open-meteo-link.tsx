import { Anchor } from "@mantine/core";

export default function OpenMeteoLink() {
  return (
    <Anchor
      href="https://open-meteo.com/"
      fz="10"
      c="dimmed"
      style={{ lineHeight: 1 }}
    >
      Weather data by Open-Meteo.com
    </Anchor>
  );
}
