import { Stack } from "expo-router";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#0f0D23', // fallback background (overschreven door thema's)
            },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="shipment/shipmentdetails" />
          <Stack.Screen name="shipment/reportissue" />
          <Stack.Screen name="login/loginpage" />
          <Stack.Screen name="homescreen/todaysshipments" />
        </Stack>
      </AppProvider>
    </ThemeProvider>
  );
}
