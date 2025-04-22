import React, { useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { icons } from "@/constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import DatePickerFilter from "../filters/DatePickerFilter";
import LocationFilter from "../filters/LocationFilter";

const Stats = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

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
          style={{ width: 50, height: 50, tintColor: "#A970FF", marginTop: 25 }}
        />
        <Text className="text-white text-2xl font-bold mt-2">Jouw zendingen</Text>
      </View>

      {/* Filters */}
      <LocationFilter
        label="Location"
        value={location}
        onChange={setLocation}
      />
      <DatePickerFilter
        label="Date"
        value={date}
        onChange={setDate}
      />

      {/* Shipment List */}
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
        }}
      >
        <Text className="text-white text-lg font-bold mb-4">Recente activiteit</Text>
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
    </View>
  );
};

export default Stats;
