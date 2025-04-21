import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants/icons";
import { Image, Text, View } from "react-native";
import { useApp } from "../context/AppContext";
import { useTheme, darkTheme, lightTheme } from "../context/ThemeContext"; // ✅ import theme

const TabIcon = ({ focused, icon, title }: any) => {
  const { accentColor } = useApp(); // Accentkleur uit AppContext

  if (focused) {
    return (
      <View
        style={{
          backgroundColor: accentColor,
          flexDirection: 'row',
          minWidth: 114,
          minHeight: 64,
          marginTop: 16,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 999,
          overflow: 'hidden',
          paddingHorizontal: 16
        }}
      >
        <Image
          source={icon}
          tintColor="#151312"
          style={{ width: 24, height: 24 }}
        />
        <Text style={{ color: '#151312', fontSize: 16, fontWeight: '600', marginLeft: 8 }}>{title}</Text>
      </View>
    );
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
      <Image source={icon} tintColor="#A8B5DB" style={{ width: 24, height: 24 }} />
    </View>
  );
};

const _Layout = () => {
  const { darkMode } = useTheme(); // ✅ haal darkMode uit context
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: "100%",
          justifyContent: 'center',
          alignItems: 'center'
        },
        tabBarStyle: {
          backgroundColor: theme.background, // ✅ dynamische achtergrondkleur
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 53,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 0,
          borderColor: theme.background,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.home}
              title="Start"
            />
          )
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.qrcode}
              title="Scannen"
            />
          )
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.stats}
              title="Statistieken"
            />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.user}
              title="Profiel"
            />
          )
        }}
      />
    </Tabs>
  );
};

export default _Layout;
