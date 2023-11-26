import {
  TextInput,
  type TextInputProps,
  ActionIcon,
  useMantineTheme,
  Autocomplete,
  type AutocompleteProps,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { api } from "~/utils/api";

export function SeachInput(
  props: AutocompleteProps & { searchHandler: (location: string) => void },
) {
  const theme = useMantineTheme();
  const [value, setValue] = useDebouncedState<string>("", 350);
  const locations = api.weather.getLocations.useQuery(
    {
      location: value,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const data = locations.data?.map((location) => {
    return {
      label: `${location.country}: ${location.name}`,
      value: `${location.latitude};${location.longitude}`,
    };
  });

  const handleOptionSubmit = (value: string) => {
    const [latitude, longitude] = value.split(";");
  };

  console.log(value);

  return (
    <Autocomplete
      radius="xl"
      size="md"
      placeholder="Enter a location"
      rightSectionWidth={42}
      leftSection={<MapPin strokeWidth={1.75} />}
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
          onClick={() => props.searchHandler(value)}
        >
          <Search strokeWidth={1.75} />
        </ActionIcon>
      }
      limit={10}
      defaultValue={value}
      onChange={setValue}
      data={data}
      onOptionSubmit={handleOptionSubmit}
      {...props}
    />
  );
}
