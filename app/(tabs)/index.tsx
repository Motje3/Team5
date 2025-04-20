import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar as ExpoStatusBar } from "expo-status-bar"; // Correcte import van Expo status bar

const Home = () => {
  return (
    <LinearGradient
      colors={["#3D0F6E", "#030014"]}
      locations={[0, 0.7, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.25 }}
      style={{ flex: 1, paddingHorizontal: 24, paddingTop: 40 }}
    >
      {/* ✅ Verberg status bar */}
      <ExpoStatusBar hidden />
      <StatusBar hidden />

      {/* 👋 Welkom Header */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-gray-400 text-lg mt-2">Welkom terug,</Text>
          <Text className="text-white text-2xl font-bold">Tyrone</Text>
        </View>
      </View>

      {/* 🔘 Knoppen Grid */}
      <View className="mt-6 grid grid-cols-2 gap-4">
        {/* 📦 Geplande zendingen */}
        <TouchableOpacity className="rounded-lg overflow-hidden">
          <LinearGradient
            colors={["#9124BD", "#320042"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              padding: 24,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={icons.orders}
              style={{ width: 40, height: 40, tintColor: "#fff" }}
            />
            <Text className="text-white text-lg mt-2">Geplande zendingen</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* 🔍 Scannen voor info */}
        <TouchableOpacity className="rounded-lg overflow-hidden">
          <LinearGradient
            colors={["#1A5BC4", "#111A47"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              padding: 24,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={icons.scaninfo}
              style={{ width: 40, height: 40, tintColor: "#fff" }}
            />
            <Text className="text-white text-lg mt-2">Scannen voor Info</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* 🕒 Placeholder 1 */}
        <TouchableOpacity className="rounded-lg overflow-hidden">
          <LinearGradient
            colors={["#4B5563", "#131921"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              padding: 24,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.5,
            }}
          >
            <Text className="text-gray-400 text-lg">Binnenkort beschikbaar</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* 🕒 Placeholder 2 */}
        <TouchableOpacity className="rounded-lg overflow-hidden">
          <LinearGradient
            colors={["#4B5563", "#131921"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              padding: 24,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.5,
            }}
          >
            <Text className="text-gray-400 text-lg">Binnenkort beschikbaar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Home;
