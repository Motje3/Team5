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
            // Configure default animations for all screens
            animation: "slide_from_right",
            animationDuration: 100, // Slightly longer for smoother animation
            presentation: "card",
            // Enable gestures for back navigation
            gestureEnabled: true,
            gestureDirection: "horizontal",
            // Ensure consistent animations for forward and backward navigation
            animationTypeForReplace: "push",
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen 
            name="homescreen" 
            options={{
              presentation: "card", // Changed from transparentModal for consistent animation
              animation: "slide_from_right",
              gestureEnabled: true,
              gestureDirection: "horizontal",
            }}
          />
          <Stack.Screen 
            name="todaysshipments" 
            options={{
              presentation: "card",
              animation: "slide_from_right",
              gestureEnabled: true,
              gestureDirection: "horizontal",
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