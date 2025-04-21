import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';
import { useTheme, darkTheme, lightTheme } from '../context/ThemeContext'; // ✅ gebruik useTheme

const fallbackImage = require('../../assets/images/default-profile.png');

const Home = () => {
  const router = useRouter();
  const { darkMode, username, accentColor, profileImage } = useApp();
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, paddingHorizontal: 24, paddingTop: 40 }}>
      <ExpoStatusBar style={darkMode ? "light" : "dark"} />
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />

      {/* 🔹 Welcome Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ color: theme.secondaryText, fontSize: 16, marginBottom: 4 }}>Welkom terug,</Text>
          <Text style={{ color: theme.text, fontSize: 24, fontWeight: 'bold' }}>{username}</Text>
        </View>
        <Image
          source={profileImage ? { uri: profileImage } : fallbackImage}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
      </View>

      {/* 🔹 Grid Buttons */}
      <View style={{ marginTop: 24, flexDirection: 'column', justifyContent: 'flex-start' }}>
        {/* 📦 Zendingen */}
        <TouchableOpacity
          style={{ borderRadius: 12, overflow: 'hidden', width: '100%', marginBottom: 16 }}
          onPress={() => router.push('/homescreen/todaysshipments')}
        >
          <LinearGradient
            colors={[accentColor, "#320042"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={{
              padding: 24,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={icons.orders} style={{ width: 40, height: 40, tintColor: "#fff" }} />
            <Text style={{ color: "#fff", fontSize: 16, marginTop: 8 }}>Zendingen van vandaag</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* 🔍 Scan */}
        <TouchableOpacity
          style={{ borderRadius: 12, overflow: 'hidden', width: '100%', marginBottom: 16 }}
        >
          <LinearGradient
            colors={["#1A5BC4", "#111A47"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={{
              padding: 24,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={icons.scaninfo} style={{ width: 40, height: 40, tintColor: "#fff" }} />
            <Text style={{ color: "#fff", fontSize: 16, marginTop: 8 }}>Scannen voor Info</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* 🕒 Placeholder */}
        {[1, 2].map((i) => (
          <TouchableOpacity
            key={i}
            style={{ borderRadius: 12, overflow: 'hidden', width: '100%', marginBottom: 16 }}
          >
            <LinearGradient
              colors={["#4B5563", "#131921"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={{
                padding: 24,
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.5
              }}
            >
              <Text style={{ color: "#D1D5DB", fontSize: 16 }}>Binnenkort beschikbaar</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Home;
