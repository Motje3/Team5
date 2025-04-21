import { Stack } from "expo-router";
import './global.css';
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ import ThemeProvider

export default function RootLayout() {
  return (
    <ThemeProvider> {/* ✅ Wrap met ThemeProvider */}
      <AppProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#0f0D23', // blijft ok, wordt overschreven indien nodig
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
