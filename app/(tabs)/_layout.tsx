import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants/icons";
import { Image, Text, View } from "react-native";
import { useApp } from "../context/AppContext";
import { useTheme, darkTheme, lightTheme } from "../context/ThemeContext";
import { wp, hp } from "../utils/responsive"; // ✅ Responsive helper

const TabIcon = ({ focused, icon, title }: any) => {
  const { accentColor } = useApp();

  if (focused) {
    return (
      <View
        style={{
          backgroundColor: accentColor,
          flexDirection: "row",
          minWidth: wp(30),
          minHeight: hp(7.5),
          marginTop: hp(2),
          justifyContent: "center",
          alignItems: "center",
          borderRadius: wp(100),
          overflow: "hidden",
          paddingHorizontal: wp(4),
        }}
      >
        <Image
          source={icon}
          tintColor="#151312"
          style={{ width: wp(6), height: wp(6) }}
        />
        <Text
          style={{
            color: "#151312",
            fontSize: wp(4),
            fontWeight: "600",
            marginLeft: wp(2),
          }}
        >
          {title}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp(2),
      }}
    >
      <Image source={icon} tintColor="#A8B5DB" style={{ width: wp(6), height: wp(6) }} />
    </View>
  );
};

const _Layout = () => {
  const { darkMode } = useTheme();
  const theme = darkMode ? darkTheme : lightTheme;

  return (
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
          backgroundColor: theme.background,
          borderRadius: wp(12),
          marginHorizontal: wp(5),
          marginBottom: hp(4),
          height: hp(7),
          position: "absolute",
          overflow: "hidden",
          borderWidth: 0,
          borderColor: theme.background,
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
  );
};

export default _Layout;
