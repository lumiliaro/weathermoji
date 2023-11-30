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
    searchHandler: (latitude: string, longitude: string) => void;
  },
) {
  const { searchHandler, ...SearchInputProps } = props;
  const theme = useMantineTheme();
  const [value, setValue] = useDebouncedState<string>("", 200);
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  const locations = api.weather.getLocations.useQuery(
    {
      location: value,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const data = locations.data?.results?.map((location) => {
    return {
      label: `${
        location.country ?? location.admin1 ?? location.country_code
      }: ${location.name}`,
      value: `${location.latitude};${location.longitude}`,
    };
  });

  const handleOptionSubmit = (value: string) => {
    const [latitude, longitude] = value.split(";");
    if (latitude) {
      setLatitude(latitude);
    }

    if (longitude) {
      setLongitude(longitude);
    }
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
      error={
        locations.isError
          ? JSON.stringify(
              locations.error?.data?.zodError?.fieldErrors.location?.at(0),
            )
          : undefined
      }
      {...SearchInputProps}
    />
  );
}
