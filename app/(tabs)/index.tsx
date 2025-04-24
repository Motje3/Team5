import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';
import { wp, hp } from '../utils/responsive';

const fallbackImage = require('../../assets/images/default-profile.png');

const Home = () => {
  const router = useRouter();
  const { darkMode, username, accentColor, profileImage } = useApp();

  // Merge theme values inline
  const theme = {
    background: darkMode ? "#0f0D23" : "#ffffff",
    text: darkMode ? "#ffffff" : "#0f0D23",
    secondaryText: darkMode ? "#9CA3AF" : "#6B7280",
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, paddingHorizontal: wp(6), paddingTop: hp(5) }}>
      <ExpoStatusBar style={darkMode ? "light" : "dark"} />
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />

      {/* 🔹 Welcome Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ color: theme.secondaryText, fontSize: wp(4), marginBottom: hp(0.5) }}>Welkom terug,</Text>
          <Text style={{ color: theme.text, fontSize: wp(6), fontWeight: 'bold' }}>{username}</Text>
        </View>
        <Image
          source={profileImage && profileImage.trim() !== "" ? { uri: profileImage } : fallbackImage}
          style={{ width: wp(10), height: wp(10), borderRadius: wp(5) }}
        />
      </View>

      {/* 🔹 Grid Buttons */}
      <View style={{ marginTop: hp(3), flexDirection: 'column', justifyContent: 'flex-start' }}>
        {/* 📦 Zendingen */}
        <TouchableOpacity
          style={{ borderRadius: wp(3), overflow: 'hidden', width: '100%', marginBottom: hp(2) }}
          onPress={() => router.push('/homescreen/todaysshipments')}
        >
          <LinearGradient
            colors={[accentColor, "#320042"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={{
              padding: wp(6),
              borderRadius: wp(3),
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={icons.orders} style={{ width: wp(10), height: wp(10), tintColor: "#fff" }} />
            <Text style={{ color: "#fff", fontSize: wp(4), marginTop: hp(1) }}>Zendingen van vandaag</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* 🔍 Scan */}
        <TouchableOpacity
          style={{ borderRadius: wp(3), overflow: 'hidden', width: '100%', marginBottom: hp(2) }}
        >
          <LinearGradient
            colors={["#1A5BC4", "#111A47"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={{
              padding: wp(6),
              borderRadius: wp(3),
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={icons.scaninfo} style={{ width: wp(10), height: wp(10), tintColor: "#fff" }} />
            <Text style={{ color: "#fff", fontSize: wp(4), marginTop: hp(1) }}>Scannen voor Info</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* 🕒 Placeholder Buttons */}
        {[1, 2].map((i) => (
          <TouchableOpacity
            key={i}
            style={{ borderRadius: wp(3), overflow: 'hidden', width: '100%', marginBottom: hp(2) }}
          >
            <LinearGradient
              colors={["#4B5563", "#131921"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={{
                padding: wp(6),
                borderRadius: wp(3),
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.5
              }}
            >
              <Text style={{ color: "#D1D5DB", fontSize: wp(4) }}>Binnenkort beschikbaar</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Home;
