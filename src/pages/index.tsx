import { Anchor, Container, Text, Title } from "@mantine/core";
import Head from "next/head";
import { useState } from "react";
import { SeachInput } from "~/components/search-input";

import { api } from "~/utils/api";

export default function Home() {
  const [location, setLocation] = useState<string>("");
  // const locations = api.weather.getLocations.useQuery(
  //   {
  //     location,
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //   },
  // );

  // console.log(locations.data);

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
            {/* onSearch={value} */}
            <SeachInput
              searchHandler={(value) => {
                if (value.length > 2) {
                  setLocation(value);
                }
              }}
            />
            <Anchor
              href="https://open-meteo.com/"
              c="dimmed"
              fz="10"
              ta="center"
              ml={10}
            >
              Weather data by Open-Meteo.com
            </Anchor>
          </Container>
          {/* {weather.data ? weather.data.greeting : "Loading tRPC query..."} */}
        </Container>
      </main>
    </>
  );
}
