import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { mantineVioletColors } from "~/utils/styles";

const theme = createTheme({
  /** Put your mantine theme override here */
  colors: {mantineVioletColors}
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
