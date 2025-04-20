// ✅ app/_layout.tsx

import { Stack } from "expo-router";
import "./global.css";
import { ThemeProvider } from "./profile/ThemeContext"; // ✅ Correct pad

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="shipment/shipmentdetails" // ✅ correcte route
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login/loginpage"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile/appsettings" // ✅ concrete pagina's gebruiken
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile/editprofile"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile/changepassword"
          options={{ headerShown: false }}
        />
      </Stack>
    </ThemeProvider>
  );
}
