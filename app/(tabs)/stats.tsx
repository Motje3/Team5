import { View, Text, Image, FlatList } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { darkTheme, lightTheme } from '../context/ThemeContext';

const Stats = () => {
  const { darkMode, accentColor } = useApp();
  const theme = darkMode ? darkTheme : lightTheme;  // Dynamisch thema op basis van darkMode

  const shipmentStats = {
    total: 124,
    completed: 98,
    pending: 26,
  };

  const recentShipments = [
    { id: "SHIP-101", status: "Afgerond", time: "10:30 AM" },
    { id: "SHIP-102", status: "In afwachting", time: "11:00 AM" },
    { id: "SHIP-103", status: "Afgerond", time: "11:45 AM" },
    { id: "SHIP-104", status: "In afwachting", time: "12:15 PM" },
    { id: "SHIP-105", status: "Afgerond", time: "01:00 PM" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, paddingHorizontal: 24, paddingVertical: 24 }}>
      
      {/* 🔹 Page Header */}
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <Image
          source={icons.stats}
          style={{ width: 50, height: 50, tintColor: accentColor, marginTop: 25 }}
        />
        <Text style={{ color: theme.text, fontSize: 22, fontWeight: 'bold', marginTop: 8 }}>
          Jouw zendingen
        </Text>
      </View>

      {/* 📦 Shipment Overview */}
      <LinearGradient
        colors={["#17144F", "#090723"]} // Donkere kleuren voor de achtergrond
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{
          padding: 20,
          borderRadius: 20,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 10,
          elevation: 8,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
          Jouw zendingen
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 16 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#A970FF", fontSize: 24, fontWeight: "bold" }}>{shipmentStats.total}</Text>
            <Text style={{ color: "#D1D5DB" }}>Totaal</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#10B981", fontSize: 24, fontWeight: "bold" }}>{shipmentStats.completed}</Text>
            <Text style={{ color: "#D1D5DB" }}>Voltooid</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#FBBF24", fontSize: 24, fontWeight: "bold" }}>{shipmentStats.pending}</Text>
            <Text style={{ color: "#D1D5DB" }}>In behandeling</Text>
          </View>
        </View>
      </LinearGradient>

      {/* 🕒 Recent Activity */}
      <LinearGradient
        colors={["#17144F", "#090723"]} // Donkere kleuren voor de achtergrond
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{
          padding: 20,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 8,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
          Recente activiteit
        </Text>

        <FlatList
          data={recentShipments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#374151"
            }}>
              <Text style={{ color: "#D1D5DB" }}>{item.id}</Text>
              <Text style={{
                color: item.status === "Afgerond" ? "#10B981" : "#FBBF24",
                fontSize: 16
              }}>
                {item.status}
              </Text>
              <Text style={{ color: "#9CA3AF" }}>{item.time}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </View>
  );
};

export default Stats;
