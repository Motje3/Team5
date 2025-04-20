import React, { useState } from "react";
import { View, Text, Image, FlatList, TextInput, TouchableOpacity } from "react-native";
import { icons } from '@/constants/icons';
import { LinearGradient } from 'expo-linear-gradient';
import DatePicker from "react-native-date-picker";

const Stats = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Dummy shipment stats
  const shipmentStats = {
    total: 124, // Total processed shipments
    completed: 98, // Successfully completed
    pending: 26, // Still in transit
  };

  // Dummy recent activity data
  const recentShipments = [
    { id: "SHIP-101", location: "Amsterdam", status: "Afgerond", time: "2023-10-01" },
    { id: "SHIP-102", location: "Rotterdam", status: "In afwachting", time: "2023-10-02" },
    { id: "SHIP-103", location: "Utrecht", status: "Afgerond", time: "2023-10-01" },
    { id: "SHIP-104", location: "Amsterdam", status: "In afwachting", time: "2023-10-03" },
    { id: "SHIP-105", location: "Rotterdam", status: "Afgerond", time: "2023-10-02" },
  ];

  // Filter logic
  const filteredShipments = recentShipments.filter((shipment) => {
    const matchesLocation = location
      ? shipment.location.toLowerCase().includes(location.toLowerCase())
      : true;
    const matchesDate = date ? shipment.time === date : true;
    return matchesLocation && matchesDate;
  });

  return (
    <View className="bg-primary flex-1 px-6 py-6">
      
      {/* 🔹 Page Header */}
      <View className="flex items-center mb-6">
        <Image 
          source={icons.stats}  
          style={{ width: 50, height: 50, tintColor: "#A970FF", marginTop: 25 }} 
        />
        <Text className="text-white text-2xl font-bold mt-2">Jouw zendingen</Text>
      </View>

      {/* Shipment Overview with Gradient Effect */}
      <LinearGradient
        colors={["#17144F", "#090723"]} // Dark smooth gradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{
          padding: 20,
          borderRadius: 20, // More rounded corners for a modern feel
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 10,
          elevation: 8, // Android shadow effect
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

      {/* Filters */}
      <View style={{ marginBottom: 16 }}>
        {/* Location Filter */}
        <View style={{ marginBottom: 8 }}>
          <Text className="text-gray-300 mb-2">Filter op locatie:</Text>
          <TextInput
            style={{
              backgroundColor: "#1E1E1E",
              color: "#FFF",
              padding: 8,
              borderRadius: 8,
            }}
            placeholder="Voer locatie in"
            placeholderTextColor="#888"
            onChangeText={(text) => setLocation(text)}
            value={location}
          />
        </View>

        {/* Date Filter with Date Picker */}
        <View>
          <Text className="text-gray-300 mb-2">Filter op datum:</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#1E1E1E",
              padding: 8,
              borderRadius: 8,
              alignItems: "center",
            }}
            onPress={() => setIsDatePickerOpen(true)}
          >
            <Text style={{ color: "#FFF" }}>
              {date ? date : "Selecteer een datum"}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={isDatePickerOpen}
            date={date ? new Date(date) : new Date()}
            mode="date"
            onConfirm={(selectedDate) => {
              setIsDatePickerOpen(false);
              setDate(selectedDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
            }}
            onCancel={() => setIsDatePickerOpen(false)}
          />
        </View>
      </View>

      {/* 🕒 Recent Activity with Gradient Effect */}
      <LinearGradient
        colors={["#17144F", "#090723"]} // Dark smooth gradient
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
        <Text className="text-white text-lg font-bold mb-4">Recente activiteit</Text>

        <FlatList
          data={filteredShipments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between py-2 border-b border-gray-700">
              <Text className="text-gray-300">{item.id}</Text>
              <Text className={`text-lg ${item.status === "Afgerond" ? "text-green-400" : "text-yellow-400"}`}>
                {item.status}
              </Text>
              <Text className="text-gray-500">{item.time}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>

    </View>
  );
};

export default Stats;
