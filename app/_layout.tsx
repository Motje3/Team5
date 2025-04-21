import { Stack } from "expo-router";
import './global.css';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#0f0D23', 
        },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="shipment/shipmentdetails" />
      <Stack.Screen name="shipment/reportissue" />
      <Stack.Screen name="login/loginpage" />
      <Stack.Screen name="homescreen/todaysshipments" />
    </Stack>
  );
}
