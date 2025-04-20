import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { icons } from "@/constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import ThemeContext from "../profile/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Home = () => {
  const { accentColor } = useContext(ThemeContext);

  const [name, setName] = useState("Laden...");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const loadProfile = async () => {
        const storedName = await AsyncStorage.getItem("profile_name");
        const storedEmail = await AsyncStorage.getItem("profile_email");
        const storedImage = await AsyncStorage.getItem("profile_image");

        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
        if (storedImage) setProfileImage(storedImage);
      };

      loadProfile();
    }, [])
  );

  return (
    <LinearGradient
      colors={["#3D0F6E", "#030014"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.25 }}
      style={{ flex: 1, paddingHorizontal: 24, paddingTop: 40 }}
    >
      <ExpoStatusBar hidden />
      <StatusBar hidden />

      {/* 👋 Welkom Header */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-gray-400 text-lg mt-2">Welkom terug,</Text>
          <Text className="text-white text-2xl font-bold">{name}</Text>
        </View>

        {profileImage && (
          <Image
            source={{ uri: profileImage }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
        )}
      </View>

      {/* 🔘 Knoppen Grid */}
      <View className="mt-6 grid grid-cols-2 gap-4">
        <TouchableOpacity className="rounded-lg overflow-hidden">
          <LinearGradient
            colors={[accentColor, "#320042"]}
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

        {/* Placeholder 1 */}
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

        {/* Placeholder 2 */}
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
