// app/_layout.tsx
import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#0f0D23", // fallback background
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
    </AuthProvider>
  );
}
