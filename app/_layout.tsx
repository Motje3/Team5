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
        name="shipment"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login/loginpage"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="homescreen/todaysshipments"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
