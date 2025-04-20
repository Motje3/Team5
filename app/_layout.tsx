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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="shipment/reportissue"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login/loginpage"
        options={{ headerShown: false }}
      />
      
    </Stack>
  );
}



import './global.css';