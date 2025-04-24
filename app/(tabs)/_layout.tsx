// app/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import CustomNavBar from "../components/CustomNavBar";

export default function _Layout() {
  return (
    <Tabs
      tabBar={(props) => <CustomNavBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index"  options={{ title: "Home" }} />
      <Tabs.Screen name="scan"   options={{ title: "Scannen" }} />
      <Tabs.Screen name="stats"  options={{ title: "Statistieken" }} />
      <Tabs.Screen name="profile"options={{ title: "Profiel" }} />
    </Tabs>
  );
}
