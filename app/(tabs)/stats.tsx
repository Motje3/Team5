import React, { useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { icons } from "@/constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import DatePickerFilter from "../filters/DatePickerFilter";
import LocationFilter from "../filters/LocationFilter";

const Stats = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  // Dummy shipment stats
  const shipmentStats = {
    total: 124, // Total processed shipments
    completed: 98, // Successfully completed
    pending: 26, // Still in transit
  };

  // Dummy shipment data
  const shipments = [
    { id: "SHIP-101", location: "Amsterdam", status: "Afgerond", date: "2025-04-20" },
    { id: "SHIP-102", location: "Rotterdam", status: "In afwachting", date: "2025-04-21" },
    { id: "SHIP-103", location: "Utrecht", status: "Afgerond", date: "2025-04-20" },
    { id: "SHIP-104", location: "Amsterdam", status: "In afwachting", date: "2025-04-22" },
    { id: "SHIP-105", location: "Rotterdam", status: "Afgerond", date: "2025-04-21" },
  ];

  // Filter logic
  const filteredShipments = shipments.filter((shipment) => {
    const matchesLocation = location
      ? shipment.location.toLowerCase().includes(location.toLowerCase())
      : true;
    const matchesDate = date ? shipment.date === date : true;
    return matchesLocation && matchesDate;
  });

  return (
    <View className="bg-primary flex-1 px-6 py-6">
      {/* Page Header */}
      <View className="flex items-center mb-6">
        <Image
          source={icons.stats}
          style={{ width: 30, height: 30, tintColor: "#A970FF", marginTop: 20 }}
        />
      </View>

      {/* Shipment Overview */}
      <LinearGradient
        colors={["#17144F", "#090723"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          padding: 20,
          borderRadius: 20,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 10,
          elevation: 8,
          marginBottom: 15,
        }}
      >
        <Text className="text-white text-lg font-bold mb-4">Jouw zendingen</Text>
        <View className="flex-row justify-between w-full px-4">
          <View className="items-center">
            <Text className="text-purple-400 text-3xl font-bold">{shipmentStats.total}</Text>
            <Text className="text-gray-300">Totaal</Text>
          </View>
          <View className="items-center">
            <Text className="text-green-400 text-3xl font-bold">{shipmentStats.completed}</Text>
            <Text className="text-gray-300">Voltooid</Text>
          </View>
          <View className="items-center">
            <Text className="text-yellow-400 text-3xl font-bold">{shipmentStats.pending}</Text>
            <Text className="text-gray-300">In behandeling</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Recent Activity */}
      <LinearGradient
        colors={["#17144F", "#090723"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          padding: 20,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 8,
          marginBottom: 15,
        }}
      >
        <Text className="text-white text-lg font-bold mb-4">Recente activiteit</Text>

        {/* Shipment List */}
        <FlatList
          data={filteredShipments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between py-2 border-b border-gray-700">
              <Text className="text-gray-300">{item.id}</Text>
              <Text
                className={`text-lg ${
                  item.status === "Afgerond" ? "text-green-400" : "text-yellow-400"
                }`}
              >
                {item.status}
              </Text>
              <Text className="text-gray-500">{item.date}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>

      {/* Filters */}
      <LinearGradient
        colors={["#17144F", "#090723"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 15,
          paddingBottom: 5,
          paddingHorizontal: 20,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 8,
        }}
      >
        <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
          Filters
        </Text>
        <View style={{ marginBottom: -5 }}>
          <LocationFilter label="Location" value={location} onChange={setLocation} />
        </View>
        <View>
          <DatePickerFilter label="Date" value={date} onChange={setDate} />
        </View>
      </LinearGradient>
    </View>
  );
};

export default Stats;