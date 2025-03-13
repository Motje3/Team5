import { Stack } from "expo-router";
import './global.css';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="shipment/shipmentdetails"
        options={{ headerShown: false }} // Hide header for shipment pages
      />
    </Stack>
  );
}
