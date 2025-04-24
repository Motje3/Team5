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
              backgroundColor: "#030014", // Match the dark gradient base color
            },
            animation: "slide_from_right",
            animationDuration: 100,
            presentation: "card",
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen 
            name="homescreen" 
            options={{
              presentation: "transparentModal",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen name="shipment/shipmentdetails" />
          <Stack.Screen name="shipment/reportissue" />
          <Stack.Screen name="login/loginpage" />
        </Stack>
      </AppProvider>
    </AuthProvider>
  );
}