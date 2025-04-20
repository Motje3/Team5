import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar as ExpoStatusBar } from "expo-status-bar"; // Import Expo Status Bar
import { useRouter } from 'expo-router';

const router = useRouter();

const Home = () => {
  return (
    <LinearGradient
      colors={["#3D0F6E", "#030014"]} // Extra middle color for smoothness
      locations={[0, 0.7, 1]} // Controls smooth transition
      start={{ x: 0.5, y: 0 }} 
      end={{ x: 0.5, y: 0.25 }} // Stops the gradient sooner
      style={{ flex: 1, paddingHorizontal: 24, paddingTop: 40 }} 
    >


      {/* 🔹 Hide the status bar */}
      <ExpoStatusBar hidden />
      <StatusBar hidden />
      
      {/* 🔹 Welcome Header */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-gray-400 text-lg mt-2">Welkom terug,</Text>
          <Text className="text-white text-2xl font-bold">Tyrone</Text>
        </View>
      </View>

      {/* 🔹 Grid Buttons */}
      <View className="mt-6 grid grid-cols-2 gap-4">
        
        {/* 📦 Today's Shipments */}
        <TouchableOpacity className="rounded-lg overflow-hidden" onPress={() => router.push('/homescreen/todaysshipments')}>
          <LinearGradient
            colors={["#9124BD", "#320042"]} // Purple Gradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} // Corrected start/end values
            style={{ padding: 24, borderRadius: 12, justifyContent: "center", alignItems: "center" }} // Used style instead of className
          >
            <Image source={icons.orders} style={{ width: 40, height: 40, tintColor: "#fff" }} />
            <Text className="text-white text-lg mt-2">Geplande zendingen</Text>
          </LinearGradient>
        </TouchableOpacity>


        {/* 🔍 Scan for Info */}
        <TouchableOpacity className="rounded-lg overflow-hidden">
          <LinearGradient
            colors={["#1A5BC4", "#111A47"]} // Blue Gradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} // Corrected start & end
            style={{ padding: 24, borderRadius: 12, justifyContent: "center", alignItems: "center" }} // Fixed styling
          >
            <Image source={icons.scaninfo} style={{ width: 40, height: 40, tintColor: "#fff" }} />
            <Text className="text-white text-lg mt-2">Scannen voor Info</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* 🕒 Empty Placeholder */}
        <TouchableOpacity className="rounded-lg overflow-hidden">
          <LinearGradient
            colors={["#4B5563", "#131921"]} // Dark Gray Gradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} // Corrected start & end
            style={{ padding: 24, borderRadius: 12, justifyContent: "center", alignItems: "center", opacity: 0.5 }} // Fixed styling
          >
            <Text className="text-gray-400 text-lg">Binnenkort beschikbaar</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* 🕒 Empty Placeholder */}
        <TouchableOpacity className="rounded-lg overflow-hidden">
          <LinearGradient
            colors={["#4B5563", "#131921"]} // Dark Gray Gradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} // Corrected start & end
            style={{ padding: 24, borderRadius: 12, justifyContent: "center", alignItems: "center", opacity: 0.5 }} // Fixed styling
          >
            <Text className="text-gray-400 text-lg">Binnenkort beschikbaar</Text>
          </LinearGradient>
        </TouchableOpacity>


      </View>

      </LinearGradient>
  );
};

export default Home;
