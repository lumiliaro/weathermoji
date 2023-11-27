import {
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
  props: AutocompleteProps & {
    searchHandler: (
      latitude: string | undefined,
      longitude: string | undefined,
    ) => void;
  },
) {
  const { searchHandler, ...SearchInputProps } = props;
  const theme = useMantineTheme();
  const [value, setValue] = useDebouncedState<string>("", 200);
  const [latitude, setLatitude] = useState<string>();
  const [longitude, setLongitude] = useState<string>();

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
    setLatitude(latitude);
    setLongitude(longitude);
  };

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
          onClick={() => searchHandler(latitude, longitude)}
        >
          <Search strokeWidth={1.75} />
        </ActionIcon>
      }
      limit={10}
      defaultValue={value}
      onChange={setValue}
      data={data}
      onOptionSubmit={handleOptionSubmit}
      {...SearchInputProps}
    />
  );
}
