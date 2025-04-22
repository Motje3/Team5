import { View, Text, Image, FlatList } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { darkTheme, lightTheme } from '../context/ThemeContext';
import { wp, hp } from '../utils/responsive';

const Stats = () => {
  const { darkMode, accentColor } = useApp();
  const theme = darkMode ? darkTheme : lightTheme;

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
    <View style={{ flex: 1, backgroundColor: theme.background, paddingHorizontal: wp(6), paddingVertical: hp(3) }}>
      
      {/* 🔹 Page Header */}
      <View style={{ alignItems: 'center', marginBottom: hp(3) }}>
        <Image
          source={icons.stats}
          style={{ width: wp(12), height: wp(12), tintColor: accentColor, marginTop: hp(3) }}
        />
        <Text style={{ color: theme.text, fontSize: wp(5.5), fontWeight: 'bold', marginTop: hp(1) }}>
          Jouw zendingen
        </Text>
      </View>

      {/* 📦 Shipment Overview */}
      <LinearGradient
        colors={["#17144F", "#090723"]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{
          padding: wp(5),
          borderRadius: wp(5),
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 10,
          elevation: 8,
          marginBottom: hp(2),
        }}
      >
        <Text style={{ color: "#fff", fontSize: wp(4.5), fontWeight: 'bold', marginBottom: hp(1.5) }}>
          Jouw zendingen
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: wp(4) }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#A970FF", fontSize: wp(6.5), fontWeight: "bold" }}>{shipmentStats.total}</Text>
            <Text style={{ color: "#D1D5DB", fontSize: wp(3) }}>Totaal</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#10B981", fontSize: wp(6.5), fontWeight: "bold" }}>{shipmentStats.completed}</Text>
            <Text style={{ color: "#D1D5DB", fontSize: wp(3) }}>Voltooid</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#FBBF24", fontSize: wp(6.5), fontWeight: "bold" }}>{shipmentStats.pending}</Text>
            <Text style={{ color: "#D1D5DB", fontSize: wp(3) }}>In behandeling</Text>
          </View>
        </View>
      </LinearGradient>

      {/* 🕒 Recent Activity */}
      <LinearGradient
        colors={["#17144F", "#090723"]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{
          padding: wp(5),
          borderRadius: wp(5),
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 8,
        }}
      >
        <Text style={{ color: "#fff", fontSize: wp(4.5), fontWeight: 'bold', marginBottom: hp(1.5) }}>
          Recente activiteit
        </Text>

        <FlatList
          data={recentShipments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: hp(1.5),
              borderBottomWidth: 1,
              borderBottomColor: "#374151"
            }}>
              <Text style={{ color: "#D1D5DB", fontSize: wp(3.7) }}>{item.id}</Text>
              <Text style={{
                color: item.status === "Afgerond" ? "#10B981" : "#FBBF24",
                fontSize: wp(3.7),
              }}>
                {item.status}
              </Text>
              <Text style={{ color: "#9CA3AF", fontSize: wp(3.5) }}>{item.time}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </View>
  );
};

export default Stats;
