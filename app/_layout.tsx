// app/_layout.tsx
import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
              animationDuration: 250,
              // Use card presentation for consistent background handling
              presentation: "card", 
              // Enable gestures for back navigation
              gestureEnabled: true,
              gestureDirection: "horizontal",
              // Ensure consistent animations for forward and backward navigation
              animationTypeForReplace: "push",
              // Prevent background flash
              // Better transition behavior for Android
              fullScreenGestureEnabled: true,
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen 
              name="homescreen" 
              options={{
                presentation: "card",
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
                // Add this to ensure hardware back button works
                freezeOnBlur: true,
              }}
            />
            <Stack.Screen name="shipment/shipmentdetails" />
            <Stack.Screen name="shipment/reportissue" />
            <Stack.Screen name="login/loginpage" />
          </Stack>
        </AppProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}