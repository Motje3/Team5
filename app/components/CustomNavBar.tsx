// app/components/CustomNavBar.tsx
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useApp } from "../context/AppContext";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// static dark bg for the container
const CONTAINER_BG = "#130057";
// inactive icon color
const ICON_INACTIVE = "#ffffff";

export default function CustomNavBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { accentColor } = useApp();

  return (
    <View style={[styles.container, { backgroundColor: CONTAINER_BG }]}>
      {state.routes.map((route, idx) => {
        // skip expo-router internals
        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === idx;
        const { options } = descriptors[route.key];
        const label = (options.title ?? route.name) as string;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // icon color: dark on light pill, white otherwise
        const iconColor = isFocused ? CONTAINER_BG : ICON_INACTIVE;

        return (
          <AnimatedTouchable
            key={route.key}
            onPress={onPress}
            layout={LinearTransition.springify().mass(0.5)}
            style={[
              styles.tabItem,
              { backgroundColor: isFocused ? accentColor : "transparent" },
            ]}
          >
            {getIcon(route.name, iconColor)}
            {isFocused && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={styles.label}
              >
                {label}
              </Animated.Text>
            )}
          </AnimatedTouchable>
        );
      })}
    </View>
  );

  function getIcon(name: string, color: string) {
    switch (name) {
      case "index":
        return <Feather name="home" size={24} color={color} />;
      case "scan":
        return <AntDesign name="scan1" size={24} color={color} />;
      case "stats":
        return <Feather name="pie-chart" size={24} color={color} />;
      case "profile":
        return <FontAwesome6 name="circle-user" size={24} color={color} />;
      default:
        return <Ionicons name="help-circle-outline" size={24} color={color} />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",   // ← evenly spread tabs
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    bottom: 20,
    borderRadius: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  label: {
    color: CONTAINER_BG,
    marginLeft: 8,
    fontWeight: "500",
  },
});
