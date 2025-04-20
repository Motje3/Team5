// ✅ app/(tabs)/_layout.tsx

import React from "react";
import { Tabs } from "expo-router";
import { ImageBackground, Image, Text, View } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { ThemeProvider } from "../profile/ThemeContext"; // ✅ correct

const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[114px] min-h-[64px] mt-4 justify-center items-center rounded-full overflow-hidden"
      >
        <Image source={icon} tintColor="#151312" className="size-6" />
        <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
      </ImageBackground>
    );
  }

  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-6" />
    </View>
  );
};

const _Layout = () => {
  return (
    <ThemeProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarStyle: {
            backgroundColor: "#0f0D23",
            borderRadius: 50,
            marginHorizontal: 20,
            marginBottom: 36,
            height: 53,
            position: "absolute",
            overflow: "hidden",
            borderWidth: 0,
            borderColor: "#0f0d23",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.home} title="Start" />
            ),
          }}
        />
        <Tabs.Screen
          name="scan"
          options={{
            title: "Scan",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.qrcode} title="Scannen" />
            ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: "Stats",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.stats} title="Statistieken" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.user} title="Profiel" />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
};

export default _Layout;
